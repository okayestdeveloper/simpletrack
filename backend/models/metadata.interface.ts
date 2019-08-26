import * as moment from 'moment';

export interface IMetaData {
  createdBy: string;
  modifiedBy: string;
  createdDatetime: string | moment.Moment;
  modifiedDatetime: string | moment.Moment;
}
