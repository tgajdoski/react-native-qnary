import React, { Component } from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";
import PropTypes from "prop-types";
import InsightBase from "./insight-base.component";

import {
  InsightHeader,
  InsightCategory,
  TwitterProfile,
  InsightLink
} from "../shared";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class SocialEngagementContent01 extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };
  render() {
    const { insight, profile, t, style } = this.props;

    const { content } = (insight || {}).engagement;

    const renderTabContent = () => {
      return (
        <InsightCategory
          name={t("INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:ENGAGEMENT")}
        />
      );
    };

    return (
      <InsightBase
        color="#c0392b"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
      >
        <View>
          <View>
            <InsightHeader
              content={t(
                "INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:CONTENT:MOST_ENGAGING"
              )}
            />
          </View>
          <View>
            {Object.entries(content).map(c => {
              const tweet = c[1];
              if (tweet.actor === undefined) {
                return null;
              }
              return (
                <View key={`${tweet.id}`}>
                  <InsightLink href={tweet.link}>
                    <TwitterProfile json={tweet} />
                  </InsightLink>
                  <View style={style.marginTop10} />
                </View>
              );
            })}
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SocialEngagementContent01);
