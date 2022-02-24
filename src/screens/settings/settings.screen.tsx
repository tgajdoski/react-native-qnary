import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  View,
  List,
  ListItem,
  Left,
  Body,
  Text,
  Button,
  Switch,
  Right,
  Content,
  connectStyle,
  Item
} from "native-base";
import { STYLE_NAME } from "./settings.screen.style";

import * as PropTypes from "prop-types";

import { Layout, BottomNav } from "../../components/app";
import { currentUserAccessor, withLocalization } from "../../components/hoc";
import { LanguagePicker } from "../login";
import { ProfileInfo } from "../profile/components";
import { AllowNotifications } from "../onboarding/components";

import { userManager, dataService } from "../../data";
import { logger, navigationService } from "../../services";

@currentUserAccessor
@withLocalization
class SettingsScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  state = {
    deviceIsRegistered: false,
    resumeNotifications: false,
    deviceIsRegisteredForSMS: false,
    resumeSMSNotifications: false
  };

  async componentWillMount() {
    const {
      currentUser: { settings }
    } = this.props;

    try {
      try {
        const notificationsEnabled = settings.notifications.push.off === false;
        this.setState({
          deviceIsRegistered: true,
          resumeNotifications: notificationsEnabled
        });
      } catch (err) {
        logger.log(err);
      }

      try {
        const notificationsEnabled = settings.sms.push.off === false;
        this.setState({
          deviceIsRegisteredForSMS: true,
          resumeSMSNotifications: notificationsEnabled
        });
      } catch (err) {
        logger.log(err);
      }
    } catch (err) {
      logger.log(err);
    }
  }

  onClearCacheButtonClick = () => {
    const {
      currentUser: { oid, uid }
    } = this.props;

    dataService.clearDeviceCache(oid, uid).then(response => {
      const {
        data: { clearDeviceCache }
      } = response;
      if (clearDeviceCache) {
        navigationService.navigate("LoginScreen", {});
      }
    });
  };

  onEmailMyAdministratorClick = () => {
    navigationService.navigate("ContactAdminScreen", {});
  };

  onChangePasswordClick = () => {
    navigationService.navigate("ChangePasswordScreen", {});
  };

  onChangeEmailClick = () => {
    navigationService.navigate("ChangeEmailScreen", {});
  };

  onChangeSMSSettingsClick = () => {
    navigationService.navigate("SmsScreen", {});
  };

  onResumeNotifications = () => {
    const {
      currentUser: { oid, uid }
    } = this.props;

    const { resumeNotifications, deviceIsRegistered } = this.state;
    const resume = !resumeNotifications;

    if (resume) {
      if (!deviceIsRegistered) {
        // allow notificiation (register this device)
        this.allowNotificationsComponent.allowNotifications().then(() => {
          userManager.refresh().then(() => {
            this.setState({ resumeNotifications: true });
          });
        });
      } else {
        // allow notification (update the settings for current user)
        dataService.resumeNotifications(oid, uid).then(() => {
          userManager.refresh().then(() => {
            this.setState({ resumeNotifications: true });
          });
        });
      }
    } else {
      // pause notifications (update the settings for current user)
      dataService.pauseNotifications(oid, uid).then(() => {
        userManager.refresh().then(() => {
          this.setState({ resumeNotifications: false });
        });
      });
    }
  };

  onResumeSMSNotifications = () => {
    const {
      currentUser: { oid, uid }
    } = this.props;

    const { resumeSMSNotifications, deviceIsRegisteredForSMS } = this.state;
    const resume = !resumeSMSNotifications;

    if (resume) {
      if (!deviceIsRegisteredForSMS) {
        navigationService.navigate("SmsScreen", {});
      } else {
        // allow notification (update the settings for current user)
        dataService.resumeSMSNotifications(oid, uid).then(() => {
          userManager.refresh().then(() => {
            this.setState({ resumeSMSNotifications: true });
          });
        });
      }
    } else {
      // pause notifications (update the settings for current user)
      dataService.pauseSMSNotifications(oid, uid).then(() => {
        userManager.refresh().then(() => {
          this.setState({ resumeSMSNotifications: false });
        });
      });
    }
  };

  openLanguagePicker = () => {
    this.languagePicker.open();
  };

  updateLanguagePickerRef = (ref: any) => {
    this.languagePicker = ref;
  };

  updateAllowNotificationsRef = (ref: any) => {
    this.allowNotificationsComponent = ref;
  };

  render() {
    const { t, style } = this.props;
    const { resumeNotifications, resumeSMSNotifications } = this.state;

    return (
      <Layout title={t("MENU:SETTINGS")}>
        <Content contentContainerStyle={style.container}>
          <View style={style.containerInner}>
            <View style={style.top}>
              <ProfileInfo
                image={require("../../../assets/images/settings/edit.png")}
                imageStyle={style.profileInfoEditImage}
              />
            </View>
            <View style={style.bottom}>
              <List style={style.list}>
                <ListItem
                  style={style.listItem}
                  button={true}
                  onPress={this.onChangePasswordClick}
                >
                  <Item style={style.item}>
                    <Left style={style.left}>
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/settings/change_password.png")}
                        style={style.change_password}
                      />
                    </Left>
                    <Body style={style.body}>
                      <Text style={style.label}>
                        {t("SETTINGS:CHANGE_PASSWORD:CHANGE_PASSWORD")}
                      </Text>
                    </Body>
                    <Right style={style.right}>
                      <TouchableOpacity onPress={this.onChangePasswordClick}>
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/settings/edit.png")}
                          style={style.edit}
                        />
                      </TouchableOpacity>
                    </Right>
                  </Item>
                </ListItem>
                <ListItem
                  style={style.listItem}
                  button={true}
                  onPress={this.onChangeEmailClick}
                >
                  <Item style={style.item}>
                    <Left style={style.left}>
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/settings/change_email.png")}
                        style={style.change_email}
                      />
                    </Left>
                    <Body style={style.body}>
                      <Text style={style.label}>
                        {t("SETTINGS:CHANGE_EMAIL:CHANGE_EMAIL")}
                      </Text>
                    </Body>
                    <Right style={style.right}>
                      <TouchableOpacity onPress={this.onChangeEmailClick}>
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/settings/edit.png")}
                          style={style.edit}
                        />
                      </TouchableOpacity>
                    </Right>
                  </Item>
                </ListItem>
                <ListItem
                  style={style.listItem}
                  button={true}
                  onPress={this.openLanguagePicker}
                >
                  <Item style={style.item}>
                    <Left style={style.left}>
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/settings/choose_language.png")}
                        style={style.choose_language}
                      />
                    </Left>
                    <Body style={style.body}>
                      <Text style={style.label}>
                        {t("SETTINGS:CHOOSE_LANGUAGE")}
                      </Text>
                      <LanguagePicker onRef={this.updateLanguagePickerRef} />
                    </Body>
                    <Right style={style.right}>
                      <TouchableOpacity onPress={this.openLanguagePicker}>
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/settings/edit.png")}
                          style={style.edit}
                        />
                      </TouchableOpacity>
                    </Right>
                  </Item>
                </ListItem>
                <ListItem
                  style={style.listItem}
                  button={true}
                  onPress={this.onChangeSMSSettingsClick}
                >
                  <Item style={style.item}>
                    <Left style={style.left}>
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/settings/sms_settings.png")}
                        style={style.sms_settings}
                      />
                    </Left>
                    <Body style={style.body}>
                      <Text style={style.label}>
                        {t("SETTINGS:CHANGE_SMS:CHANGE_SMS")}
                      </Text>
                    </Body>
                    <Right style={style.right}>
                      <TouchableOpacity onPress={this.onChangeSMSSettingsClick}>
                        <Image
                          resizeMode="contain"
                          source={require("../../../assets/images/settings/edit.png")}
                          style={style.edit}
                        />
                      </TouchableOpacity>
                    </Right>
                  </Item>
                </ListItem>
                <ListItem>
                  <View style={style.notificationContainer}>
                    <View style={style.notificationContainer1}>
                      <Item style={style.item}>
                        <Left>
                          {resumeNotifications ? (
                            <Text style={style.notificationsTitle}>
                              {t("SETTINGS:PAUSE_NOTIFICATIONS")}
                            </Text>
                          ) : (
                            <Text style={style.notificationsTitle}>
                              {t("SETTINGS:RESUME_NOTIFICATIONS")}
                            </Text>
                          )}
                        </Left>
                        <Right>
                          <AllowNotifications
                            onRef={this.updateAllowNotificationsRef}
                          />
                          <Switch
                            style={style.switch}
                            thumbColor={
                              resumeSMSNotifications ? "#fff" : "#F1F1F1"
                            }
                            trackColor={{
                              true: "#0076CC",
                              false: "rgba(34, 31, 31, 0.26)"
                            }}
                            value={resumeNotifications}
                            onValueChange={this.onResumeNotifications}
                          />
                        </Right>
                      </Item>
                    </View>
                    <View style={style.notificationContainer2}>
                      <Text style={style.notificationsDesc}>
                        {t("SETTINGS:NOTIFICATIONS_NOTE")}
                      </Text>
                    </View>
                  </View>
                </ListItem>
                <ListItem>
                  <View style={style.notificationContainer}>
                    <View style={style.notificationContainer1}>
                      <Item style={style.item}>
                        <Left>
                          {resumeSMSNotifications ? (
                            <Text style={style.notificationsTitle}>
                              {t("SETTINGS:PAUSE_SMS")}
                            </Text>
                          ) : (
                            <Text style={style.notificationsTitle}>
                              {t("SETTINGS:RESUME_SMS")}
                            </Text>
                          )}
                        </Left>
                        <Right>
                          <Switch
                            style={style.switch}
                            thumbColor={
                              resumeSMSNotifications ? "#fff" : "#F1F1F1"
                            }
                            trackColor={{
                              true: "#0076CC",
                              false: "rgba(34, 31, 31, 0.26)"
                            }}
                            value={resumeSMSNotifications}
                            onValueChange={this.onResumeSMSNotifications}
                          />
                        </Right>
                      </Item>
                    </View>
                    <View style={style.notificationContainer2}>
                      <Text style={style.notificationsDesc}>
                        {t("SETTINGS:NOTE_SMS")}
                      </Text>
                    </View>
                  </View>
                </ListItem>
                <ListItem style={style.item}>
                  <View style={style.emailAdminButtonContainer}>
                    <Button
                      iconLeft={true}
                      full={true}
                      onPress={this.onEmailMyAdministratorClick}
                      style={style.emailAdminButton}
                    >
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/settings/email_administrator.png")}
                        style={style.email_administrator}
                      />
                      <Text style={style.emailAdminButtonText}>
                        {t("SETTINGS:EMAIL_ADMIN")}
                      </Text>
                    </Button>
                  </View>
                </ListItem>
                <ListItem style={style.item}>
                  <Text
                    style={style.resetCache}
                    onPress={this.onClearCacheButtonClick}
                  >
                    {t("SETTINGS:RESET_CACHE")}
                  </Text>
                </ListItem>
              </List>
            </View>
          </View>
        </Content>
        <BottomNav active="settings" />
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SettingsScreen);
