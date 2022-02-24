import React, { Component } from "react";
import { RefreshControl } from "react-native";
import { View, List, Content } from "native-base";

import PropTypes from "prop-types";
import ApprovalListItem from "./list-item.component";
import NoApprovals from "./no-approvals.component";

import renderIf from "render-if";
import { Loading } from "../../../components/app";

interface ApprovalsListProps {
  approvals: any[];
  currentUser: any;
  currentStatuses: any[];
  onRefresh: () => void;
  showLoadingIndicator: boolean;
  onActionCallback: (name: string, approval: any, params?: any) => void;
}
class ApprovalsList extends Component<ApprovalsListProps> {
  static propTypes = {
    approvals: PropTypes.array,
    currentUser: PropTypes.object.isRequired,
    currentStatuses: PropTypes.array,
    onRefresh: PropTypes.func,
    showLoadingIndicator: PropTypes.bool,
    onActionCallback: PropTypes.func
  };

  state = {
    refreshing: false
  };

  refreshList = () => {
    const { onRefresh } = this.props;
    if (onRefresh != undefined) {
      this.setState({ refreshing: true });
      onRefresh();
      this.setState({ refreshing: false });
    }
  };

  render() {
    const {
      approvals,
      currentUser,
      currentStatuses,
      showLoadingIndicator,
      onActionCallback
    } = this.props;

    const { refreshing } = this.state;

    const noApprovals = approvals.length === 0;

    const renderRefreshControl = () => {
      return (
        <RefreshControl onRefresh={this.refreshList} refreshing={refreshing} />
      );
    };

    if (showLoadingIndicator || false) {
      return <Loading />;
    }

    const renderItem = (approval: any, i: number) => {
      return (
        <ApprovalListItem
          key={i}
          approval={approval}
          currentUser={currentUser}
          currentStatuses={currentStatuses}
          onActionCallback={onActionCallback}
        />
      );
    };

    return (
      <Content refreshControl={renderRefreshControl()}>
        {renderIf(noApprovals)(<NoApprovals />)}
        <List dataArray={approvals} renderRow={renderItem} />
      </Content>
    );
  }
}

export default ApprovalsList;
