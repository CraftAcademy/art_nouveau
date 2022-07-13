/* eslint-disable no-extend-native */

Object.prototype.isArtist = function () {
  if (this.hasOwnProperty("roles")) {
    return this.roles.includes("artist");
  } else {
    return false;
  }
};
