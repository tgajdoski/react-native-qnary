import React, { Component } from "react";
import { Image } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import renderIf from "render-if";
import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import {
  InsightCategory,
  InsightText,
  InsightHtml,
  ShareViaQnaryRow
} from "../shared";

import { thousandSuffixFilter } from "../../../services";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class StreamBuzzsumoRule01 extends Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    connections: PropTypes.array.isRequired,
    t: PropTypes.func
  };
  render() {
    const { insight, profile, connections, t, style } = this.props;

    const getContent = () => {
      if ((((insight || {}).activity || {}).object || {}).name === null) {
        return `${(((insight || {}).activity || {}).object || {}).url}`;
      }
      return `${(((insight || {}).activity || {}).object || {}).name}
      ${(((insight || {}).activity || {}).object || {}).url}`;
    };

    const renderTabContent = () => {
      return (
        <InsightCategory
          name={t("INSIGHTS:INSIGHTS:STREAM:BUZZSUMO:TRENDING")}
        />
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
            {renderIf(
              ((((insight || {}).activity || {}).object || {}).image || {}).href
            )(
              <View>
                <Image
                  style={style.stream_buzzsumo_rule_01.objectImage}
                  resizeMode="contain"
                  source={{
                    uri: (
                      (((insight || {}).activity || {}).object || {}).image ||
                      {}
                    ).href
                  }}
                />
              </View>
            )}
          </View>

          <View style={style.center}>
            <InsightHtml
              html={`<div>
                  <a href=${
                    (((insight || {}).activity || {}).object || {}).url
                  }>${(((insight || {}).activity || {}).object || {}).name}</a>
                  </div>`}
            />
          </View>

          <View style={style.stream_buzzsumo_rule_01.totalShares}>
            <InsightText
              text={t("SOCIAL:SHARE:TOTAL", {
                total: thousandSuffixFilter.format(
                  (
                    (((insight || {}).activity || {}).object || {})
                      .engagement || {}
                  ).shares || 0,
                  1
                )
              })}
            />
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(StreamBuzzsumoRule01);
