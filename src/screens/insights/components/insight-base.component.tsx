import React from "react";
import {
  View,
  Text,
  Card,
  CardItem,
  Item,
  Left,
  Right,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./insight-base.component.style";

import PropTypes from "prop-types";

import Moment from "react-moment";
import "moment-timezone";

import InsightNetworkIcon from "../shared/insight-network-icon.component";
import { StyleSheet } from "react-native";

interface InsightBaseProps {
  insight: any;
  profile: any;
  color: string;
  tab: () => JSX.Element;
  children: Element[];
  actions: () => JSX.Element;
}

class InsightBase extends React.Component<InsightBaseProps> {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    tab: PropTypes.func,
    children: PropTypes.node,
    actions: PropTypes.func
  };
  render() {
    const {
      color,
      insight,
      profile,
      tab,
      children,
      actions,
      style
    } = this.props;

    const createdAt =
      profile.created_at !== undefined
        ? new Date((profile || {}).created_at * 1)
        : new Date((insight || {}).created_at * 1);

    return (
      <Card noShadow={true} style={style.card}>
        <CardItem
          style={StyleSheet.flatten([style.header, { borderLeftColor: color }])}
        >
          <Item style={style.header_item}>
            <Left style={style.header_left}>
              <View style={style.header_left1}>
                <View style={style.full}>{tab !== null ? tab() : null}</View>
                <View style={style.full}>
                  <Text style={style.created_at}>
                    <Moment
                      style={style.created_at}
                      element={Text}
                      from={createdAt}
                      ago={true}
                    />
                    {" ago"}
                  </Text>
                </View>
              </View>
            </Left>
            <Right style={style.header_right}>
              <InsightNetworkIcon insight={insight} />
            </Right>
          </Item>
        </CardItem>
        <CardItem>
          <View
            style={StyleSheet.flatten([
              style.bodyInnerContiner,
              {
                borderBottomWidth: actions !== undefined ? 0.7 : 0
              }
            ])}
          >
            {children}
            {/* <Text>{insight.__typename}</Text>
            <Text>
          search_results
          {JSON.stringify(insight)}</Text> */}
          </View>
        </CardItem>
        {actions !== undefined ? (
          <CardItem footer={true} style={style.footer}>
            {actions()}
          </CardItem>
        ) : null}
      </Card>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(InsightBase);
