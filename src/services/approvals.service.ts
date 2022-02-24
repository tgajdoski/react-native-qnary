import _ from "lodash";
import { tz } from "moment-timezone";

import socialFieldsService from "./social-fields.service";

const postTypes = [
  {
    postTypeId: "twitter",
    postTypeName: "Twitter",
    postTypeText: "Twitter post",
    postTypeCharLimit: 280
  },
  {
    postTypeId: "linkedin",
    postTypeName: "Linkedin",
    postTypeText: "LinkedIn post",
    postTypeCharLimit: 600
  },
  {
    postTypeId: "facebook",
    postTypeName: "Facebook",
    postTypeText: "Facebook post",
    postTypeCharLimit: null
  },
  {
    postTypeId: "instagram",
    postTypeName: "Instagram",
    postTypeText: "Instagram post",
    postTypeCharLimit: null
  },
  {
    source: "other",
    postTypeId: "other",
    postTypeName: "Other/Multiple",
    postTypeText: "content",
    postTypeCharLimit: null
  }
];

const approvalsService = {
  userDate: (approval, field) => {
    const timezone = _.get(approval, "publish.settings.timezone", tz.guess());
    const date = _.get(approval, field);
    const publishAtTz = tz(date, timezone);
    return publishAtTz.format("MMMM Do, h:mm A z");
  },

  scheduledDate: approval =>
    approvalsService.userDate(approval, "publish_at_str"),

  publishedDate: approval =>
    approvalsService.userDate(approval, "published_at"),

  isScheduled: approval =>
    approval.publish_at_str && approval.type !== "content",

  isPublished: approval => {
    const publishedAt = _.get(approval, "publish.published_at");
    return !!publishedAt && approval.type !== "content";
  },

  getPublishedAtDate: approval => {
    const publishedAt = _.get(approval, "publish.published_at");
    const timezone = _.get(approval, "publish.settings.timezone", tz.guess());
    const publishAtTz = tz(new Date(publishedAt * 1), timezone);
    return publishAtTz.format("MMMM Do, h:mm A z");
  },

  isRetweet: approval => {
    const source = _.get(approval, "source");
    const content = _.get(approval, "content");
    return (
      source === "twitter" && socialFieldsService.twitter.isRetweet(content)
    );
  },

  postTypes,

  getPostType: approval => {
    const { source } = approval;
    let postType = null;
    postTypes.forEach(pt => {
      if (pt.postTypeId === source) {
        postType = pt;
      }
    });
    return postType;
  },

  charsRemaining: (source, postType, content) => {
    if (source === undefined || postType === null) {
      return null;
    }

    const type = postType.postTypeId;
    const maxLength = postType.postTypeCharLimit;

    if (maxLength === null) {
      return null;
    }
    let text = content;
    let matches = 0;
    if (type === "twitter") {
      //  Removed testing for e-mail addresses - Twitter doesn't
      //  convert e-mail addresses into links.
      //  It was also catching .@username at the beginning of tweets.
      //  var r = /((https?):\/\/|(www\.)|[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/ig;
      const r = /((https?):\/\/|(www\.))\S*[^\s.;,(){}<>"\u201d\u2019]/gi;
      matches = (content.match(r) || []).length;
      text = content.replace(r, "");
    }
    return maxLength - (text.length + matches * 23);
  }
};

export default approvalsService;
