import React, { Component } from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { localizationHelper } from "../../../services";

@withLocalization
class OptimizeResults extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };

  render() {
    const { insight, profile, t, style } = this.props;

    const renderTabContent = () => {
      return (
        <InsightCategory name={t("INSIGHTS:INSIGHTS:OPTIMIZE:OPTIMIZE")} />
      );
    };

    return (
      <InsightBase
        color="#f1c40f"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
      >
        <View>
          <View>
            <InsightHeader
              content={t("INSIGHTS:INSIGHTS:OPTIMIZE:RESULTS:WE_ANALYZED", {
                profile: t("SOCIAL:NETWORK_PROFILE", {
                  network: localizationHelper.networkName(
                    t,
                    (insight || {}).source
                  )
                })
              })}
            />
          </View>

          <View style={style.marginTop10}>
            <InsightText
              text={t("INSIGHTS:INSIGHTS:OPTIMIZE:RESULTS:YOUR_ADMIN")}
            />
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(OptimizeResults);
