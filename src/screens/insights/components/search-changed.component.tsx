import React, { Component } from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { localizationHelper } from "../../../services";

@withLocalization
class SearchChanged extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };

  render() {
    const { insight, profile, t, style } = this.props;

    const renderTabContent = () => {
      return <InsightCategory name={t("INSIGHTS:INSIGHTS:SEARCH:SEARCH")} />;
    };

    return (
      <InsightBase
        color="#f39c12"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
      >
        <View>
          <View>
            <InsightHeader
              content={t("INSIGHTS:INSIGHTS:SEARCH:CHANGED:TRACKED_LINK", {
                network: localizationHelper.networkName(
                  t,
                  (((insight || {}).alert || {}).search || {}).source
                )
              })}
            />
          </View>

          <View style={style.marginTop5}>
            <InsightText
              text={t("INSIGHTS:INSIGHTS:SEARCH:CHANGED:USED_TO_APPEAR", {
                q: (((insight || {}).alert || {}).search || {}).q
              })}
            />
          </View>

          <View style={style.marginTop10}>
            <InsightText
              href={(((insight || {}).alert || {}).data || {}).link}
              text={((((insight || {}).alert || {}).data || {}).title || {}).r}
            />
            <View style={style.marginTop5}>
              <InsightText
                text={
                  ((((insight || {}).alert || {}).data || {}).description || {})
                    .r}
              />
            </View>
          </View>

          <View style={style.marginTop10}>
            <InsightText
              text={t("INSIGHTS:INSIGHTS:SEARCH:CHANGED:NOW_IT_READS")}
            />
          </View>

          <View style={style.marginTop10}>
            <InsightText
              text={((((insight || {}).alert || {}).data || {}).title || {}).l}
              href={(((insight || {}).alert || {}).data || {}).link}
            />
            <View style={style.marginTop5}>
              <InsightText
                text={
                  ((((insight || {}).alert || {}).data || {}).description || {})
                    .l}
              />
            </View>
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SearchChanged);
