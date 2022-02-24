import React, { Component } from "react";

import PropTypes from "prop-types";

import { View, Icon } from "native-base";

class InsightNetworkIcon extends Component {
  static propTypes = {
    insight: PropTypes.object.isRequired
  };

  getIcon = insight => {
    function sourceIcon(source) {
      switch (source) {
        case "bing":
          return { name: "bing", type: "MaterialCommunityIcons" };
        case "google":
        case "googlecse":
          return { name: "google", type: "MaterialCommunityIcons" };
        case "twitter":
          return { name: "twitter", type: "FontAwesome" };
        default:
          return null;
      }
    }
    function insightSource() {
      return sourceIcon((insight || {}).source);
    }
    function insightAlertSearchSource() {
      return sourceIcon((((insight || {}).alert || {}).search || {}).source);
    }
    function insightFollowersSource() {
      return sourceIcon(((insight || {}).followers || {}).source);
    }
    function insightEngagementSource() {
      return sourceIcon(((insight || {}).engagement || {}).source);
    }
    function insightMilestonesSource() {
      return sourceIcon(((insight || {}).milestones || {}).source);
    }
    function twitter() {
      return { name: "twitter", type: "FontAwesome" };
    }
    function rss() {
      return { name: "rss", type: "FontAwesome" };
    }
    function trending() {
      // ion-fireball, fa-fire
      // return 'fire';
      return { name: "fire", type: "MaterialCommunityIcons" };
    }
    function qnary() {
      return { name: "qnary", type: "FontAwesome" };
    }
    function def() {
      return "";
    }
    const f = {
      //  Initial, client side insights.
      welcome_initial: qnary,
      optimize_initial: def,
      search_initial: def,
      score_initial: qnary,
      curate_initial: qnary,

      //  Optimize insights.
      optimize_results: insightSource,
      optimize_found: def,
      scan_results: def,

      //  Search insights.
      search_found: def,
      search_results: def,
      search_leave_top10: insightAlertSearchSource,
      search_new_top10: insightAlertSearchSource,
      search_reentered_top10: insightAlertSearchSource,
      search_changed: insightAlertSearchSource,
      search_moved: insightAlertSearchSource,
      search_entered_top100: insightSource,

      //  Twitter insights.
      stream_twitter_rule: twitter,
      stream_twitter_activity: twitter,
      stream_twitter_engagement: twitter,
      stream_twitter_tweet: twitter,

      //  News (RSS) insights.
      stream_superfeedr_rule: rss,
      stream_buzzsumo_rule: trending,

      //  Social insights
      social_followers: insightFollowersSource,
      social_milestones_followers: insightMilestonesSource,
      social_engagement_content: insightEngagementSource,
      social_engagement_engagers: insightEngagementSource,
      social_engagement_overall: insightEngagementSource
    };

    const insightType = `${(insight || {}).category}_${(insight || {}).type}`;

    if (insightType && f[insightType]) {
      return f[insightType](insight);
    }
    return null;
  };

  render() {
    const { insight } = this.props;
    const icon = this.getIcon(insight);

    if (icon === null) {
      return null;
    }

    const { type, name } = icon;
    if (name === null || type === null) {
      return null;
    }

    return (
      <View>
        <Icon type={type} name={name} style={{ color: "#0277bd" }} />
      </View>
    );
  }
}

export default InsightNetworkIcon;
