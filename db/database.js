const { postgres } = require('../config.json');
const { Pool } = require('pg')



const pool = new Pool({
  user: postgres.user,
  host: postgres.host,
  database: postgres.database,
  password: postgres.password,
  port: postgres.port,
})

async function query(q){
    const res = await pool.query(q);
  
    return res.rows;
}

async function fullQuery(q){
    const res = await pool.query(q);
    return res;
}


module.exports = { query, fullQuery };


