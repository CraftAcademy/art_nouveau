export const isArtist = (object) => {
  if (object.hasOwnProperty("roles")) {
    return object.roles.includes("artist");
  } else {
    return false;
  }
}
