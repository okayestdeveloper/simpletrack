import { Site } from './site.model';
import { ISite } from './site.interface';
import { BaseModel, ModelFactory } from './../base-model';
import { db } from '../../db';
import { QueryResult } from 'pg';
const SQL = require('sql-template-strings')

export class SiteFactory implements ModelFactory {
  static async load(id: string): Promise<BaseModel> {
    const sql = SQL`SELECT * FROM stdb.site WHERE site_id=${id}`;
    const result: QueryResult = await db.query(sql);
    if (result.rowCount !== 1) {
      throw new Error(`Could not load site - query returned ${result.rowCount} rows`);
    }
    return new Site(result.rows[0] as ISite);
  }

  static async loadList(): Promise<BaseModel[]> {
    const result: QueryResult = await db.query('SELECT * FROM stdb.site');
    if (result.rowCount === 0) {
      return [];
    }
    const sites: ISite[] = result.rows;
    return sites.map((s) => new Site(s));
  }

  static async delete(id: string): Promise<any> {
    if (!id || id.length === 0) {
      throw new Error('Cannot delete site without site_id.');
    }
    const sql = SQL`DELETE FROM stdb.site WHERE site_id=${id}`;
    await db.query(sql);
    return 'deleted';
  }
}
