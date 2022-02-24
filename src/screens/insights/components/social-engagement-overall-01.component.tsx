import React, { Component } from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import renderIf from "render-if";

import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import { InsightText, InsightCategory, InsightHeader } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { localizationHelper } from "../../../services";

@withLocalization
class SocialEngagementOverall01 extends Component {
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
            {renderIf(
              (((insight || {}).engagement || {}).analytics || {})
                .percent_change <= 0
            )(
              <InsightHeader
                content={t(
                  "INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:OVERALL:SLIPPED",
                  {
                    network: localizationHelper.networkName(
                      t,
                      ((insight || {}).engagement || {}).source
                    )
                  }
                )}
              />
            )}
          </View>

          <View>
            {renderIf(
              (((insight || {}).engagement || {}).analytics || {})
                .percent_change > 0
            )(
              <InsightHeader
                content={t(
                  "INSIGHTS:INSIGHTS:SOCIAL.ENGAGEMENT:OVERALL:GREAT_WEEK",
                  {
                    network: ((insight || {}).engagement || {}).source
                  }
                )}
              />
            )}
          </View>

          <View>
            {renderIf(
              (((insight || {}).engagement || {}).analytics || {})
                .percent_change <= 0
            )(
              <View style={style.marginTop10}>
                <InsightText
                  text={t("INSIGHTS:INSIGHTS:SOCIAL:ENGAGEMENT:OVERALL:DROP")}
                />
              </View>
            )}
          </View>

          <View>
            {renderIf(
              (((insight || {}).engagement || {}).analytics || {})
                .percent_change > 0
            )(
              <View style={style.marginTop10}>
                <InsightText
                  text={t(
                    "INSIGHTS:INSIGHTS:SOCIAL.ENGAGEMENT:OVERALL:IMPROVEMENT"
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SocialEngagementOverall01);
