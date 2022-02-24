import React, { Component } from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";
import renderIf from "render-if";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { localizationHelper } from "../../../services";

@withLocalization
class SearchReenteredTop10 extends Component {
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
          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
              "1"
          )(
            <InsightHeader
              content={t(
                "INSIGHTS:INSIGHTS:SEARCH:REENTERED_TOP10:CONGRATULATIONS",
                {
                  q: (((insight || {}).alert || {}).search || {}).q
                }
              )}
            />
          )}

          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
              "1"
          )(
            <View style={style.marginTop10}>
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:REENTERED_TOP10:PROMOTE")}
              />
            </View>
          )}

          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value !==
              "1"
          )(
            <InsightHeader
              content={t("INSIGHTS.INSIGHTS.SEARCH.REENTERED_TOP10.REENTERED", {
                rating: t(
                  `SEARCH_RATINGS:${
                    ((((insight || {}).user || {}).tags || {}).rating || {})
                      .value
                  }`
                ),
                q: (((insight || {}).alert || {}).search || {}).q
              })}
            />
          )}

          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value !==
              "1"
          )(
            <View style={style.marginTop10}>
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH.REENTERED_TOP10:MAKE_SURE")}
              />
            </View>
          )}

          <View style={style.rank.rankContainer}>
            <View>
              <View style={style.rank.networkNameContainer}>
                <Text style={style.networkName}>
                  {localizationHelper.networkName(
                    t,
                    (((insight || {}).alert || {}).search || {}).source
                  )}
                </Text>
              </View>
              <View style={style.rank.rankContainerInner}>
                <Text style={style.rank.rank}>
                  {t("INSIGHTS:RANK", {
                    rank: (
                      (((insight || {}).alert || {}).data || {}).position || {}
                    ).r
                  })}
                </Text>
              </View>
            </View>
          </View>

          <View style={style.marginTop10}>
            <InsightText
              href={(((insight || {}).alert || {}).data || {}).link}
              text={((((insight || {}).alert || {}).data || {}).title || {}).r}
            />
            <InsightText
              text={
                ((((insight || {}).alert || {}).data || {}).description || {}).r
              }
            />
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SearchReenteredTop10);
