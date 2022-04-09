const { Pool } = require('pg');

const PG_URI = 'postgres://htwxmjkq:HuCMO49R4ydC9hQ15B-iViJU_aJGP9hM@batyr.db.elephantsql.com/htwxmjkq'

//creating a new pool (using collection from the DB)
const pool = new Pool({
  connectionString: PG_URI,
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback)
  }
}