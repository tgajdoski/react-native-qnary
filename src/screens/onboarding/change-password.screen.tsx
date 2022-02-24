import React from "react";

import { Switch, Image } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./change-password.screen.style";

import * as PropTypes from "prop-types";

import {
  Layout3,
  ScreenTitle,
  ScreenDescription,
  Label,
  PasswordField,
  WizardNavigation,
  ScreenFooterClassic
} from "../../components/onboarding";

import { navigationService, notificationService } from "../../services";
import { dataService } from "../../data";
import { currentUserAccessor, withLocalization } from "../../components/hoc";

interface ChangePasswordScreenProps {
  t: (key: string) => string;
  currentUser: any;
  style: any;
}

@currentUserAccessor
@withLocalization
class ChangePasswordScreen extends React.Component<ChangePasswordScreenProps> {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  nextScreen = "NotificationsScreen";

  state = {
    isEnabled: false,
    showPasswords: false,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  };

  onNextButtonClick = async () => {
    const {
      t,
      currentUser: { email, oid }
    } = this.props;
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    try {
      if (newPassword !== confirmNewPassword) {
        // "New passwords don't match."
        notificationService.showError(
          t("GENERIC:ERROR"),
          t("ERRORS:PASSWORDS_DO_NOT_MATCH")
        );
      } else if (oldPassword === newPassword) {
        // "Old and new passwords are the same."
        notificationService.showError(
          t("GENERIC:ERROR"),
          t("ERRORS:PASSWORD_MUST_BE_DIFFERENT")
        );
      } else if (newPassword.length < 7 && newPassword.length > 0) {
        // "New password is too short."
        notificationService.showError(
          t("GENERIC:ERROR"),
          t("ERRORS:PASSWORD_TOO_SHORT")
        );
      } else {
        const {
          data: { passwordUpdate }
        } = await dataService.changePassword(
          email,
          oid,
          oldPassword,
          newPassword
        );

        if (passwordUpdate.isSuccess) {
          notificationService.showInfo(
            null,
            t("SETTINGS:CHANGE_PASSWORD:PASSWORD_CHANGED")
          );
          this.navigateToNextScreen();
        } else {
          const { error } = passwordUpdate;
          const code = error !== null ? error.code : null;
          switch (code) {
            case "LOGIN_FAILED":
            case "INVALID_PASSWORD":
              notificationService.showError(
                t("GENERIC:ERROR"),
                t("ERRORS:INVALID_PASSWORD")
              );
              break;
            case "INVALID_USER":
              notificationService.showError(
                t("GENERIC:ERROR"),
                t("ERRORS:INVALID_USER")
              );
              break;
            default:
              notificationService.showError(
                t("GENERIC:ERROR"),
                t("ERRORS:ERROR_CHANGING_PASSWORD") + error
              );
          }
        }
      }
    } catch (error) {
      notificationService.showError(
        t("GENERIC:ERROR"),
        t("ERRORS:ERROR_CHANGING_PASSWORD") + error
      );
    }
  };

  onSkipButtonClick = () => {
    this.navigateToNextScreen();
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

  enableOkayButton = () => {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      this.setState({ isEnabled: true });
    } else {
      this.setState({ isEnabled: false });
    }
  };

  onOldPasswordChanged = (text: string) => {
    this.setState({ oldPassword: text });
    this.enableOkayButton();
  };

  onNewPasswordChanged = (text: string) => {
    this.setState({ newPassword: text });
    this.enableOkayButton();
  };

  onConfirmNewPasswordChanged = (text: string) => {
    this.setState({ confirmNewPassword: text });
    this.enableOkayButton();
  };

  onShowPasswordsValueChange = (value: boolean) => {
    this.setState({ showPasswords: value });
  };

  render() {
    const { t, style } = this.props;
    const { showPasswords, isEnabled } = this.state;
    const description = `${t("SETTINGS:CHANGE_PASSWORD:BEFORE_CONTINUING")} ${t(
      "SETTINGS:CHANGE_PASSWORD:REQUIREMENTS"
    )}`;

    const renderFooter = () => {
      return this.isBoarding() ? (
        <WizardNavigation
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          enableNextButton={isEnabled}
          step={1}
          steps={4}
          enabled={isEnabled}
        />
      ) : (
        <ScreenFooterClassic
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          enabled={isEnabled}
        />
      );
    };
    return (
      <Layout3
        gradiendColors={["#F8BC21", "#F8BC21"]}
        footerContent={renderFooter()}
      >
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Image
              source={require("../../../assets/images/onboarding/change-password.png")}
            />
            <ScreenTitle
              color={"#fff"}
              title={t("SETTINGS:CHANGE_PASSWORD:CHANGE_PASSWORD")}
            />
            <ScreenDescription color={"#fff"} description={description} />
          </View>
          <View style={style.contentContainer}>
            <PasswordField
              placeholder={t("SETTINGS:CHANGE_PASSWORD:CURRENT_PASSWORD")}
              onChangeText={this.onOldPasswordChanged}
              secureTextEntry={showPasswords}
            />
            <PasswordField
              placeholder={t("SETTINGS:CHANGE_PASSWORD:NEW_PASSWORD")}
              onChangeText={this.onNewPasswordChanged}
              secureTextEntry={showPasswords}
            />
            <PasswordField
              placeholder={t("SETTINGS:CHANGE_PASSWORD:CONFIRM_NEW_PASSWORD")}
              onChangeText={this.onConfirmNewPasswordChanged}
              secureTextEntry={showPasswords}
            />
            <View style={style.ShowPasswordsView}>
              <View style={style.ShowPasswordsLabelWrapper}>
                <Label
                  color={"#fff"}
                  title={t("SETTINGS:CHANGE_PASSWORD:SHOW_PASSWORDS")}
                />
              </View>
              <View style={style.ShowPasswordsSwitchWrapper}>
                <Switch
                  value={showPasswords}
                  onValueChange={this.onShowPasswordsValueChange}
                />
              </View>
            </View>
          </View>
        </View>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ChangePasswordScreen);
