import { pick } from 'lodash';
import { BaseModel, Validations, SaveableModel } from '../base-model';
import { ISite } from './site.interface';
import { db } from '../../db';
import { QueryResult } from 'pg';
const SQL = require('sql-template-strings')
const uuidv4 = require('uuid/v4');

export class Site extends BaseModel implements ISite, SaveableModel {
  siteId = '';
  label = '';
  description = '';
  address = '';

  static readonly defaults = {
    siteId: '',
    label: '',
    description: '',
    address: '',
  };

  // todo: UPDATE this to conform more to what we've got over in LT land. Update isNew, set, reset. Perhaps decorators?

  static readonly fields = [
    'siteId',
    'label',
    'description',
    'address',
  ];

  constructor(fields: Partial<ISite>) {
    super();
    this.reset();
    this.set(fields);
  }

  set(fields: Partial<ISite>) {
    Object.assign(this, pick(fields, Site.fields));
  }

  reset() {
    Object.assign(this, Site.defaults);
  }

  toJSON(): ISite {
    return Object.assign({}, Site.defaults, pick(this, Site.fields));
  }

  clone(): Site {
    return new Site(this);
  }

  validate(): Validations | null {
    const err: Validations = {};
    // label is required, has length > 0
    if (typeof this.label != 'string' || !this.label || this.label.length == 0) {
      err.label = 'Site name cannot be empty';
    }

    if (typeof this.description !== 'string') {
      err.description = 'Site description must be a string';
    }

    if (typeof this.address !== 'string') {
      err.address = 'Site address must be a string';
    }

    // uh, that's it, I guess. Typecheck on other fields?
    return Object.keys(err).length > 0 ? err : null;
  }

  async save(): Promise<Site> {
    if (this.siteId && this.siteId.length) {
      // update
      const sql = SQL`UPDATE stdb.site
        SET label=${this.label},
          description=${this.description},
          address=${this.address}
        WHERE site_id=${this.siteId}`;
      const result: QueryResult = await db.query(sql);
      console.log('Update site: ', result);
    } else {
      // create - it's not auto-generating UUID
      this.siteId = uuidv4();
      const sql = SQL`INSERT INTO stdb.site (site_id, label, description, address)
        VALUES (${this.siteId}, ${this.label}, ${this.description}, ${this.address})`;
      const result: QueryResult = await db.query(sql);
      console.log('Create site: ', result);
    }
    return this;
  }

  get id(): string {
    return this.siteId;
  }

  set id(id: string) {
    this.siteId = id;
  }
}
