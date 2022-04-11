const db = require('../model/database_model');

const userController = {};
const activeSessions = {};
const staticQuery = 
`INSERT INTO character (character_name, race, level, armor_class, prof_bonus, speed, curr_hp, max_hp, additional_notes, initiative) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9), $10)
INSERT INTO ability_scores (str, dex, con, int, wis, cha) VALUES ($1, $2, $3, $4, $5, $6)
INSERT INTO saving_throw (str, dex, con, int, wis, cha) VALES ($1, $2, $3, $4, $5, $6)
INSERT INTO skills (acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleight_of_hand, stealth, survival) VALUE ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);`;


userController.createUser = (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const dynamicQuery = 'INSERT INTO "user_table" (firstName, lastName, email, username, password) VALUES ($1, $2, $3, $4, $5);';  
  db.query(dynamicQuery, [firstName, lastName, email, username, password])
  .then((result) => {
    console.log(`Successfully created user entry: ${result}, creating character sheet.`);
    db.query(staticQuery).then((result) => {
      console.log(`Successfully created character sheet: ${result}, creating auth token now.`);
      return next();
    })
  })
  .catch((err) => {
    return next({
      log: `Error: ${err}`,
      message: 'Error creating user - see server logs for more details'
    });
  })
};