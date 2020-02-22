import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { getFormArray, getFormGroup, getValue } from './form-helpers';

describe('Form helpers', () => {

  describe('getFormGroup', () => {
    const obj = {
      val: '',
      obj: { val: '' },
      arr: [''],
      model: jasmine.createSpyObj({ getFormGroup: new FormGroup({}) }),
    };
    let fg;

    beforeEach(() => {
      fg = getFormGroup(obj);
    });

    it('should return a FormGroup', () => {
      expect(fg).toEqual(jasmine.any(FormGroup));
    });

    it('should add a FormGroup for an object property', () => {
      expect(fg.get('obj')).toEqual(jasmine.any(FormGroup));
    });

    it('should add a FormArray for an array property', () => {
      expect(fg.get('arr')).toEqual(jasmine.any(FormArray));
    });

    it('should add a FormControl for a base type', () => {
      expect(fg.get('val')).toEqual(jasmine.any(FormControl));
    });

    it('should call getFormGroup if an instance has that function', () => {
      expect(fg.get('model')).toEqual(jasmine.any(FormGroup));
      expect(obj.model.getFormGroup).toHaveBeenCalled();
    });
  });

  describe('getFormArray', () => {
    const arr = [
      '',
      { val: '' },
      [''],
      jasmine.createSpyObj({ getFormGroup: new FormGroup({}) }),
    ];
    let fa;

    beforeEach(() => {
      fa = getFormArray(arr);
    });

    it('should return a FormArray', () => {
      expect(fa).toEqual(jasmine.any(FormArray));
    });

    it('should call add a FormArray for an array property', () => {
      expect(fa.at(2)).toEqual(jasmine.any(FormArray));
    });

    it('should call add a FormGroup for an object property', () => {
      expect(fa.at(1)).toEqual(jasmine.any(FormGroup));
    });

    it('should add a FormControl for a base type', () => {
      expect(fa.at(0)).toEqual(jasmine.any(FormControl));
    });

    it('should call getFormGroup if an instance in the array has that function', () => {
      expect(fa.at(3)).toEqual(jasmine.any(FormGroup));
      expect(arr[3].getFormGroup).toHaveBeenCalled();
    });
  });

  describe('getValue', () => {
    class MockInstClass {
      field = false;
    }

    class MockDefaultsClass {
      readonly defaults = {
        field: 0,
      };
    }

    class MockStaticDefaultsClass {
      static readonly defaults = {
        field: null,
      };
    }

    it('should return the value of the field in the instance if it exists', () => {
      const inst = new MockInstClass();
      expect(getValue(inst, 'field')).toEqual(false);
    });

    it('should return the value of the non static default if that exists', () => {
      const inst = new MockDefaultsClass();
      expect(getValue(inst, 'field')).toEqual(0);
    });

    it('should return the value of the static default if that exists', () => {
      const inst = new MockStaticDefaultsClass();
      expect(getValue(inst, 'field')).toEqual(null);
    });

    it(`should return '' if it can't find the field`, () => {
      const inst = new MockInstClass();
      expect(getValue(inst, 'foo')).toEqual('');
    });
  });
});
