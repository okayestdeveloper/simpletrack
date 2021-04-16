interface MockLocationParams {
  assign?: jest.Mock;
  reload?: jest.Mock;
  replace?: jest.Mock;
}

/**
 * A convenience function for mocking window.location in a consistent way.
 *
 * @param {MockLocationParams} { assign, reload, replace, toString }
 *  pass in your own overrides if you want to use them later. Otherwise, these
 *  are generic mock functions.
 * @returns a function that resets window.location to its original value.
 *  Useful to save and put into an afterEach
 */
function mockLocation(
  {
    assign = jest.fn(),
    reload = jest.fn(),
    replace = jest.fn(),
  }: MockLocationParams = {},
): Function {
  const original = window.location;

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      assign,
      reload,
      replace,
    },
  });

  // as any works around tsc complaining that localStorage is read only
  return () => (window as any).location = original;
}

export default mockLocation;

