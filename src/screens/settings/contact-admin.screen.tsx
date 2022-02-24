import React, { Component } from "react";
import {
  Body,
  Textarea,
  Form,
  Item,
  Left,
  Right,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./contact-admin.screen.style";

import * as PropTypes from "prop-types";

import { Button } from "../../components/onboarding";
import { Layout, BottomNav, AnimatedView } from "../../components/app";
import { currentUserAccessor, withLocalization } from "../../components/hoc";

import { dataService } from "../../data";
import { logger, navigationService, notificationService } from "../../services";

@currentUserAccessor
@withLocalization
class ContactAdminScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    navigation: PropTypes.object,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  state = {
    message: "",
    isFormValid: false,
    messageFrom: ""
  };

  componentWillMount() {
    const { navigation } = this.props;

    const messageFrom = navigation.getParam("messageFrom", "");
    this.setState({ messageFrom });

    const message = navigation.getParam("message", "");
    this.onMessageChange(message);
  }

  onMessageChange = (value: string) => {
    this.setState({ message: value });
    this.setState({ isFormValid: value.trim().length > 0 });
  };

  onSendNotificationClick = () => {
    const {
      t,
      currentUser: { oid, uid, profile }
    } = this.props;
    const { message, messageFrom } = this.state;

    const from = `${t("MESSAGE_ADMIN:MESSAGE_FROM")} <qnary_admins@qnary.com>`;
    const fullName = profile.name || `${profile.firstName} ${profile.lastName}`;
    const subject = t("MESSAGE_ADMIN:QNARY_ADMINS") + fullName;

    dataService.sendNotificationToAdmin(oid, uid, from, subject, message).then(
      response => {
        const {
          data: { messageAdmin }
        } = response;
        if (messageAdmin.isSuccess) {
          this.setState({ message: "" });
          notificationService.showInfo(null, t("MESSAGE_ADMIN:MESSAGE_SENT"));
          if (messageFrom.length > 0) {
            navigationService.navigate(messageFrom, {});
          } else {
            navigationService.navigate("SettingsScreen", {});
          }
        }
      },
      err => {
        logger.log(err);
        notificationService.showError(t("ERRORS:DEFAULT"));
      }
    );
  };

  onCancelClick = () => {
    navigationService.navigate("SettingsScreen", {});
  };

  render() {
    const { t, style } = this.props;
    const { message, isFormValid } = this.state;
    return (
      <Layout title={t("MENU:CONTACT_ADMIN")}>
        <Body style={style.body}>
          <AnimatedView nonUsedAreaHeight={190}>
            <Form>
              <Textarea
                style={style.textarea}
                bordered={true}
                placeholder={t("SETTINGS:MESSAGE_ADMIN_PLACEHOLDER")}
                value={message}
                onChangeText={this.onMessageChange}
              />

              <Item style={style.item}>
                <Left style={style.left}>
                  <Button
                    onPress={this.onCancelClick}
                    title={t("GENERIC:CANCEL")}
                    gradientColors={["#fff", "#fff"]}
                    color={"#414141"}
                  />
                </Left>
                <Right style={style.right}>
                  <Button
                    onPress={this.onSendNotificationClick}
                    disabled={!isFormValid}
                    title={t("GENERIC:SEND")}
                  />
                </Right>
              </Item>
            </Form>
          </AnimatedView>
        </Body>
        <BottomNav active="contact_admin" />
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ContactAdminScreen);
