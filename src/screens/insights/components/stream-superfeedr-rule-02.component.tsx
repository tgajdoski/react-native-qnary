import React, { Component } from "react";
import { Image } from "react-native";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import renderIf from "render-if";
import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import {
  InsightHeader,
  InsightCategory,
  ShareViaQnaryRow,
  InsightHtml
} from "../shared";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class StreamSuperfeedrRule02 extends Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    connections: PropTypes.array.isRequired,
    t: PropTypes.func
  };

  render() {
    const { insight, profile, connections, t, style } = this.props;

    const renderTitle = () => {
      const { title } = ((insight || {}).activity || {}).target;
      const targetTitle = title || "";
      if ((((insight || {}).activity || {}).actor || {}).displayName) {
        return (
          <View>
            <Text style={style.text}>
              {targetTitle}{" "}
              {t("INSIGHTS:INSIGHTS:STREAM:SUPERFEEDR:RULE:BYLINE", {
                name: (((insight || {}).activity || {}).actor || {}).displayName
              })}
            </Text>
          </View>
        );
      }
      return (
        <View>
          <Text style={style.text}>{targetTitle}</Text>
        </View>
      );
    };

    const getContent = () => {
      if ((((insight || {}).activity || {}).object || {}).name === null) {
        return `${
          (((insight || {}).activity || {}).object || {}).permalinkUrl
        }`;
      }
      return `${(((insight || {}).activity || {}).object || {}).name} ${
        (((insight || {}).activity || {}).object || {}).permalinkUrl
      }`;
    };

    const renderTabContent = () => {
      return (
        <InsightCategory name={t("INSIGHTS:INSIGHTS:STREAM:SUPERFEEDR:NEWS")} />
      );
    };

    const renderActions = () => {
      return (
        <View>
          <ShareViaQnaryRow
            insight={insight}
            connections={connections}
            content={getContent()}
          />
        </View>
      );
    };

    return (
      <InsightBase
        color="#16a085"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
        actions={renderActions}
      >
        <View>
          <View>
            {renderIf((((insight || {}).activity || {}).object || {}).title)(
              <InsightHeader
                content={(((insight || {}).activity || {}).object || {}).title}
                href={
                  (((insight || {}).activity || {}).object || {}).permalinkUrl}
              />
            )}
          </View>

          <View style={style.marginTop10}>{renderTitle()}</View>

          <View>
            {renderIf(
              (
                (
                  (((insight || {}).activity || {}).object || {})
                    .standardLinks || {}
                ).thumbnail || {}
              ).length
            )(
              <View style={style.marginTop10}>
                <Image
                  style={style.stream_superfeedr_rule_02.standardLinkThumbnail}
                  source={{
                    uri: (
                      (
                        (((insight || {}).activity || {}).object || {})
                          .standardLinks || {}
                      ).thumbnail[0] || {}
                    ).href
                  }}
                />
              </View>
            )}

            <View style={style.marginTop10}>
              <InsightHtml
                tagsStyles={{
                  div: {},
                  a: {
                    color: "#434343",
                    fontSize: 15,
                    lineHeight: 20,
                    textDecorationLine: "none"
                  }
                }}
                html={`<div><a href=${
                  (((insight || {}).activity || {}).object || {}).permalinkUrl
                }>${
                  (((insight || {}).activity || {}).object || {}).summaryText
                }</a></div>`}
              />
            </View>
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(StreamSuperfeedrRule02);
