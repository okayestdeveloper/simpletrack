const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.SIMPLETRACK_DB_USER,
  host: process.env.SIMPLETRACK_DB_HOST,
  database: process.env.SIMPLETRACK_DB_NAME,
  password: process.env.SIMPLETRACK_DB_PASSWD,
  port: process.env.SIMPLETRACK_DB_HOST,
});

export const db = {
  query: (text: any, params?: any, callback?: Function) => {
    return pool.query(text, params, callback)
  },
};
