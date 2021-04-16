import mediaQuery from 'css-mediaquery';

/**
 * A convenience function for mocking window.innerWidth in a consistent way.
 *
 * @param {number} width the screen width to set
 * @returns a function that resets the window.innerWidth to its original value.
 *  Useful to save and put into an afterEach
 */
function mockScreenWidth(width: number): Function {
  const originalInner = window.innerWidth;
  Object.defineProperty(
    window,
    'innerWidth',
    {
      writable: true,
      configurable: true,
      value: width,
    },
  );

  const originalOuter = window.outerWidth;
  Object.defineProperty(
    window,
    'outerWidth',
    {
      writable: true,
      configurable: true,
      value: width,
    },
  );

  // todo: this matchMedia stuff can be removed if JSDOM starts supporting window.matchMedia
  const originalMatchMedia = window.matchMedia;

  Object.defineProperty(
    window,
    'matchMedia',
    {
      writable: true,
      configurable: true,
      value: (query: any) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
      }),
    },
  );

  return () => {
    (window as any).outerWidth = originalOuter;
    (window as any).innerWidth = originalInner;
    // todo: this can be removed if JSDOM starts supporting window.matchMedia
    (window as any).matchMedia = originalMatchMedia;
  };
}

export default mockScreenWidth;
