const db = require('../model/database_model');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;
  const dynamicQueryUser = 'INSERT INTO "user_table" (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5);';
  const charIDSelect = `SELECT character_id FROM "user_table" WHERE username = $1`;
  const dynamicQueryCharacter = `INSERT INTO character ("character_id", "character_name", "race", "level", "armor_class", "prof_bonus", "speed", "curr_hp", "max_hp", "additional_notes", "initiative") VALUES ($1, 'dan', 'mush', '0', '20', '3', '10', '10', '10', 'some notes', '5');`;
  const dependentTableSelect = `SELECT saving_throw_id, skill_id, ability_scores_id FROM "character" WHERE character_id = $1`;

  try {
    await db.query(dynamicQueryUser, [first_name, last_name, email, username, password]);
    const charID = await db.query(charIDSelect, [username]);
    await db.query(dynamicQueryCharacter, [charID.rows[0].character_id]);
    const dependentTableID = await db.query(dependentTableSelect, [charID.rows[0].character_id]);
    await db.query(`INSERT INTO ability_scores VALUES ($1, '10', '11', '12', '13', '14', '15');`, [dependentTableID.rows[0].ability_scores_id]);
    await db.query(`INSERT INTO saving_throw VALUES ($1, 'true', 'false', 'true', 'false', 'false', 'false');`, [dependentTableID.rows[0].saving_throw_id]);
    await db.query(`INSERT INTO skills VALUES($1, 'false', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false');`, [dependentTableID.rows[0].skill_id]);
    next();
  } catch (err) {
    next({
      log: `Error creating user: ${err}`,
      message: 'Error creating user in database - see database logs for more information'
    })
  }
  

};

module.exports = userController;