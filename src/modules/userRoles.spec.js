import { isArtist } from "./userRoles";

describe(".isArtist()", () => {
  const artist = {
    name: "Thomas",
    email: "thomas@random.com",
    roles: ["artist"],
  };
  const nonArtist = {
    name: "Thomas",
    email: "thomas@random.com",
    roles: ["developer"],
  };
  const notUser = {};

  it('is expected to retun true is currentUser.roles include "artist"', () => {
    expect(isArtist(artist)).toBe(true);
  });

  it('is expected to retun false is currentUser.roles does NOT include "artist"', () => {
    expect(isArtist(nonArtist)).toBe(false);
  });

  it('is expected to return false if key "roles" is missing', () => {
    expect(isArtist(notUser)).toBe(false);
  });
});
