import React, { Component } from "react";
import {
  View,
  Item,
  ListItem,
  Left,
  Right,
  Card,
  CardItem,
  connectStyle
} from "native-base";

import { STYLE_NAME } from "./list-item.component.style";

import PropTypes from "prop-types";

import ListItemHeader from "./list-item-header.component";
import ListItemContentViewer from "./list-item-content-viewer.component";
import ListItemFooter from "./list-item-footer.component";
import ListItemActions from "./list-item-actions.component";
import { ImageButton } from "../../../components/app";

interface ApprovalListItemProps {
  mode: string;
  approval: any;
  currentUser: any;
  currentStatuses: any[];
  onActionCallback: (name: string, approval: any, params?: any) => void;
}

class ApprovalListItem extends Component<ApprovalListItemProps> {
  static propTypes = {
    t: PropTypes.func,
    approval: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    currentStatuses: PropTypes.array.isRequired,
    onActionCallback: PropTypes.func
  };

  constructor(props: ApprovalListItemProps) {
    super(props);
    this.state = {
      showActions: false
    };
  }

  showActions = () => {
    const { showActions } = this.state;
    this.setState({
      showActions: !showActions
    });
  };

  onActionCallbackIntl = (name: string, approval: any, params?: any) => {
    const { onActionCallback } = this.props;
    if (onActionCallback !== undefined) {
      onActionCallback(name, approval, params);
    }
    this.setState({ showActions: false });
  };

  render() {
    const { showActions } = this.state;
    const { approval, currentStatuses, currentUser, style } = this.props;

    let { account_type: accountType } = currentUser;
    accountType = accountType || "managed";

    const getHeaderLeftBorderColor = () => {
      switch (approval.source) {
        case "facebook":
          return "#3B5999";
        case "linkedin":
          return "#1997EC";
        case "twitter":
          return "#1997EC";
        case "instagram":
          return "#E4405F";
        default:
          return "#1997EC";
      }
    };

    const cardHeaderStyle = { ...style.cardHeader };
    cardHeaderStyle.borderLeftColor = getHeaderLeftBorderColor();

    const renderFooter = () => {
      return (
        <Item style={style.footer_item}>
          <Left style={style.footer_left}>
            {showActions ? (
              <ListItemActions
                approval={approval}
                onActionCallback={this.onActionCallbackIntl}
              />
            ) : (
              <ListItemFooter
                approval={approval}
                currentStatuses={currentStatuses}
                accountType={accountType}
              />
            )}
          </Left>
          <Right style={style.footer_right}>
            <ImageButton
              onPress={this.showActions}
              image={
                showActions
                  ? require("../../../../assets/icons/more-button-active.png")
                  : require("../../../../assets/icons/more-button.png")
              }
              width={37}
              height={37}
            />
          </Right>
        </Item>
      );
    };

    return (
      <ListItem style={style.listItem}>
        <Card noShadow={true} style={style.card}>
          <CardItem style={cardHeaderStyle}>
            <ListItemHeader approval={approval} currentUser={currentUser} />
          </CardItem>

          <CardItem cardBody={true} style={style.cardBody}>
            <View style={style.cardBodyContent}>
              <ListItemContentViewer approval={approval} />
            </View>
          </CardItem>

          <CardItem style={style.cardFooter}>
            <View style={style.cardFooterContent}>{renderFooter()}</View>
          </CardItem>
        </Card>
      </ListItem>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ApprovalListItem);
