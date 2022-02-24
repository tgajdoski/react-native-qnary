import _ from "lodash";
import URIjs from "urijs";

const getExtension = path => {
  const uri = URIjs(path);
  return uri
    .path()
    .split(".")
    .pop();
};

const twitter = {
  url(me) {
    if (me.screen_name) {
      return `https://twitter.com/${me.screen_name}`;
    }

    if (me.id_str) {
      return `https://twitter.com/intent/user?user_id=${me.id_str}`;
    }

    return "https://twitter.com/";
  },
  isRetweet(content) {
    const regExp = /https?:\/\/(www\.)?twitter\.com\/(#!\/)?@?([^/]*)\/status\/(\d+)/;
    const matches = regExp.exec(content);
    return matches && matches.length > 1;
  },
  contentUrl(r) {
    const screenName = _.get(r, "user.screen_name");
    const idStr = _.get(r, "id_str");

    return `https://twitter.com/${screenName}/statuses/${idStr}`;
  },
  isPublishSupported(c) {
    // todo: check needed fields and maybe way to verify token?
    const oauthToken = _.get(c, "auth.oauth_token");
    return this.publishSupported && !_.isEmpty(oauthToken);
  },
  content: {
    max: 280
  },
  publishSupported: true,
  // https://developer.twitter.com/en/docs/media/upload-media/uploading-media/media-best-practices
  supportedImageTypes: ["jpg", "jpeg", "png", "gif", "webp"],
  isImageTypeSupported(url) {
    const type = getExtension(url);
    return this.supportedImageTypes.indexOf(type) > -1;
  }
};

const tumblr = {
  url(me) {
    const primary = _.filter(me.response.user.blogs, { primary: true });
    return _.head(primary).url;
  },
  isPublishSupported() {
    return this.publishSupported;
  },
  publishSupported: false
};

const googleplus = {
  url(me) {
    if (me.url) {
      return me.url;
    }

    return `https://plus.google.com/${me.id}`;
  },
  isPublishSupported() {
    return this.publishSupported;
  },
  publishSupported: false
};

const youtube = {
  url(me) {
    // assume google plus profile here
    const customUrl = me.url.substr(me.url.indexOf("+") + 1);
    return `https://www.youtube.com/c/${customUrl}`;
  },
  isPublishSupported() {
    return this.publishSupported;
  },
  publishSupported: false
};

const facebook = {
  url(me) {
    if (me.link) {
      return me.link;
    }

    return `https://www.facebook.com/${me.id}`;
  },
  isPublishSupported(c) {
    const accessToken = _.get(c, "auth.access_token");
    return this.publishSupported && !_.isEmpty(accessToken);
  },
  contentUrl(r) {
    const id = _.get(r, "id");
    return `https://facebook.com/${id}`;
  },
  publishSupported: true
};

const instagram = {
  url(me) {
    return `https://instagram.com/${me.data.username}`;
  },
  isPublishSupported() {
    return this.publishSupported;
  },
  publishSupported: false
};

const linkedin = {
  url(me) {
    if (me.publicProfileUrl) {
      return me.publicProfileUrl;
    }

    // if (((AppInfo.config || {}).linkedin || {}).client_id) {
    //   return `http://www.linkedin.com/x/profile/${AppInfo.config.linkedin.client_id}/${me.id}`;
    // }

    return `http://www.linkedin.com/profile/view?id=${me.id}`;
  },
  contentUrl(r) {
    const url = _.get(r, "updateUrl");
    return url;
  },
  isPublishSupported(c) {
    // todo: check needed fields and maybe way to verify token?
    const accessToken = _.get(c, "auth.access_token");
    return this.publishSupported && !_.isEmpty(accessToken);
  },
  content: {
    max: 600
  },
  publishSupported: true
};

const socialFieldsService = {
  twitter,
  tumblr,
  google_plus: googleplus,
  googleplus,
  youtube,
  facebook,
  instagram,
  linkedin
};

export default socialFieldsService;
