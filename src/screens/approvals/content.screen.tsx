import React, { Component } from "react";
import { Text, Tabs, Tab, TabHeading, Body, connectStyle } from "native-base";
import { STYLE_NAME } from "./content.screen.style";

import { NavigationEvents } from "react-navigation";

import * as PropTypes from "prop-types";
import _ from "lodash";
import renderIf from "render-if";

import { Layout, BottomNav } from "../../components/app";
// import BadgePending from "./badge-pending.component";

import ApprovalsList from "./components/approvals-list.component";
import ListItemContentEditor from "./components/list-item-content-editor.component";
import ListItemCommentEditor from "./components/list-item-comment-editor.component";
import ContentScreenHeaderRight from "./content-screen-header-right.component";
import { currentUserAccessor, withLocalization } from "../../components/hoc";

import { approvalsService } from "./services";
import { logger, notificationService, dialogService } from "../../services";

@currentUserAccessor
@withLocalization
class ContentScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };

  static navigationOptions = {
    header: null
  };

  state = {
    activeTabIndex: 0,
    isLoading: false,
    mode: "view",
    approval: null,
    userpendingapprovals: [],
    userapprovedapprovals: [],
    userrejectedapprovals: []
  };

  loadApprovals = async (activeTabIndex: number) => {
    const {
      currentUser: { oid, uid }
    } = this.props;
    this.setState({ isLoading: true, approval_modes: {} });
    try {
      switch (activeTabIndex) {
        case 0:
          const userpendingapprovals = await approvalsService.getPendingApprovals(
            oid,
            uid
          );
          this.setState({ userpendingapprovals });
          break;
        case 1:
          const userapprovedapprovals = await approvalsService.getApprovedApprovals(
            oid,
            uid
          );
          this.setState({ userapprovedapprovals });
          break;
        case 2:
          const userrejectedapprovals = await approvalsService.getRejectedApprovals(
            oid,
            uid
          );
          this.setState({ userrejectedapprovals });
          break;
      }
    } catch (err) {
      logger.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setActiveTabIndex = async ({ i }) => {
    await this.loadApprovals(i);
    this.setState({ activeTabIndex: i });
  };

  onWillFocus = async () => {
    const { activeTabIndex } = this.state;
    await this.loadApprovals(activeTabIndex);
  };

  onRefresh = async () => {
    const { activeTabIndex } = this.state;
    await this.loadApprovals(activeTabIndex);
  };

  onApprovalActionCallback = (name: string, approval: any, params: any) => {
    const {
      t,
      currentUser: { oid, uid }
    } = this.props;
    switch (name) {
      case "approved":
      case "rejected":
        const status = name;
        const subject = t("MESSAGE_ADMIN:MESSAGE_FROM");
        const templateKey =
          status === "approved"
            ? "CONTENT:SCHEDULED_FOR_PUBLISH"
            : "CONTENT:ADMIN_NOTIFIED";

        const confirmPopup = dialogService.confirm({
          title: t(`CONTENT:STATUS.${status.toUpperCase()}`).toUpperCase(),
          template: t(templateKey),
          okText: t("GENERIC:OKAY_BUTTON"),
          cancelText: t("GENERIC:UNDO")
        });

        confirmPopup.then(
          () => {
            approvalsService
              .markApprovalAs(approval.id, status, oid, uid, subject)
              .then(
                () => {
                  this.onRefresh().then(() => {
                    this.updateMode(approval, "view");
                  });
                },
                () => {
                  notificationService.showError(
                    t("GENERIC:ERROR"),
                    t("ERRORS:DEFAULT")
                  );
                }
              );
          },
          (err: any) => {
            // confirm poup undo
            logger.log(err);
          }
        );
        break;
      case "editing_started":
        this.updateMode(approval, "edit");
        break;
      case "editing_finished":
        approvalsService.updateContent(approval.id, params.content).then(
          () => {
            this.onRefresh().then(() => {
              this.updateMode(approval, "view");
            });
          },
          () => {
            notificationService.showError(
              t("GENERIC:ERROR"),
              t("ERRORS:DEFAULT")
            );
          }
        );
        break;
      case "commenting_started":
        this.updateMode(approval, "comment");
        break;
      case "commenting_finished":
        approvalsService.updateComment(approval.id, params.comment).then(
          () => {
            this.onRefresh().then(() => {
              this.updateMode(approval, "view");
            });
          },
          () => {
            notificationService.showError(
              t("GENERIC:ERROR"),
              t("ERRORS:DEFAULT")
            );
          }
        );
        break;
      case "cancel":
        this.updateMode(approval, "view");
        break;
    }
  };

  updateMode = (approval: any, mode: string) => {
    this.setState({ approval, mode });
  };

  render() {
    const { t, style, currentUser } = this.props;
    const {
      mode,
      approval,
      userpendingapprovals,
      userapprovedapprovals,
      userrejectedapprovals,
      activeTabIndex,
      isLoading
    } = this.state;

    const renderHeaderRight = () => {
      if (activeTabIndex !== 0 || userpendingapprovals.length === 0) {
        return null;
      }
      return (
        <ContentScreenHeaderRight
          currentUser={currentUser}
          approvals={userpendingapprovals}
          onRefresh={this.onRefresh}
        />
      );
    };

    return (
      <Layout
        hasTabs={true}
        title={t("CONTENT:MY_CONTENT")}
        headerRight={renderHeaderRight}
      >
        <NavigationEvents onWillFocus={this.onWillFocus} />

        {renderIf(mode === "view")(
          <Tabs onChangeTab={this.setActiveTabIndex} locked={true}>
            <Tab
              tabStyle={style.tab}
              heading={
                <TabHeading
                  style={
                    activeTabIndex === 0 ? style.activeTabStyle : style.tabStyle
                  }
                >
                  <Text style={style.tabLabel}>
                    {t("CONTENT:STATUS:PENDING")}
                  </Text>
                </TabHeading>
              }
            >
              <ApprovalsList
                approvals={userpendingapprovals}
                currentUser={currentUser}
                currentStatuses={["sent"]}
                onRefresh={this.onRefresh}
                showLoadingIndicator={isLoading}
                onActionCallback={this.onApprovalActionCallback}
              />
            </Tab>
            <Tab
              tabStyle={style.tab}
              heading={
                <TabHeading
                  style={
                    activeTabIndex === 1 ? style.activeTabStyle : style.tabStyle
                  }
                >
                  <Text style={style.tabLabel}>
                    {t("CONTENT:STATUS:APPROVED")}
                  </Text>
                </TabHeading>
              }
            >
              <ApprovalsList
                approvals={userapprovedapprovals}
                currentUser={currentUser}
                currentStatuses={["approved"]}
                onRefresh={this.onRefresh}
                showLoadingIndicator={isLoading}
                onActionCallback={this.onApprovalActionCallback}
              />
            </Tab>
            <Tab
              tabStyle={style.tab}
              heading={
                <TabHeading
                  style={
                    activeTabIndex === 2 ? style.activeTabStyle : style.tabStyle
                  }
                >
                  <Text style={style.tabLabel}>
                    {t("CONTENT:STATUS:REJECTED")}
                  </Text>
                </TabHeading>
              }
            >
              <ApprovalsList
                approvals={userrejectedapprovals}
                currentUser={currentUser}
                currentStatuses={["deleted"]}
                onRefresh={this.onRefresh}
                showLoadingIndicator={isLoading}
                onActionCallback={this.onApprovalActionCallback}
              />
            </Tab>
          </Tabs>
        )}

        {renderIf(mode === "edit")(
          <Body style={style.editContainer}>
            <ListItemContentEditor
              approval={approval}
              onActionCallback={this.onApprovalActionCallback}
            />
          </Body>
        )}

        {renderIf(mode === "comment")(
          <Body style={style.commentContainer}>
            <ListItemCommentEditor
              approval={approval}
              onActionCallback={this.onApprovalActionCallback}
            />
          </Body>
        )}

        {renderIf(mode === "view")(<BottomNav active="content" />)}
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ContentScreen);
