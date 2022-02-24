import React from "react";

import { Image, TouchableOpacity } from "react-native";

import { View, CheckBox, connectStyle } from "native-base";
import { STYLE_NAME } from "./notifications.screen.style";

import PropTypes from "prop-types";

import {
  Layout3,
  WizardNavigation,
  ScreenTitle,
  ScreenDescription
} from "../../components/onboarding";

import { AllowNotifications } from "./components";
import { logger, navigationService, notificationService } from "../../services";
import { withLocalization } from "../../components/hoc";

interface NotificationsScreenProps {
  t: any;
  style: any;
}

@withLocalization
class NotificationsScreen extends React.Component<NotificationsScreenProps> {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  allowNotificationsComponent: any = null;

  nextScreen = "SmsScreen";

  state = {
    isEnabled: true
  };

  onNextButtonClick = async () => {
    try {
      await this.allowNotificationsComponent.allowNotifications();
      this.navigateToNextScreen();
    } catch (error) {
      logger.log("NotificationsScreen", error);
      const { t } = this.props;
      notificationService.showError(t("ERRORS:DEFAULT"));
    }
  };

  onSkipButtonClick = () => {
    this.navigateToNextScreen();
  };

  updateAllowNotificationsRef = (ref: any) => {
    this.allowNotificationsComponent = ref;
  };

  onAllowNotificationsChange = () => {
    const { isEnabled } = this.state;
    this.setState({ isEnabled: !isEnabled });
  };

  isBoarding = () => {
    const { navigation } = this.props;
    const onboarding = navigation.getParam("onboarding", undefined);
    return onboarding;
  };

  navigateToNextScreen = () => {
    if (this.isBoarding()) {
      navigationService.navigate(this.nextScreen, {
        onboarding: true
      });
    } else {
      navigationService.navigate("SettingsScreen", {});
    }
  };

  render() {
    const { t, style } = this.props;
    const { isEnabled } = this.state;

    const checkBoxStyle = { ...style.input };
    isEnabled
      ? (checkBoxStyle.backgroundColor = "#535358")
      : (checkBoxStyle.backgroundColor = "#FFF");

    return (
      <Layout3
        gradiendColors={["#5A92CD", "#5A92CD"]}
        footerContent={
          <WizardNavigation
            onSkipButtonClick={this.onSkipButtonClick}
            onNextButtonClick={this.onNextButtonClick}
            step={2}
            steps={4}
            enabled={isEnabled}
          />
        }
      >
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Image
              source={require("../../../assets/images/onboarding/notifications.png")}
            />
            <ScreenTitle color={"#fff"} title={t("NOTIFICATIONS:TITLE")} />
            <ScreenDescription
              color={"#FFF"}
              description={t("NOTIFICATIONS:QNARY_NOTIFIES_YOU")}
            />
          </View>
          <View style={style.contentContainer}>
            <AllowNotifications onRef={this.updateAllowNotificationsRef} />
            <View style={style.contentContainerInner}>
              <View style={style.screenDescriptionContainer}>
                <ScreenDescription
                  color={"#535358"}
                  description={t("NOTIFICATIONS:YOU_WILL_RECEIVE")}
                />
              </View>
              <View style={style.screenDescriptionContainer}>
                <ScreenDescription
                  color={"#535358"}
                  description={t("NOTIFICATIONS:THESE_ARE_BASED")}
                />
              </View>
              <View style={style.screenDescriptionContainer}>
                <View style={style.inputWrapper}>
                  <CheckBox
                    style={style.input}
                    color="#535358"
                    checked={isEnabled}
                    onPress={this.onAllowNotificationsChange}
                  />
                  <View style={style.allowNotificationsContainer}>
                    <TouchableOpacity onPress={this.onAllowNotificationsChange}>
                      <ScreenDescription
                        color={"#535358"}
                        description={t("NOTIFICATIONS:ALLOW_BUTTON")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(NotificationsScreen);
