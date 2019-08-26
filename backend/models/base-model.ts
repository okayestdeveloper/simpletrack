export interface Validations {
  [key: string]: string;
}

export abstract class BaseModel {
  readonly tableName = '';

  abstract get id(): string;

  abstract set id(id: string);

  get isNew(): boolean {
    return !this.id;
  }

  abstract toJSON(): object;

  abstract clone(): BaseModel;

  /**
   * Returns null if object is valid, or a plain object map of 'code' to error message for things that aren't valid.
   * e.g. { label: 'Label cannot be empty', amount: 'Amount must be greater than 0' }
   */
  abstract validate(): Validations | null;
}

export interface SaveableModel {
  save: () => Promise<BaseModel>;
}

export interface DeleteableModel {
  delete: () => Promise<any>;
}

export class ModelFactory {
  static load(id: string): Promise<BaseModel> {
    throw new Error('This is my hacky static abstract BS');
  }

  static loadList(params = {}): Promise<BaseModel[]> {
    throw new Error('This is my hacky static abstract BS');
  }
}
