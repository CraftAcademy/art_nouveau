export const isArtist = (object) => {
  if (object.hasOwnProperty("roles")) {
    return object.roles.includes("artist");
  } else {
    return false;
  }
};

export const isDeveloper = (object) => {
  if (object.hasOwnProperty("roles")) {
    return object.roles.includes("developer");
  } else {
    return false;
  }
};
