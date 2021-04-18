import { isLoggedIn } from "./authentication";

describe('authentication service', () => {
  it('should return true if logged in', () => {
    expect(isLoggedIn()).toEqual(true);
  });
});
