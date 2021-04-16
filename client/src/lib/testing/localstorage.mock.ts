interface MockLocalStorageParams {
  getItem?: jest.Mock;
  setItem?: jest.Mock;
  removeItem?: jest.Mock;
  clear?: jest.Mock;
}

/**
 * A convenience function for mocking localstorage in a consistent way.
 *
 * @param {MockLocalStorageParams} { getItem, setItem, clear, removeItem }
 *  pass in your own overrides if you want to use them later. Otherwise, these
 *  are generic mock functions.
 * @returns a function that resets localStorage to its original value.
 *  Useful to save and put into an afterEach
 */
function mockLocalStorage(
  {
    getItem = jest.fn(),
    setItem = jest.fn(),
    clear = jest.fn(),
    removeItem = jest.fn(),
  }: MockLocalStorageParams = {},
): Function {
  const original = window.localStorage;

  Object.defineProperty(window, 'localStorage', {
    writable: true,
    value: {
      getItem,
      setItem,
      removeItem,
      clear,
    },
  });

  // as any works around tsc complaining that localStorage is read only
  return () => (window as any).localStorage = original;
}

export default mockLocalStorage;
