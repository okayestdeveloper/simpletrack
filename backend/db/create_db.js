
const path = require('path');
const envPath = path.resolve(process.cwd(), 'backend', `.env.${process.env.SIMPLETRACK_ENV}`);
require('dotenv').config({ path: envPath });
const { Client } = require('pg');

(async () => {
  let client = new Client({
    user: 'bradledbetter',
    database: 'postgres'
  });
  try {
    await client.connect();

    const dbConfig = {
      name: process.env.SIMPLETRACK_DB_NAME,
      user: process.env.SIMPLETRACK_DB_USER,
      password: process.env.SIMPLETRACK_DB_PASSWD,
      schema: 'stdb'
    };

    let sql = `SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
    WHERE datname = '${dbConfig.name}'`;
    await client.query(sql);

    sql = `DROP DATABASE IF EXISTS ${dbConfig.name}`;
    await client.query(sql);

    sql = `DROP USER IF EXISTS ${dbConfig.user}`;
    await client.query(sql);

    /* Regular user create */
    sql = `CREATE USER ${dbConfig.user}
        WITH LOGIN
       ENCRYPTED PASSWORD '${dbConfig.password}'`;
    await client.query(sql);

    sql = `CREATE DATABASE ${dbConfig.name} WITH OWNER = ${dbConfig.user}`;
    await client.query(sql);

    sql = `GRANT CONNECT ON DATABASE ${dbConfig.name} TO ${dbConfig.user}`;
    await client.query(sql);

    // * can't issue psql commands, so disconnect and reconnect
    await client.end();
    client = new Client({
      user: 'bradledbetter',
      database: dbConfig.name,
    });
    await client.connect();

    /* UUID support */

    sql = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.query(sql);

    sql = `SET role ${dbConfig.user}`;
    await client.query(sql);

    sql = `CREATE SCHEMA ${dbConfig.schema}`;
    await client.query(sql);

    sql = `GRANT USAGE ON SCHEMA ${dbConfig.schema} TO ${dbConfig.user}`;
    await client.query(sql);

    sql = `GRANT SELECT ON ALL TABLES IN SCHEMA ${dbConfig.schema} TO ${dbConfig.user}`;
    await client.query(sql);

    await client.end();
  } catch (ex) {
    console.error(ex);
    client.end();
    process.exit(1);
  }
})();

