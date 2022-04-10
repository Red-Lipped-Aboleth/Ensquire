const db = require("../model/database_model")

/*
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;


const defaultBody = {
    name : 'name',
    date : 'date',
    funStuff : 'funstuff',
};

const bodyInfo = {
    name : 'Dan'
}

// create a SQL query that pulls all information (full character sheet) from SQL and converts it to object format
// use object.assign to update that object with the information passed in req.body
// use SQL query to parse updated object and update database accordingly
*/

characterController = {}
//function to get all the character information
characterController.getCharSheet = async (req, res, next) =>{
  const getCharQuery = `
    SELECT *
    FROM character c
    WHERE c.character_id = (SELECT user_id FROM user_table WHERE username = $1)
    INNER JOIN ability_scores s
    ON c.ability_scores_id = s.score_id
    INNER JOIN saving_throw st
    ON c.saving_throw = st.throw_id
    INNER JOIN skills sk
    ON c.skills_id = sk.skills_id;
  `
  //deconstruct user from cookies to find the specific charactersheet associated with the user
  const { username } = req.cookies

  try {
    //fetching all the data for the character sheet from the user
    const character = await db.query(getCharQuery, username)
    res.locals.charSheet = character.rows;
    return next()
  } catch (error) {
    return next({
      log:'Error in getting character data from character id',
      status: 400,
      message: 'Could not get character data from character id'
    })
  }
};

//function to update all the character information
characterController.updateCharSheet = async (req, rest, next) => {
    //grabbing username to use for all queries
    const { username } = req.cookies;

  //SQL query for character update
  //Use WHERE once we decide to use character ID (multiple sheets)
  const charTableQuery = `
    UPDATE character
    SET character_name = $2, race = $3, level = $4, armor_class = $5, prof_bonus = $6, speed = $7, curr_hp = $8, max_hp = $9, saving_throw = $10, skill_id = $11, additional_notes = $12, initiative = $13,
    WHERE character_id = (SELECT user_id FROM user_table WHERE username = $1);
  `;
  //Deconstruction values from req.body related to character table
  const {
    characterName,
    // ability_scores, <- not utilized as that is not from the body
    race,
    level,
    armorClass,
    profBonus,
    speed,
    currHP,
    maxHP,
    // saving_throw, <- not utilized as that is not from the body
    // skill_id, <- not utilized as that is not from the body
    additionalNotes,
    initiative } = req.body;


  //SQL query for ability scores update
  const abilityScoresQuery = `
    UPDATE ability_scores
    SET asStr = $2, asDex = $3, asCon = $4, asInt = $5, asWis = $6, asCha = $7
    WHERE score_id = (SELECT user_id FROM user_table WHERE username = $1);
  `;
  //Deconstruction values for req.body.abilityScores_id
  const { str, dex, con, int, wis, cha } = req.body.abilityScores;


  //SQL query for saving throw update
  const savingThrowQuery = `
    UPDATE saving_throw
    SET stStr = $2, stDex = $3, stCon = $4, stInt = $5, stWis = $6, stCha = $7
    WHERE score_id = (SELECT user_id FROM user_table WHERE username = $1);
  `;
 //Deconstruction values for req.body.savingThrow. Named differently as you can't have 2 Str variables
  const stStr = req.body.savingThrow.str;
  const stDex = req.body.savingThrow.dex;
  const stCon = req.body.savingThrow.con;
  const stInt = req.body.savingThrow.int;
  const stWis = req.body.savingThrow.wis;
  const stCha = req.body.savingThrow.cha;


  //SQL query for skills update
  const skillsQuery = `
    UPDATE skills
    SET acrobatics = $2, animal_handling = $3, arcana = $4, athletics = $5, deception = $6, history = $7, insight = $8, intimidation = $9, investigation = $10, medicine = $11, nature = $12, perception = $13, performance = $14, persuasion = $15, religion = $16, sleight_of_hand = $17, stealth = $18, survival = $19
    WHERE skill_id = (SELECT user_id FROM user_table WHERE username = $1)
  `;
  //Deconstruction values for req.body.skill_id
  const { acrobatics, 
    animalHandling,
    arcana,
    athletics,
    deception,
    history,
    insight,
    intimidation,
    investigation,
    medicine,
    nature,
    perception,
    performance,
    persuasion,
    religion,
    sleightOfHand,
    stealth,
    survival } = req.body.skills;


  try {
      //run the query based on a series of queries
    const updatedCharData = await db.tx( async t => {
        //run the first query - character query to update character table
        //2nd parameter is deconstructed variables from request related to character with username as identifier used in query
        const charUpdate = await t.query(charTableQuery, 
            [ username,
            // character_id, <- not utilized as that is not from the body
            characterName, 
            // ability_scores_id, <- not utilized as that is not from the body
            race, 
            level, 
            armorClass, 
            profBonus,
            speed,
            currHP,
            maxHP,
            savingThrow,
            // skill_id,
            additionalNotes,
            initiative ]);
        // next run the second query - ability score query to update ability score table
        // 2nd parameter is deconstructed var from request related to ability score with username as identifier
        const scoresUpdate = await charUpdate.query(abilityScoresQuery,
            [ username, str, dex, con, int, wis, cha ]);

        // next run the third query - saving throw query to update saving throw table
        // 2nd parameter is deconstructed var from request related to saving throw with username as identifier
        const throwUpdate = await scoresUpdate.query(savingThrowQuery,
            [ username, stStr, stDex, stCon, stInt, stWis, stCha ]);

        // next run the final query - skills query to update skills table,
        // 2nd parameter is deconstructed var from request related to skills with username as identifier
        const skillsUpdate = await throwUpdate.query(skillsQuery,
            [ username, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival ]);

        // return result from final query call
        return skillsUpdate;
    })
    //updatedCharData should have skillsUpdates object where EVERYTHING should be updated
    res.locals.updatedChar = updatedCharData.rows;
    return next();
  } catch (error) {
     return next({
       log: "Error in trying to run overall transaction query to update character data",
       status: "400",
       message: "Not able to run transaction query when updating character data"
     })
  }
}

module.exports = characterController;
