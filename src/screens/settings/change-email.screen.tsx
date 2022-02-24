import React, { Component } from "react";
import { Image } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./change-email.screen.style";

import * as PropTypes from "prop-types";

import {
  Layout3,
  ScreenFooterClassic,
  ScreenTitle,
  TextField
} from "../../components/onboarding";

import { currentUserAccessor, withLocalization } from "../../components/hoc";

import { userManager, dataService } from "../../data";

import {
  navigationService,
  notificationService,
  validationService
} from "../../services";

@currentUserAccessor
@withLocalization
class ChangeEmailScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  state = {
    email: "",
    isFormValid: false
  };

  onSkipButtonClick = () => {
    navigationService.navigate("SettingsScreen", {});
  };

  onNextButtonClick = async () => {
    const {
      t,
      currentUser: { uid }
    } = this.props;

    const { email } = this.state;

    dataService.changeEmail(uid, email).then(
      (response: any) => {
        const {
          data: { changeEmail }
        } = response;
        if (changeEmail.isSuccess) {
          userManager.refresh().then(() => {
            notificationService.showInfo(
              null,
              t("SETTINGS:CHANGE_EMAIL:EMAIL_CHANGED")
            );
            navigationService.navigate("SettingsScreen", {});
          });
        }
      },
      () => {
        notificationService.showError(t("ERRORS:DEFAULT"));
      }
    );
  };

  onEmailChange = (value: string) => {
    this.setState({ email: value });
    this.setState({ isFormValid: validationService.isValidEmail(value) });
  };

  render() {
    const { t, style } = this.props;
    const { isFormValid } = this.state;
    const renderFooter = () => {
      return (
        <ScreenFooterClassic
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          enabled={isFormValid}
        />
      );
    };
    return (
      <Layout3
        gradiendColors={["#5A92CD", "#5A92CD"]}
        footerContent={renderFooter()}
      >
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Image
              source={require("../../../assets/images/onboarding/change-password.png")}
            />
            <View style={style.screenTitleContainer}>
              <ScreenTitle
                color={"#fff"}
                title={t("SETTINGS:CHANGE_EMAIL:CHANGE_EMAIL")}
              />
            </View>
          </View>
          <View style={style.contentContainer}>
            <TextField
              keyboardType="email-address"
              placeholder={t("SETTINGS:CHANGE_EMAIL:NEW_EMAIL")}
              onChangeText={this.onEmailChange}
            />
          </View>
        </View>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ChangeEmailScreen);
