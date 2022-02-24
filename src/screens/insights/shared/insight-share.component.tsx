import React from "react";
import { View, Text, Linking, Clipboard } from "react-native";

import { ActionSheet, Icon, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-share.component.style";

import PropTypes from "prop-types";

import { notificationService, navigationService } from "../../../services";
import withLocalization from "../../../components/hoc/with-localization.hoc";

import helpers from "./helpers";

@withLocalization
class InsightShare extends React.Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    t: PropTypes.func
  };
  actionSheetClose = null;

  getUrl = () => {
    const { insight } = this.props;

    if (insight.type === "twitter_rule") {
      return insight.record.kinesis.json.link;
    }
    if (insight.category === "search") {
      return insight.alert.data.link;
    }

    const categoryTypeVersion = `${insight.category}_${insight.type}_${
      insight.version
    }`;

    if (categoryTypeVersion === "stream_superfeedr_rule_02") {
      return insight.activity.object.permalinkUrl;
    }
    if (categoryTypeVersion === "stream_superfeedr_rule_01") {
      return insight.record.body.items[0].permalinkUrl;
    }
    if (categoryTypeVersion === "stream_buzzsumo_rule_01") {
      return insight.activity.object.url;
    }

    return "";
  };

  getTwitterHeader = (insight, cat, profile) => {
    const { t } = this.props;
    const twitterHeader = {
      retweet() {
        const entityName = helpers.getTwitterEntityName(
          insight.subscription.insight.category_value || insight.rule.value,
          insight.record.kinesis.json.twitter_entities.user_mentions
        );
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.RETWEET", {
          actor: insight.record.kinesis.json.actor.displayName,
          user: entityName
        });
      },
      mention() {
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.MENTION", {
          actor: insight.record.kinesis.json.actor.displayName,
          mention: insight.subscription.insight.category_value
        });
      },
      from() {
        if (insight.record.kinesis.json.verb === "shausere") {
          return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.FROM_SHARE", {
            actor: insight.record.kinesis.json.actor.displayName
          });
        }
        if (insight.record.kinesis.json.verb === "post") {
          return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.FROM", {
            actor: insight.record.kinesis.json.actor.displayName
          });
        }
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.FROM", {
          actor: insight.record.kinesis.json.actor.displayName
        });
      },
      link() {
        let s = t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.LINK", {
          actor: insight.record.kinesis.json.actor.displayName,
          mention: profile.name
        });
        for (
          let i = 0, l = insight.record.kinesis.json.gnip.urls.length;
          i < l;
          i += 1
        ) {
          s += `\n${insight.record.kinesis.json.gnip.urls[i].url.expanded_url}`;
        }
        return s;
      },
      owned_link() {
        let s = t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.LINK", {
          actor: insight.record.kinesis.json.actor.displayName,
          mention: profile.name
        });
        for (
          let i = 0, l = insight.record.kinesis.json.gnip.urls.length;
          i < l;
          i += 1
        ) {
          s += `\n${insight.record.kinesis.json.gnip.urls[i].url.expanded_url}`;
        }
        return s;
      },
      to() {
        const entityName = helpers.getTwitterEntityName(
          insight.subscription.insight.category_value || insight.rule.value,
          insight.record.kinesis.json.twitter_entities.user_mentions
        );
        if (((insight.record.kinesis.json || {}).inReplyTo || {}).link) {
          return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.REPLIED_TO", {
            actor: insight.record.kinesis.json.actor.displayName,
            user: entityName
          });
        }
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.TO", {
          actor: insight.record.kinesis.json.actor.displayName,
          user:
            insight.record.kinesis.json.actor.displayName !== entityName
              ? ` to ${entityName}.`
              : ""
        });
      },
      hashtag() {
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.ABOUT", {
          actor: insight.record.kinesis.json.actor.displayName,
          about: helpers.getIncludeOrHashtag(
            insight.subscription.insight.category_value
          )
        });
      },
      include() {
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.INCLUDE", {
          actor: insight.record.kinesis.json.actor.displayName,
          about: helpers.getIncludeOrHashtag(
            insight.subscription.insight.category_value
          )
        });
      },
      default() {
        return t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE.DEFAULT");
      }
    };

    return (twitterHeader[cat] || twitterHeader.default)();
  };

  getTwitterText = (insight, profile) => {
    let tweetText = "";
    const insightCategory =
      insight.subscription.insight.category ||
      insight.subscription.insight.label;
    const twitterHeader = this.getTwitterHeader(
      insight,
      insightCategory,
      profile
    );
    tweetText += `${twitterHeader}\n@${
      insight.record.kinesis.json.actor.preferredUsername
    }\n`;
    tweetText += insight.record.kinesis.json.body;
    return tweetText;
  };

  getNewsText = insight => {
    let newsText = `${insight.activity.object.title}\n`;
    newsText += insight.activity.target.title;
    if (insight.activity.actor.displayName) {
      newsText += ` - ${insight.activity.actor.displayName}`;
    }
    newsText += `\n${insight.activity.object.summaryText}`;
    return newsText;
  };

  messageAdmin = () => {
    const { insight } = this.props;

    const messageToAdmin = { message: "", insight };

    if (insight) {
      if (insight.type === "twitter_rule") {
        messageToAdmin.message = this.getTwitterText(insight);
      }
      if (insight.type === "superfeedr_rule") {
        messageToAdmin.message = this.getNewsText(insight);
      }
    }

    navigationService.navigate("ContactAdminScreen", {
      message: messageToAdmin.message,
      messageFrom: "FeedScreen"
    });
  };

  retweet = () => {
    const { insight } = this.props;
    const { id } = insight.record.kinesis.json;
    const url = `https://twitter.com/intent/retweet?tweet_id=${id.substring(
      id.lastIndexOf(":") + 1
    )}`;
    Linking.openURL(url);
  };

  tweetUrl = () => {
    const { insight } = this.props;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      this.getUrl(insight)
    )}`;
    Linking.openURL(url);
  };

  copyUrl = async () => {
    const { insight, t } = this.props;
    await Clipboard.setString(this.getUrl(insight));
    notificationService.showInfo(null, t("INSIGHTS:SHARE:URL_COPIED"));
  };

  twitterActionSheetClick = buttonIndex => {
    setTimeout(() => {
      const shareButtonActions = [
        this.messageAdmin,
        this.retweet,
        this.copyUrl
      ];
      shareButtonActions[buttonIndex]();
    });
  };

  newsActionSheetClick = buttonIndex => {
    setTimeout(() => {
      const shareButtonActions = [
        this.messageAdmin,
        this.tweetUrl,
        this.copyUrl
      ];
      shareButtonActions[buttonIndex]();
    });
  };

  openShare = insight => {
    const { t } = this.props;

    //  Grab the translations needed for the action sheet.
    const translationKeys = [
      "INSIGHTS:SHARE:MESSAGE_ADMIN",
      "INSIGHTS:SHARE:RETWEET",
      "INSIGHTS:SHARE:TWEET_THIS",
      "INSIGHTS:SHARE:COPY_URL",
      "INSIGHTS:SHARE:WHAT_DO",
      "GENERIC:CANCEL_BUTTON"
    ];

    const translations = [];
    translationKeys.map(key => {
      translations[key] = t(key);
      return key;
    });

    // console.log('Running openshare, insight:', insight);

    const shareButtonLabelsTwitter = [
      translations["INSIGHTS:SHARE:MESSAGE_ADMIN"],
      translations["INSIGHTS:SHARE:RETWEET"],
      translations["INSIGHTS:SHARE:COPY_URL"]
    ];

    const shareButtonLabelsSuperfeedr = [
      translations["INSIGHTS:SHARE:MESSAGE_ADMIN"],
      translations["INSIGHTS:SHARE:TWEET_THIS"],
      translations["INSIGHTS:SHARE:COPY_URL"]
    ];

    const buttons =
      insight.type === "twitter_rule"
        ? shareButtonLabelsTwitter
        : shareButtonLabelsSuperfeedr;
    const CANCEL_INDEX = buttons.length;
    this.actionSheetClose = ActionSheet.show(
      {
        options: [...buttons, translations["GENERIC:CANCEL_BUTTON"]],
        cancelButtonIndex: CANCEL_INDEX,
        title: translations["INSIGHTS:SHARE:WHAT_DO"]
      },
      buttonIndex => {
        if (buttonIndex === CANCEL_INDEX) {
          return false;
        }
        return insight.type === "twitter_rule"
          ? this.twitterActionSheetClick(buttonIndex)
          : this.newsActionSheetClick(buttonIndex);
      }
    );
  };

  render() {
    const { insight, t, style } = this.props;
    return (
      <View style={style.container}>
        <Text style={style.text} onPress={this.openShare.bind(this, insight)}>
          <Icon type="FontAwesome" name="share" style={style.icon} />
          {` ${t("INSIGHTS:SHARE:SHARE")}`}
        </Text>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(InsightShare);
