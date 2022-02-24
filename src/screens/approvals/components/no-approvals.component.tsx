import React, { Component } from "react";
import { View, H1, H3, List, ListItem, connectStyle } from "native-base";
import { STYLE_NAME } from "./no-approvals.component.style";

import PropTypes from "prop-types";

import { withLocalization } from "../../../components/hoc";

@withLocalization
class NoApprovals extends Component {
  static propTypes = {
    t: PropTypes.func
  };

  render() {
    const { t, style } = this.props;
    const renderEmptyItem = () => {
      return <ListItem style={style.listItem} />;
    };

    return (
      <View>
        <List style={style.list} dataArray={[{}]} renderRow={renderEmptyItem} />
        <View style={style.noContentContainer}>
          <H1 style={style.title}>{t("CONTENT:NO_CONTENT")}</H1>
          <H3 style={style.description}>{t("CONTENT:CHECK_OUT_FEED")}</H3>
        </View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(NoApprovals);
