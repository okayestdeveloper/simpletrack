/**
 * A convenience function for mocking window.alert in a consistent way.
 *
 * @param {jest.Mock} mockAlert
 *  pass in your own override if you want to use it later. Otherwise, this is
 *  a generic mock functions.
 * @returns a function that resets window.alert to its original value.
 *  Useful to save and put into an afterEach
 */
function mockWindowAlert(mockAlert = jest.fn()): Function {
  const original = window.alert;

  Object.defineProperty(window, 'alert', {
    writable: true,
    value: mockAlert,
  });

  // as any works around tsc complaining that alert is read only
  return () => (window as any).alert = original;
}

export default mockWindowAlert;

