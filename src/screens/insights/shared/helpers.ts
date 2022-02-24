import _ from "lodash";

const keysCount = obj => _.keys(obj).length;

const getTwitterEntityName = (handle, users) => {
  const index =
    handle.indexOf("@") >= 0
      ? handle.indexOf("@")
      : handle.indexOf(":") >= 0
        ? handle.indexOf(":")
        : 0;
  handle = index > 0 ? handle.substring(index + 1) : handle;
  if (users && Array.isArray(users)) {
    for (let i = 0, l = users.length; i < l; i++) {
      if (handle === users[i].screen_name) {
        return users[i].name;
      }
    }
  }
  return `@${handle}`;
};

const getIncludeOrHashtag = val => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(val);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return val;
};

export default {
  keysCount,
  getTwitterEntityName,
  getIncludeOrHashtag
};
