import React, { Component } from "react";
import { View, Text, Icon, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";
import renderIf from "render-if";

import InsightBase from "./insight-base.component";
import {
  InsightHeader,
  InsightText,
  InsightNote,
  InsightCategory
} from "../shared";
import { withLocalization } from "../../../components/hoc";
import helpers from "../shared/helpers";

@withLocalization
class SearchResults extends Component {
  static propTypes = {
    t: PropTypes.func,
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  render() {
    const { insight, profile, t, style } = this.props;
    const { keysCount } = helpers;

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
        {renderIf((insight || {}).total !== keysCount((insight || {}).results))(
          <View>
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:SEARCH:INITIAL:SCANNING", {
                  q: (insight || {}).q
                })}
              />
            </View>
            <View style={style.marginTop10}>
              <InsightText
                text={t("INSIGHTS:INSIGHTS:SEARCH:INITIAL:SIT_TIGHT")}
              />
            </View>
          </View>
        )}

        {renderIf((insight || {}).total === keysCount((insight || {}).results))(
          <View>
            <View>
              <View>
                <InsightHeader
                  content={t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:WE_FOUND", {
                    q: (insight || {}).q
                  })}
                />
              </View>
              <View style={style.marginTop10}>
                <InsightText
                  text={t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:REVIEW_RATE")}
                />
              </View>
            </View>
            <View>
              <View>
                <Icon type="FontAwesome" name="search" />
                <Text>{t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:REVIEW")}</Text>
              </View>
              <View>
                <Icon type="FontAwesome" name="thumbs-up" />
                <Text>{t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:RATE")}</Text>
              </View>
              <View>
                <Icon type="FontAwesome" name="envelope" />
                <Text>{t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:RECEIVE")}</Text>
              </View>
            </View>
            {renderIf((insight || {}).q === (profile || {}).name)(
              <InsightNote
                note={t("INSIGHTS:INSIGHTS:SEARCH:RESULTS:WE_USED")}
              />
            )}
          </View>
        )}
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SearchResults);
