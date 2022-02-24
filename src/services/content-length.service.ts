import Twitter from "twitter-text";

import _ from "lodash";

import socialFieldsService from "./social-fields.service";

const len = (source, content, max) => {
  if (!content) {
    content = ""; // eslint-disable-line
  }

  max = max || _.get(socialFieldsService, [source, "content", "max"], 0); // eslint-disable-line

  const maxLength = max || 0;
  const length =
    source === "twitter"
      ? Twitter.parseTweet(content).weightedLength
      : content.length;

  const info = {
    length,
    max: maxLength,
    remaining: maxLength - length
  };

  return info;
};

const contentLengthService = {
  len
};

export default contentLengthService;
