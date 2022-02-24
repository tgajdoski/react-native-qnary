import React, { Component } from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./list-item-footer.component.style";

import Moment from "react-moment";
import "moment-timezone";

import { approvalsService } from "../../../services";
import { withLocalization } from "../../../components/hoc";
import * as PropTypes from "prop-types";

interface ListItemFooterProps {
  approval: any;
}

@withLocalization
class ListItemFooter extends Component<ListItemFooterProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired
  };

  render() {
    const { t, style, currentStatuses, accountType, approval } = this.props;

    if (currentStatuses.indexOf("sent") !== -1) {
      const { updated_at, created_at } = approval; // eslint-disable-line
      const timestamp = updated_at || created_at; // eslint-disable-line
      const fromDate = new Date(timestamp * 1);
      return (
        <View style={style.container}>
          <Text style={style.text}>
            {`${t("CONTENT:SENT")} : `}
            <Moment
              style={style.text}
              element={Text}
              from={fromDate}
              ago={true}
            />
            {" ago"}
          </Text>
        </View>
      );
    }

    const isPublished =
      accountType === "managed" && approvalsService.isPublished(approval);

    if (!isPublished) {
      return null;
    }

    return (
      <Text style={style.text}>
        {`${t("CONTENT:PUBLISHED")}: ${approvalsService.getPublishedAtDate(
          approval
        )}`}
      </Text>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ListItemFooter);
