import React, { Component } from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";
import renderIf from "render-if";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { logger, localizationHelper } from "../../../services";

@withLocalization
class SearchLeaveTop10 extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };

  render() {
    const { insight, profile, t, style } = this.props;

    const { tags } = (insight || {}).user;

    if (tags === null) {
      logger.log("No tags found for insight:", insight);
      return null;
    }

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
          <InsightHeader
            content={t("INSIGHTS:INSIGHTS:SEARCH:LEAVE_TOP10:LOOKS_LIKE", {
              oops: ((((insight || {}).user || {}).tags || {}).rating || {})
                .value,
              rating: t(
                `SEARCH_RATINGS:${
                  ((((insight || {}).user || {}).tags || {}).rating || {}).value
                }`
              ),
              q: (((insight || {}).alert || {}).search || {}).q
            })}
          />

          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value === 1
          )(
            <View style={style.marginTop10}>
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:LEAVE_TOP10:TRY_PROMOTING")}
              />
            </View>
          )}

          {renderIf(
            ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
              -1
          )(
            <View style={style.marginTop10}>
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:LEAVE_TOP10:PAYING_OFF")}
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
                    ).l
                  })}
                </Text>
              </View>
            </View>
          </View>

          <View style={style.marginTop10}>
            <InsightText
              href={(((insight || {}).alert || {}).data || {}).link}
              text={((((insight || {}).alert || {}).data || {}).title || {}).l}
            />
            <View style={style.marginTop10}>
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

export default connectStyle(STYLE_NAME, {})(SearchLeaveTop10);
