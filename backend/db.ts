import { ConnectionConfig, QueryResult, QueryArrayResult } from 'pg';
import { mapKeys, camelCase } from 'lodash';
const Pool = require('pg').Pool;

const config: ConnectionConfig = {
  user: process.env.SIMPLETRACK_DB_USER,
  host: process.env.SIMPLETRACK_DB_HOST,
  database: process.env.SIMPLETRACK_DB_NAME,
  password: process.env.SIMPLETRACK_DB_PASSWD,
  port: process.env.SIMPLETRACK_DB_PORT ? parseInt(process.env.SIMPLETRACK_DB_PORT) : 5432,
};
export const pool = new Pool(config);

// ! this appears to not work. I really would like a solution here.
(async () => {
  // * should this work, here's where we'd figure out a tenant and switch to their schema.
  await pool.query('SET search_path TO stdb');
})();

/**
 * Iterate over rows ob objects, changing keys from snake_case to camelCase
 * @param {Array<any>} results QueryResult.rows or QueryArrayResult.rows
 * @return QueryResult.rows or QueryArrayResult.rows with column names in camelCase
 */
function camelCaseColums(results: Array<any>): Array<any> {
  return results.map((result) => {
    if (Array.isArray(result)) {
      return camelCaseColums(result);
    }
    // ? do I need to check
    return mapKeys(result, (val, key) => camelCase(key));
  });
}

export const db = {
  query: (text: any, params?: any, callback?: Function): Promise<QueryResult | QueryArrayResult> => {
    // ? todo #3: perhaps insert a middleware here to convert column names from camelCase to camelCase. That's a tough regex, I think
    // ? todo #4: perhaps insert a middleware here to tack on created by/modified by on INSERT/UPDATE
    return pool.query(text, params, callback)
      .then((result: QueryResult | QueryArrayResult) => {
        if (result.rowCount > 0) {
          result.rows = camelCaseColums(result.rows);
        }
        return result;
      });
  },
};
