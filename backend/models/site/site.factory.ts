import { Site } from './site.model';
import { ISite } from './site.interface';
import { BaseModel, ModelFactory } from './../base-model';
import { db } from '../../db';
const SQL = require('sql-template-strings')

export class SiteFactory implements ModelFactory {
  static async load(id: string): Promise<BaseModel> {
    const sql = SQL`SELECT * FROM site WHERE siteId=${id}`;
    const site: ISite = await db.query(sql);
    return new Site(site);
  }

  static async loadList(): Promise<BaseModel[]> {
    const sites: ISite[] = await db.query('SELECT * FROM site');
    return sites.map((s) => new Site(s));
  }

}
