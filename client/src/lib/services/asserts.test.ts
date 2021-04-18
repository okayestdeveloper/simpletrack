import { assertIsDefined, assert } from './asserts';

describe(`typescript asserts`, () => {
  describe(`general assert`, () => {
    it(`should throw if condition is falsy`, () => {
      expect(() => assert(false)).toThrow();
    });

    it(`should not throw if condition is truthy`, () => {
      expect(() => assert(true)).not.toThrow();
    });
  });

  describe(`assertIsDefined`, () => {
    it(`should throw if value is undefined`, () => {
      expect(() => assertIsDefined(undefined)).toThrow();
    });

    it(`should throw if value is null`, () => {
      expect(() => assertIsDefined(null)).toThrow();
    });

    it(`should not throw if value is defined`, () => {
      expect(() => assertIsDefined(1)).not.toThrow();
    });
  });
});
