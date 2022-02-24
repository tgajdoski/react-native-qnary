import React from "react";
import {
  Button,
  View,
  Text,
  Content,
  Container,
  Header,
  Footer,
  Left,
  Right,
  Body,
  Title,
  Textarea,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./share-via-qnary-modal.component.style";

import PropTypes from "prop-types";

import Modal from "react-native-modal";

import { UserAvatar } from "../../../components/app";

import { userManager, dataService } from "../../../data";

import {
  logger,
  profileFunctionsService,
  notificationService,
  contentLengthFilter,
  countdownFilter,
  maxContentLengthFilter
} from "../../../services";
import { withLocalization } from "../../../components/hoc";
import localizationHelper from "../../../services/localization.helper";

interface ShareViaQnaryModalProps {
  isVisible: boolean;
  qnaryShare: any;
}

@withLocalization
class ShareViaQnaryModal extends React.PureComponent<ShareViaQnaryModalProps> {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    qnaryShare: PropTypes.object.isRequired,
    t: PropTypes.func
  };
  state = {
    isVisible: false,
    qnaryShare: {}
  };

  componentWillUpdate = (nextProps: ShareViaQnaryModalProps) => {
    const { isVisible } = this.state;
    if (nextProps.isVisible !== isVisible) {
      this.setState({
        isVisible: nextProps.isVisible,
        qnaryShare: nextProps.qnaryShare
      });
    }
  };

  scheduleNow = () => {
    const { t } = this.props;
    const {
      localState: {
        currentUser: { oid, uid }
      }
    } = userManager.getCurrentUser();

    const { qnaryShare } = this.state;
    const { content } = qnaryShare;

    const connection = {
      id: qnaryShare.connection.id,
      source: qnaryShare.connection.source
    };

    return dataService
      .shareViaQnary(oid, uid, connection.id, connection.source, content)
      .then(() =>
        notificationService.showInfo(
          null,
          t("INSIGHTS:SHARE:SHARE_CONFIRMATION")
        )
      )
      .then(() => {
        this.setState({ isVisible: false });
      })
      .catch(err => {
        logger.log("failed", err);
      });
  };

  hideModal = () => {
    this.setState({ isVisible: false });
  };

  onChangeContent = (value: string) => {
    const { qnaryShare } = this.state;
    const { connection } = qnaryShare;
    this.setState({
      qnaryShare: {
        connection,
        content: value
      }
    });
  };

  render() {
    const { t, style } = this.props;
    const { isVisible, qnaryShare } = this.state;

    if (!isVisible) {
      return null;
    }

    const { connection, content } = qnaryShare;

    if (connection == undefined) {
      return null;
    }

    const disableShareButton =
      content === undefined || content === null || content.length === 0;

    const contentLength = contentLengthFilter.contentLength(
      content,
      connection.source
    );

    const maxLength = maxContentLengthFilter.maxLength(connection.source);

    const countdown = countdownFilter.countdown(
      content,
      connection.source,
      undefined
    );

    const shareButtonStyle = {
      fontSize: 12,
      lineHeight: 15,
      color: disableShareButton ? "#ccc" : "#fff"
    };

    const counterStyle = {
      color: countdown <= 10 ? "red" : "#000"
    };

    const {
      localState: {
        currentUser: { oid, uid }
      }
    } = userManager.getCurrentUser();

    const renderUserConnection = () => {
      if (connection === undefined || connection === null) {
        return null;
      }

      return (
        <View style={style.connection}>
          <View style={style.userAvatar}>
            <UserAvatar shape="square" conn={connection} oid={oid} uid={uid} />
          </View>
          <View style={style.nameContainer}>
            <Text style={style.displayName}>
              {profileFunctionsService.getDisplayName(connection)}
            </Text>
            <Text style={style.networkName}>
              {localizationHelper.networkName(t, connection.source)}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <Modal transparent={false} animationType="slide" isVisible={isVisible}>
        <Container>
          <Header style={style.header}>
            <Left style={style.left}>
              <Button transparent={true} onPress={this.hideModal}>
                <Text style={style.cancel}>Cancel</Text>
              </Button>
            </Left>
            <Body style={style.body}>
              <Title style={style.title}>Create Content</Title>
            </Body>
            <Right style={style.right}>
              <Button
                onPress={this.scheduleNow}
                transparent={true}
                disabled={disableShareButton}
              >
                <Text style={shareButtonStyle}>Share</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={style.connectionContainer}>
              {renderUserConnection()}
            </View>
            <Textarea
              value={content}
              style={style.textarea}
              onChangeText={this.onChangeContent}
            />
          </Content>
          {connection !== null ? (
            <Footer>
              <View style={style.footer}>
                <Text style={counterStyle}>
                  {contentLength}
                  {"/"}
                  {maxLength}
                </Text>
              </View>
            </Footer>
          ) : null}
        </Container>
      </Modal>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ShareViaQnaryModal);
