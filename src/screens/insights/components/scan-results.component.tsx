import React, { Component } from "react";
import { View, Text, Button, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import renderIf from "render-if";

import PropTypes from "prop-types";

import InsightBase from "./insight-base.component";
import { InsightHeader, InsightCategory, InsightText } from "../shared";
import { navigationService } from "../../../services";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class ScanResults extends Component {
  static propTypes = {
    insight: PropTypes.object,
    profile: PropTypes.object,
    t: PropTypes.func
  };

  navigateTo = (screen: string) => {
    navigationService.navigate(screen, {});
  };

  render() {
    const { insight, profile, t, style } = this.props;
    const status = parseInt(((insight || {}).data || {}).status, 10); // eslint-disable-line

    const renderTabContent = () => {
      return (
        <InsightCategory name={t("INSIGHTS:INSIGHTS:OPTIMIZE:OPTIMIZE")} />
      );
    };

    const renderActions = () => {
      return (
        <View>
          <Button
            success={true}
            small={true}
            onPress={this.navigateTo.bind(this, "DigitalFootprintScreen")}
          >
            <Text>{t("INSIGHTS:REVIEW_NOW")}</Text>
          </Button>
        </View>
      );
    };
    return (
      <InsightBase
        color="#f1c40f"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
        actions={renderActions}
      >
        <View>
          {renderIf(status === 200)(
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:SCAN:RESULTS:WE_FOUND")}
              />
              <View style={style.marginTop10}>
                <InsightText
                  text={t("INSIGHTS:INSIGHTS:SCAN:RESULTS:REVIEW")}
                />
              </View>

              <View style={style.marginTop5}>
                <Text style={style.italicText}>
                  {t("INSIGHTS:INSIGHTS:SCAN:RESULTS:CONNECT")}
                </Text>
              </View>
            </View>
          )}
          {renderIf(status !== 200)(
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:SCAN:RESULTS:HRMPH")}
              />
              <View style={style.marginTop10}>
                <InsightText
                  text={t("INSIGHTS:INSIGHTS:SCAN:RESULTS:THATS_OKAY")}
                />
              </View>
            </View>
          )}
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ScanResults);
