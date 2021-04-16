// @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

/**
 * A general assertion of a conditional.
 * ```typescript
   function yell(str) {
     assert(typeof str === "string");

     return str.toUppercase();
     //         ~~~~~~~~~~~
     // error: Property 'toUppercase' does not exist on type 'string'.
     //        Did you mean 'toUpperCase'?
   }
 * ```
 * @param {any} condition could be any conditional that evaluates to a boolean
 * @param {string} [msg] an optional message to
 * @throws on a false conditional
 */
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

/**
 * Assertion to check that a given value is not `null` nor `undefined`
 *
 * @param {T} val
 * @throws if val is `null` or `undefined`
 */
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected value to be defined, but received ${val}`);
  }
}
