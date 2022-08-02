import { isArtist, isDeveloper } from "./userRoles";

const artist = {
  name: "Thomas",
  email: "thomas@random.com",
  roles: ["artist"],
};
const developer = {
  name: "Thomas",
  email: "thomas@random.com",
  roles: ["developer"],
};
const notUser = {};

describe(".isArtist()", () => {
  it('is expected to return true if currentUser.roles includes "artist"', () => {
    expect(isArtist(artist)).toBe(true);
  });

  it('is expected to retun false is currentUser.roles does NOT include "artist"', () => {
    expect(isArtist(developer)).toBe(false);
  });

  it('is expected to return false if key "roles" is missing', () => {
    expect(isArtist(notUser)).toBe(false);
  });
});

describe(".isDeveloper()", () => {
  it('is expected to return true if currentUser.roles includes "developer"', () => {
    expect(isDeveloper(developer)).toBe(true);
  });

  it('is expected to retun false is currentUser.roles does NOT include "developer"', () => {
    expect(isDeveloper(artist)).toBe(false);
  });

  it('is expected to return false if key "roles" is missing', () => {
    expect(isDeveloper(notUser)).toBe(false);
  });
});
