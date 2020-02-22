import { Observable } from 'rxjs';
import { IModel } from './model.interface';

/**
 * Defines the interface a Component or Service uses to create and load IQModel instances.
 */
export interface IModelFactory {
  /**
   * Load one instance of a model from the API. e.g. GET url/:id
   */
  load: (id: string) => Observable<IModel>;

  /**
   * Load a list of model instances from the API. e.g. GET url/
   * @param {any} params optional parameters for the API to load the list
   */
  loadList: (params?: any) => Observable<IModel[]>;

  /**
   * Create a new model (not persisted to API) with whatever default values are appropriate for the instance.
   */
  create: (fields?: object) => IModel;
}
