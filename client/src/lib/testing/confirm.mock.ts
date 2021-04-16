/**
 * A convenience function for mocking window.confirm in a consistent way.
 *
 * @param {jest.Mock} mockConfirm
 *  pass in your own override if you want to use it later. Otherwise, this is
 *  a generic mock function.
 * @returns a function that resets window.confirm to its original value.
 *  Useful to save and put into an afterEach
 */
function mockWindowConfirm(mockConfirm = jest.fn()): Function {
  const original = window.confirm;

  Object.defineProperty(window, 'confirm', {
    writable: true,
    value: mockConfirm,
  });

  // as any works around tsc complaining that confirm is read only
  return () => (window as any).confirm = original;
}

export default mockWindowConfirm;

