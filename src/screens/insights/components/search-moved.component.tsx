import React, { Component } from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";
import renderIf from "render-if";

import InsightBase from "./insight-base.component";
import { InsightCategory, InsightText, InsightHtml } from "../shared";
import { withLocalization } from "../../../components/hoc";
import { localizationHelper } from "../../../services";

@withLocalization
class SearchMoved extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };

  render() {
    const { insight, profile, t, style } = this.props;

    const header1 = () => {
      if (
        ((((insight || {}).user || {}).tags || {}).rating || {}).value === "1"
      ) {
        if (
          ((((insight || {}).alert || {}).data || {}).position || {}).r -
            ((((insight || {}).alert || {}).data || {}).position || {}).l >
          0
        ) {
          return t("INSIGHTS:INSIGHTS:SEARCH:MOVED:PRE:UPWARD");
        }
        return t("INSIGHTS:INSIGHTS:SEARCH:MOVED:PRE:YIKES");
      }

      if (
        ((((insight || {}).user || {}).tags || {}).rating || {}).value === "-1"
      ) {
        if (
          ((((insight || {}).alert || {}).data || {}).position || {}).r -
            ((((insight || {}).alert || {}).data || {}).position || {}).l <
          0
        ) {
          return t("INSIGHTS:INSIGHTS:SEARCH:MOVED:PRE:BAM");
        }
        return t("INSIGHTS:INSIGHTS:SEARCH:MOVED:PRE:YIKES");
      }

      return null;
    };

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
            <InsightHtml
              tagsStyles={{
                span: {
                  color: "#0277bd"
                }
              }}
              html={`<span>${header1()}${t(
                "INSIGHTS:INSIGHTS:SEARCH:MOVED:MOVED",
                {
                  rating: t(
                    `SEARCH_RATINGS:${
                      ((((insight || {}).user || {}).tags || {}).rating || {})
                        .value
                    }`
                  ),
                  direction:
                    ((((insight || {}).alert || {}).data || {}).position || {})
                      .r -
                    ((((insight || {}).alert || {}).data || {}).position || {})
                      .l,
                  positions:
                    ((((insight || {}).alert || {}).data || {}).position || {})
                      .r -
                      (
                        (((insight || {}).alert || {}).data || {}).position ||
                        {}
                      ).l >=
                    0
                      ? (
                          (((insight || {}).alert || {}).data || {}).position ||
                          {}
                        ).r -
                        (
                          (((insight || {}).alert || {}).data || {}).position ||
                          {}
                        ).l
                      : (
                          (((insight || {}).alert || {}).data || {}).position ||
                          {}
                        ).l -
                        (
                          (((insight || {}).alert || {}).data || {}).position ||
                          {}
                        ).r,
                  q: (((insight || {}).alert || {}).search || {}).q
                }
              )}</span>`}
            />
          </View>

          <View style={style.marginTop10}>
            {/* //  Display if link is POSITIVE and moved DOWN. */}
            {renderIf(
              ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
                "1" &&
                ((((insight || {}).alert || {}).data || {}).position || {}).r -
                  ((((insight || {}).alert || {}).data || {}).position || {})
                    .l <
                  0
            )(
              <InsightText text={t("INSIGHTS:INSIGHTS:SEARCH:MOVED:PROMOTE")} />
            )}

            {renderIf(
              ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
                "1" &&
                ((((insight || {}).alert || {}).data || {}).position || {}).r -
                  ((((insight || {}).alert || {}).data || {}).position || {})
                    .l <
                  0
            )(
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:MOVED:GET_NEW_CONTENT")}
              />
            )}
          </View>

          <View>
            {/* //  Display if link is POSITIVE and moved UP. */}
            {renderIf(
              ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
                "1" &&
                ((((insight || {}).alert || {}).data || {}).position || {}).r -
                  ((((insight || {}).alert || {}).data || {}).position || {})
                    .l >
                  0
            )(<InsightText text={t("INSIGHTS:INSIGHTS:SEARCH:MOVED:GREAT")} />)}
          </View>

          <View>
            {/* //  Display if link is NEGATIVE and moved UP. */}
            {renderIf(
              ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
                "-1" &&
                ((((insight || {}).alert || {}).data || {}).position || {}).r -
                  ((((insight || {}).alert || {}).data || {}).position || {})
                    .l >
                  0
            )(
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:MOVED:THATS_OKAY")}
              />
            )}
          </View>

          <View>
            {/* //  Display if link is NEGATIVE and moved DOWN. */}
            {renderIf(
              ((((insight || {}).user || {}).tags || {}).rating || {}).value ===
                "-1" &&
                ((((insight || {}).alert || {}).data || {}).position || {}).r -
                  ((((insight || {}).alert || {}).data || {}).position || {})
                    .l <
                  0
            )(
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:MOVED:GOOD_NEWS")}
              />
            )}
          </View>

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
              text={
                ((((insight || {}).alert || {}).data || {}).title || {}).l ||
                (((insight || {}).alert || {}).data || {}).link}
            />

            <View style={style.marginTop10}>
              <InsightText
                text={
                  ((((insight || {}).alert || {}).data || {}).description || {})
                    .r}
              />
            </View>
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SearchMoved);
