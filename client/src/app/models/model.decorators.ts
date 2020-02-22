import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { isPlainObject } from 'lodash';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getFormArray, getFormGroup, getValue } from './form-helpers';
import { IModelFormConfig, ISaveableModel } from './model.interface';

/*
todo: perhaps in the future we can convert this to a function that returns a decorator and allow the caller to determine if the decorator's
 implementation is called before or after the class's implementation or if it overrides as it does now by passing in options.
Or maybe switchMap to the class's implementation to allow special handling?
*/
export function modelSave(target: any, key: string, desc: PropertyDescriptor) {
  let descriptor = desc;
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  // NOTE: this completely overwrites the method and doesn't work with other decorators
  descriptor.value = function () {
    if (this.isNew) {
      return this.http.post(this.postPath, this)
        .pipe(
          tap((model: ISaveableModel) => this.set(model)),
          map(() => this),
        );
    } else {
      return this.http.put(this.putPath, this)
        .pipe(
          tap((model: ISaveableModel) => this.set(model)),
          map(() => this),
        );
    }
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}


export function modelDelete(target: any, key: string, desc: PropertyDescriptor) {
  let descriptor = desc;
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }

  // NOTE: this completely overwrites the method and doesn't work with other decorators
  descriptor.value = function () {
    if (!this.isNew) {
      return this.http.delete(this.deletePath)
        .pipe(
          map(() => {
            this.reset();
            return this;
          }),
        );
    }
    return of(this);
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}

/**
 * A decorator factory for fairly generic FormGroups for simple models.
 * @param {IModelFormConfig} fields control configuration for the FormGroup
 * @param {ValidatorFn | ValidatorFn[]} formValidators optional whole form validators
 * @returns {(target: any, key: string, desc: PropertyDescriptor) => PropertyDescriptor} the decorator
 */
export function modelForm(fields: IModelFormConfig, formValidators?: ValidatorFn | ValidatorFn[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    let descriptor = desc;
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    const originalMethod = descriptor.value;

    descriptor.value = function () {
      const group = Object.keys(fields).reduce((fg: FormGroup, name: string) => {
        const validators = fields[name] ? fields[name] : null;
        if (Array.isArray(this[name])) {
          fg.addControl(name, getFormArray(this[name], validators));
        } else if (this[name] && typeof this[name].getFormGroup === 'function') {
          fg.addControl(name, this[name].getFormGroup());
        } else if (isPlainObject(this[name])) {
          fg.addControl(name, getFormGroup(this[name], validators));
        } else {
          fg.addControl(name, new FormControl(getValue(this, name), validators));
        }
        return fg;
      }, new FormGroup({}));

      if (formValidators) {
        group.setValidators(formValidators);
      }

      return originalMethod.call(this, group) || group;
    };

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
  };
}
