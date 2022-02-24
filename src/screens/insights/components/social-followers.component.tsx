import React, { Component } from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import renderIf from "render-if";
import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class SocialFollowers extends Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    t: PropTypes.func
  };
  render() {
    const { insight, profile, t, style } = this.props;

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
              content={t("INSIGHTS:INSIGHTS:SOCIAL:FOLLOWERS:CONGRATULATIONS")}
            />
          </View>

          <View>
            {renderIf(
              (((insight || {}).followers || {}).add || {}).count === 1
            )(
              <View style={style.marginTop10}>
                <InsightText
                  text={t("INSIGHTS:INSIGHTS:SOCIAL:FOLLOWERS:PICKED_UP:1", {
                    count: (((insight || {}).followers || {}).add || {}).count,
                    network: ((insight || {}).followers || {}).source
                  })}
                />
              </View>
            )}
          </View>
          <View>
            {renderIf(
              (((insight || {}).followers || {}).add || {}).count !== 1
            )(
              <View style={style.marginTop10}>
                <InsightText
                  text={t(
                    "INSIGHTS:INSIGHTS:SOCIAL:FOLLOWERS:PICKED_UP:OTHER",
                    {
                      count: (((insight || {}).followers || {}).add || {})
                        .count,
                      network: ((insight || {}).followers || {}).source
                    }
                  )}
                />
              </View>
            )}
          </View>

          <View>
            <InsightText
              text={t("INSIGHTS:INSIGHTS:SOCIAL:FOLLOWERS:NICE_WORK")}
            />
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SocialFollowers);
