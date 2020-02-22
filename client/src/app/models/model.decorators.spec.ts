import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { modelDelete, modelForm, modelSave } from '@app/models/model.decorators';
import { of } from 'rxjs';

class Mock {
  http = jasmine.createSpyObj({
    post: of(this),
    put: of(this),
    delete: of(this),
  });

  isNew = false;

  set = jasmine.createSpy('set');
  reset = jasmine.createSpy('reset');

  val = '';
  obj = { val: '' };
  arr = [''];
  model = jasmine.createSpyObj({ getFormGroup: new FormGroup({}) });

  get postPath(): string {
    return '';
  }

  get putPath(): string {
    return '';
  }

  get deletePath(): string {
    return '';
  }

  save() {}

  delete() {}

  getFormGroup(fg?: FormGroup) {
    return fg;
  }
}

describe('Model decorators', () => {

  describe('modelSave', () => {
    it('should call Object.getOwnPropertyDescriptor if descriptor is undefined', () => {
      spyOn(Object, 'getOwnPropertyDescriptor').and.callThrough();
      modelSave(Mock.prototype, 'save', undefined);
      expect(Object.getOwnPropertyDescriptor).toHaveBeenCalledWith(Mock.prototype, 'save');
    });

    it('should return a PropertyDescriptor', () => {
      const desc = modelSave(Mock.prototype, 'save', undefined);
      expect(Object.keys(desc)).toContain('configurable');
      expect(Object.keys(desc)).toContain('enumerable');
      expect(Object.keys(desc)).toContain('value');
      expect(Object.keys(desc)).toContain('writable');
    });

    it('should replace descriptor.value with save boilerplate function', () => {
      const desc = modelSave(Mock.prototype, 'save', undefined);
      expect(typeof desc.value).toEqual('function');
      expect(desc.value).not.toEqual(Mock.prototype.save);
    });

    describe(', save boilerplate function', () => {
      const m = new Mock();
      let desc;

      beforeEach(() => {
        desc = modelSave(Mock.prototype, 'save', undefined);
      });

      describe(', new model', () => {
        beforeEach(() => {
          m.isNew = true;
        });

        it('should use postPath model property to get url', () => {
          const pathSpy = spyOnProperty(m, 'postPath', 'get').and.callThrough();
          desc.value.call(m);
          expect(pathSpy).toHaveBeenCalled();
        });

        it('should call http.post', () => {
          desc.value.call(m);
          expect(m.http.post).toHaveBeenCalledWith(m.postPath, m);
        });

        it('should call model.set to update properties', () => {
          desc.value.call(m).subscribe(() => {
            expect(m.set).toHaveBeenCalled();
          });
        });
      });

      describe(', not new model', () => {
        beforeEach(() => {
          m.isNew = false;
        });

        it('should use putPath model property to get url', () => {
          const pathSpy = spyOnProperty(m, 'putPath', 'get').and.callThrough();
          desc.value.call(m);
          expect(pathSpy).toHaveBeenCalled();
        });

        it('should call http.put', () => {
          desc.value.call(m);
          expect(m.http.put).toHaveBeenCalledWith(m.putPath, m);
        });

        it('should call model.set to update properties', () => {
          desc.value.call(m).subscribe(() => {
            expect(m.set).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('modelDelete', () => {

    it('should call Object.getOwnPropertyDescriptor if descriptor is undefined', () => {
      spyOn(Object, 'getOwnPropertyDescriptor').and.callThrough();
      modelDelete(Mock.prototype, 'delete', undefined);
      expect(Object.getOwnPropertyDescriptor).toHaveBeenCalledWith(Mock.prototype, 'delete');
    });

    it('should return a PropertyDescriptor', () => {
      const desc = modelDelete(Mock.prototype, 'delete', undefined);
      expect(Object.keys(desc)).toContain('configurable');
      expect(Object.keys(desc)).toContain('enumerable');
      expect(Object.keys(desc)).toContain('value');
      expect(Object.keys(desc)).toContain('writable');
    });

    it('should replace descriptor.value with delete boilerplate function', () => {
      const desc = modelDelete(Mock.prototype, 'delete', undefined);
      expect(typeof desc.value).toEqual('function');
      expect(desc.value).not.toEqual(Mock.prototype.delete);
    });

    describe('delete boilerplate function', () => {
      let m;
      let desc;

      beforeEach(() => {
        desc = modelDelete(Mock.prototype, 'delete', undefined);
        m = new Mock();
      });

      describe('not new model', () => {
        beforeEach(() => {
          m.isNew = false;
        });

        it('should use deletePath model property to get url', () => {
          const pathSpy = spyOnProperty(m, 'deletePath', 'get').and.callThrough();
          desc.value.call(m);
          expect(pathSpy).toHaveBeenCalled();
        });

        it('should call http.delete', () => {
          desc.value.call(m);
          expect(m.http.delete).toHaveBeenCalledWith(m.deletePath);
        });

        it('should call model.reset to clear properties', () => {
          desc.value.call(m).subscribe(() => {
            expect(m.reset).toHaveBeenCalled();
          });
        });
      });

      describe('new model', () => {
        beforeEach(() => {
          m.isNew = true;
        });

        it('should not call http.delete', () => {
          desc.value.call(m);
          expect(m.http.delete).not.toHaveBeenCalled();
        });

        it('should not call model.reset', () => {
          desc.value.call(m).subscribe(() => {
            expect(m.reset).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('modelForm', () => {
    let decorator;

    beforeEach(() => {
      decorator = modelForm({});
    });

    it('should call Object.getOwnPropertyDescriptor if descriptor is undefined', () => {
      spyOn(Object, 'getOwnPropertyDescriptor').and.callThrough();
      decorator(Mock.prototype, 'getFormGroup', undefined);
      expect(Object.getOwnPropertyDescriptor).toHaveBeenCalledWith(Mock.prototype, 'getFormGroup');
    });

    it('should return a PropertyDescriptor', () => {
      const desc = decorator(Mock.prototype, 'getFormGroup', undefined);
      expect(Object.keys(desc)).toContain('configurable');
      expect(Object.keys(desc)).toContain('enumerable');
      expect(Object.keys(desc)).toContain('value');
      expect(Object.keys(desc)).toContain('writable');
    });

    it('should replace descriptor.value with form boilerplate function', () => {
      const desc = decorator(Mock.prototype, 'getFormGroup', undefined);
      expect(typeof desc.value).toEqual('function');
      expect(desc.value).not.toEqual(Mock.prototype.getFormGroup);
    });

    describe('form boilerplate function', () => {
      let fg;
      let mock;

      beforeEach(() => {
        decorator = modelForm({
          val: null,
          obj: null,
          arr: null,
          model: null,
        });
        const desc = decorator(Mock.prototype, 'getFormGroup', undefined);
        mock = new Mock();
        fg = desc.value.call(mock);
      });

      it('should return a form group', () => {
        expect(fg).toEqual(jasmine.any(FormGroup));
      });

      it('should add FormControl for each property of basic type', () => {
        expect(fg.get('val')).toEqual(jasmine.any(FormControl));
      });

      it('should add a FormGroup for object properties', () => {
        expect(fg.get('obj')).toEqual(jasmine.any(FormGroup));
      });

      it('should add a FormArray for array properties', () => {
        expect(fg.get('arr')).toEqual(jasmine.any(FormArray));
      });

      it('should call getFormGroup if an instance has that function', () => {
        expect(fg.get('model')).toEqual(jasmine.any(FormGroup));
        expect(mock.model.getFormGroup).toHaveBeenCalled();
      });
    });
  });
});
