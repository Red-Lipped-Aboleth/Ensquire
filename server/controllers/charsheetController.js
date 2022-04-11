const db = require("../model/database_model")

characterController = {}
//function to get all the character information
characterController.getCharSheet = async (req, res, next) =>{
  const getCharQuery = `
    SELECT c.*, s.*, st.str AS stStr, st.dex AS stDex, st.con AS stCon, st.int AS stInt, st.wis AS stWis, st.cha AS stWis, sk.*
    FROM character c, ability_scores s, saving_throw st, skills sk
    WHERE c.character_id = (SELECT user_id FROM user_table WHERE username = $1)
    AND c.ability_scores_id = s.score_id
    AND c.saving_throw_id = st.throw_id
    AND sk.skills_id = sk.skills_id;
  `
  //deconstruct user from cookies to find the specific charactersheet associated with the user
  // const { username } = req.cookies
  const username = 'danteng'

  try {
    //fetching all the data for the character sheet from the user
    const character = await db.query(getCharQuery, [username])
    const responseData = character.rows[0];
    // console.log(responseData);
    //deconstruct responseData to be in the expect object format
    res.locals.charSheet = {
      characterName: responseData.character_name,
      abilityScores: {
        str: responseData.str,
        dex: responseData.dex,
        con: responseData.con,
        int: responseData.int,
        wis: responseData.wis,
        cha: responseData.cha
      },
      race: responseData.race,
      class: responseData.class,
      level: responseData.level,
      armorClass: responseData.armor_class,
      profBonus: responseData.prof_bonus,
      speed: responseData.speed,
      currHP: responseData.curr_hp,
      maxHP: responseData.max_hp,
      savingThrow: {
        str: responseData.ststr,
        dex: responseData.stdex,
        con: responseData.stcon,
        int: responseData.stint,
        wis: responseData.stwis,
        cha: responseData.stcon
      },
      skills: {
          acrobatics: responseData.acrobatics,
          animalHandling: responseData.animal_handling,
          arcana: responseData.arcana,
          athletics: responseData.athletics,
          deception: responseData.deception,
          history: responseData.history,
          insight: responseData.insight,
          intimidation: responseData.intimidation,
          investigation: responseData.investigation,
          medicine: responseData.medicine,
          nature: responseData.nature,
          perception: responseData.perception,
          performance: responseData.performance,
          persuasion: responseData.persuasion,
          religion: responseData.religion,
          sleightOfHand: responseData.sleight_of_hand,
          stealth: responseData.stealth,
          survival: responseData.survival
      },
      additionalNotes: responseData.additional_notes,
      initiative: responseData.initiative
    }
    // console.log('CHAR SHEET FROM RES.LOCALS', res.locals.charSheet)
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
characterController.updateCharSheet = async (req, res, next) => {
  //grabbing username to use for all queries
  // const { username } = req.cookies;
  const username = 'danteng'
  //SQL query for getting character information
  const getCharQuery = `
    SELECT c.*, s.*, st.str AS stStr, st.dex AS stDex, st.con AS stCon, st.int AS stInt, st.wis AS stWis, st.cha AS stWis, sk.*
    FROM character c, ability_scores s, saving_throw st, skills sk
    WHERE c.character_id = (SELECT user_id FROM user_table WHERE username = $1)
    AND c.ability_scores_id = s.score_id
    AND c.saving_throw_id = st.throw_id
    AND sk.skills_id = sk.skills_id;
  `

  //SQL query for character update
  //Use WHERE once we decide to use character ID (multiple sheets)
  const charTableQuery = `
    UPDATE character
    SET character_name = $2, race = $3, level = $4, armor_class = $5, prof_bonus = $6, speed = $7, curr_hp = $8, max_hp = $9, additional_notes = $10, initiative = $11, class = $12
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
    //cannot use name class as it's a keyword
  const charClass = req.body.class;


  //SQL query for ability scores update
  const abilityScoresQuery = `
    UPDATE ability_scores
    SET str = $2, dex = $3, con = $4, int = $5, wis = $6, cha = $7
    WHERE score_id = (SELECT user_id FROM user_table WHERE username = $1);
  `;
  //Deconstruction values for req.body.abilityScores_id
  const { str, dex, con, int, wis, cha } = req.body.abilityScores;


  //SQL query for saving throw update
  const savingThrowQuery = `
    UPDATE saving_throw
    SET str = $2, dex = $3, con = $4, int = $5, wis = $6, cha = $7
    WHERE throw_id = (SELECT user_id FROM user_table WHERE username = $1);
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
    WHERE skills_id = (SELECT user_id FROM user_table WHERE username = $1)
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
    const firstQ = await db.query( charTableQuery, 
            [ username,
            characterName, 
            race, 
            level, 
            armorClass, 
            profBonus,
            speed,
            currHP,
            maxHP,
            additionalNotes,
            initiative,
            charClass ]);
    // console.log('FIRST QUERY COMPLETED');
    const secondQ = await db.query(abilityScoresQuery,
          [ username, str, dex, con, int, wis, cha ]);
    // console.log('SECOND QUERY COMPLETED');
    const thirdQ = await db.query(savingThrowQuery,
          [ username, stStr, stDex, stCon, stInt, stWis, stCha ]);
    // console.log('THIRD QUERY COMPLETED');
    const fourthQ = await db.query(skillsQuery,
          [ username,
            acrobatics, 
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
            survival ]);
    // console.log('FOURTH QUERY COMPLETED');
    const finalQuery = await db.query(getCharQuery, [username]);
    // console.log('FINAL QUERY COMPLETED');
    responseData = finalQuery.rows[0];

    // deconstruct responseData to be in the expect object format
    res.locals.charSheet = {
      characterName: responseData.character_name,
      abilityScores: {
        str: responseData.str,
        dex: responseData.dex,
        con: responseData.con,
        int: responseData.int,
        wis: responseData.wis,
        cha: responseData.cha
      },
      race: responseData.race,
      class: responseData.class,
      level: responseData.level,
      armorClass: responseData.armor_class,
      profBonus: responseData.prof_bonus,
      speed: responseData.speed,
      currHP: responseData.curr_hp,
      maxHP: responseData.max_hp,
      savingThrow: {
        str: responseData.ststr,
        dex: responseData.stdex,
        con: responseData.stcon,
        int: responseData.stint,
        wis: responseData.stwis,
        cha: responseData.stcon
      },
      skills: {
          acrobatics: responseData.acrobatics,
          animalHandling: responseData.animal_handling,
          arcana: responseData.arcana,
          athletics: responseData.athletics,
          deception: responseData.deception,
          history: responseData.history,
          insight: responseData.insight,
          intimidation: responseData.intimidation,
          investigation: responseData.investigation,
          medicine: responseData.medicine,
          nature: responseData.nature,
          perception: responseData.perception,
          performance: responseData.performance,
          persuasion: responseData.persuasion,
          religion: responseData.religion,
          sleightOfHand: responseData.sleight_of_hand,
          stealth: responseData.stealth,
          survival: responseData.survival
      },
      additionalNotes: responseData.additional_notes,
      initiative: responseData.initiative
    }
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
