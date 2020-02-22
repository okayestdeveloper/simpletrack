import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { isPlainObject } from 'lodash';

/**
 * Helper function for building out form groups from configuration
 * @param obj
 * @param {ValidatorFn | ValidatorFn[]} validators
 * @returns {FormGroup}
 */
export function getFormGroup(obj: any, validators?: ValidatorFn | ValidatorFn[]): FormGroup {
  return Object.keys(obj).reduce((fg: FormGroup, name: string) => {
    if (Array.isArray(obj[name])) {
      fg.addControl(name, getFormArray(obj[name]));
    } else if (obj[name] && typeof obj[name].getFormGroup === 'function') {
      fg.addControl(name, obj[name].getFormGroup());
    } else if (isPlainObject(obj[name])) {
      fg.addControl(name, getFormGroup(obj[name]));
    } else {
      fg.addControl(name, new FormControl(obj[name]));
    }
    return fg;
  }, new FormGroup({}, validators));
}

/**
 * Helper function for building out form arrays from configuration
 * @param list
 * @param {ValidatorFn | ValidatorFn[]} validators
 * @returns {FormGroup}
 */
export function getFormArray(list: any[], validators?: ValidatorFn | ValidatorFn[]): FormArray {
  return list.reduce((ra: FormArray, item: any) => {
    if (Array.isArray(item)) {
      ra.push(getFormArray(item));
    } else if (item && typeof item.getFormGroup === 'function') {
      ra.push(item.getFormGroup());
    } else if (isPlainObject(item)) {
      ra.push(getFormGroup(item, validators));
    } else {
      ra.push(new FormControl(item, validators));
    }
    return ra;
  }, new FormArray([], validators));
}

/**
 * Helper for finding a default value for a field on an IModel instance.
 * @param {extends IModel} inst the instance
 * @param {string} field the field name
 * @returns {any} The value of the field on the instance. Failing that, the value on a non-static defaults list on the instance. Failing
 * that, the value of the field in Class.defaults. Failing that, ''
 */
export function getValue(inst, field: string) {
  if (inst.hasOwnProperty(field)) {
    return inst[field];
  }

  if (inst.hasOwnProperty('defaults') && inst.defaults.hasOwnProperty(field)) {
    return inst.defaults[field];
  }

  if (inst.constructor.hasOwnProperty('defaults') && inst.constructor.defaults.hasOwnProperty(field)) {
    return inst.constructor.defaults[field];
  }

  return '';
}
