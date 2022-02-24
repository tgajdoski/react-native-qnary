import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";
import { Badge, Text } from "native-base";

import * as PropTypes from "prop-types";

import renderIf from "render-if";

import { isNil } from "lodash";

import apolloClientAccessor from "../../data/apollo-client-accessor";
import getUserPendingApprovalsCountQuery from "../../data/queries/get-pending-approvals-count.query";

interface BadgePendingProps {
  badgeStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

class BadgePending extends React.Component<BadgePendingProps> {
  static propTypes = {
    badgeStyle: PropTypes.object,
    textStyle: PropTypes.object
  };

  querySubscription: any = null;

  state = {
    pendingApprovalsCounter: 0
  };

  componentWillMount = () => {
    if (this.querySubscription !== null) {
      return;
    }
    const query = getUserPendingApprovalsCountQuery;
    const client = apolloClientAccessor.getClient();
    this.querySubscription = client
      .watchQuery({
        query
      })
      .subscribe({
        next: ({ data }) => {
          this.setState({
            pendingApprovalsCounter: data.localState.pendingApprovalsCounter
          });
        }
      });
  };

  componentWillUnmount = () => {
    if (this.querySubscription !== null) {
      this.querySubscription.unsubscribe();
    }
  };

  render() {
    const { badgeStyle, textStyle } = this.props;
    const { pendingApprovalsCounter } = this.state;
    return renderIf(
      !isNil(pendingApprovalsCounter) && pendingApprovalsCounter !== 0
    )(
      <Badge style={badgeStyle}>
        <Text style={textStyle}>{pendingApprovalsCounter}</Text>
      </Badge>
    );
  }
}

export default BadgePending;
