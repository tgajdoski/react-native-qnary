import React, { Component } from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import {
  InsightText,
  InsightHeader,
  InsightCategory,
  TwitterProfile,
  InsightLink
} from "../shared";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class SocialEngagementEngagersByEngagement01 extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };
  render() {
    const { insight, profile, t, style } = this.props;

    const { engagement } = insight;
    const engagers = (engagement || {}).engagers || {};

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
            {Object.entries(engagers).map(engager => {
              if (engager[1].displayName === undefined) {
                return null;
              }
              return (
                <View key={`${engager[1].id}`}>
                  <InsightHeader
                    content={t(
                      "INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:ENGAGERS:MOST_ENGAGED",
                      {
                        name: engager[1].displayName
                      }
                    )}
                  />
                </View>
              );
            })}
          </View>

          <View style={style.marginTop10}>
            <InsightText
              text={t(
                "INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:ENGAGERS:TAKE_A_LOOK"
              )}
            />
          </View>

          <View>
            {Object.entries(engagers).map((engager, i) => {
              if (engager[1].displayName === undefined) {
                return null;
              }
              const actor = engager[1];
              return (
                <View key={`${engager[1].id}`}>
                  <InsightLink
                    href={`https://www.twitter.com/${actor.preferredUsername}`}
                  >
                    <TwitterProfile json={{ actor }} />
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

export default connectStyle(STYLE_NAME, {})(
  SocialEngagementEngagersByEngagement01
);
