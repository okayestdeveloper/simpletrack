import { FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Shared model interface. Any model interface should extend this.
 */
export interface IModel {
  className?: string;

  /**
   * If true, the model hasn't been persisted to the API
   */
  isNew: boolean;

  /**
   * Convert a model to a JSON serializable object.
   * This will help to avoid encoding isNew and other properties that shouldn't be on the JSON.
   * It also makes it possible to do this: `this.http.post(url, this)` because `HttpRequest` uses `JSON.stringify()`
   */
  toJSON: () => object;

  /**
   * Clone this model. This comes up where we might want to edit some values on a model and potentially discard them. For example where we
   * pop up an edit modal from an item in a list.
   */
  clone: () => IModel | Observable<IModel>;
}

export interface ISaveableModel {
  isNew: boolean;
  postPath: string;
  putPath: string;

  /**
   * Utility function for setting model properties. Should be used by constructor, save(), etc to set properties.
   * @param {Partial<T>} fields
   */
  set: <T extends any>(fields: Partial<T>) => void;

  /**
   * Persist the model to the backend.
   * @returns {Observable<IModel>}
   */
  save: () => Observable<IModel>;
}

/**
 *
 */
export interface IDeleteableModel {
  isNew: boolean;
  deletePath: string;

  /**
   * Reset the properties to a default/empty state.
   */
  reset: () => void;

  /**
   * Delete the model on the backend.
   * @returns {Observable<IModel>}
   */
  delete: () => Observable<IModel>;
}

/**
 * Implement this to give a model a function that will return a FormGroup of the model's properties suitable for use in a reactive form.
 */
export interface IFormModel {
  /**
   * Get a FormGroup for the model. For embedding in a reactive form, of course.
   * @param {FormGroup} a form group to potentially modify. This is handy with the decorator. Or a component might want to add form
   * validation specific to itself.
   * @returns {FormGroup}
   */
  getFormGroup: (group?: FormGroup) => FormGroup;
}

/**
 * Configuration for the modelForm decorator factory
 */
export interface IModelFormConfig {
  [fieldName: string]: ValidatorFn | ValidatorFn[];
}
