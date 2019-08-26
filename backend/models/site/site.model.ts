import { pick } from 'lodash';
import { BaseModel, Validations, SaveableModel } from '../base-model';
import { ISite } from './site.interface';
import { db } from '../../db';
const SQL = require('sql-template-strings')

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

  static readonly fields = [
    'siteId',
    'label',
    'description',
    'address',
  ];

  constructor(fields: Partial<ISite>) {
    super();
    this.set(fields);
  }

  set(fields: Partial<ISite>) {
    Object.assign(this, pick(fields, Site.fields), Site.defaults);
  }

  toJSON(): ISite {
    return Object.assign({}, pick(this, Site.fields), Site.defaults);
  }

  clone(): Site {
    return new Site(this);
  }

  validate(): Validations | null {
    const err = {};
    // todo:
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
      const sql = SQL`UPDATE site
        SET label=${this.label},
          description=${this.description},
          address=${this.address}
        WHERE siteId=${this.siteId}`;
      const bla = await db.query(sql);
      console.log('Update site: ', bla);
    } else {
      // create
      const sql = SQL`INSERT INTO site(label, description, address)
        VALUES (${this.label}, ${this.description}, ${this.address})
        RETURNING siteId`;
      this.siteId = await db.query(sql);
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
