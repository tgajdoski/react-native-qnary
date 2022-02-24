import React from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./forgot-password.screen.style";

import PropTypes from "prop-types";

import {
  Layout2,
  TextField,
  Button,
  BackButton,
  ScreenTitle,
  ScreenDescription
} from "../components/onboarding";

import {
  logger,
  navigationService,
  notificationService,
  validationService
} from "../services";

import { dataService } from "../data";
import { withLocalization } from "../components/hoc";

@withLocalization
class ForgotPasswordScreen extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  state = {
    email: ""
  };

  onOkButtonClick = async () => {
    const { t } = this.props;
    const { email } = this.state;
    try {
      if (email.length === 0) {
        notificationService.showError(
          t("GENERIC:ERROR"),
          t("ERRORS:INVALID_EMAIL")
        );
        return;
      }

      if (!validationService.isValidEmail(email)) {
        notificationService.showError(
          t("GENERIC:ERROR"),
          t("ERRORS:INVALID_EMAIL")
        );
        return;
      }

      const {
        data: { passwordResetEmail }
      } = await dataService.sendPasswordResetEmail(email);

      if (passwordResetEmail.isSuccess) {
        notificationService.showInfo(
          null,
          t("LOGIN:FORGOT_PASSWORD:PASSWORD_RESET_EMAIL_SENT")
        );
        navigationService.navigate("LoginScreen", {});
      } else {
        const { error } = passwordResetEmail;
        logger.log("$sendPasswordResetEmail", error); // eslint-disable-line

        const translationKey = this.getErrorTranslationKey(error);
        let template = t(translationKey);

        if (
          translationKey === "LOGIN:FORGOT_PASSWORD:ERROR_RESETTING_PASSWORD"
        ) {
          template += ` : ${error.message}` || "";
        }
        notificationService.showError(t("GENERIC:ERROR"), template);
      }
    } catch (error) {
      logger.error(error);
      notificationService.showError(
        t("GENERIC:ERROR"),
        t("LOGIN:FORGOT_PASSWORD:ERROR_RESETTING_PASSWORD")
      );
    }
  };

  onBackButtonPress = () => {
    navigationService.navigate("LoginScreen", {});
  };

  getErrorTranslationKey = error => {
    switch ((error || {}).code) {
      case "auth/user-not-found":
        return "ERRORS:INVALID_USER";

      case "auth/invalid-email":
        return "ERRORS:INVALID_EMAIL";

      default:
        return "LOGIN:FORGOT_PASSWORD:ERROR_RESETTING_PASSWORD";
    }
  };

  onChangeEmail = (text: string) => {
    this.setState({ email: text });
  };

  render() {
    const { t, style } = this.props;

    return (
      <Layout2
        headerContent={
          <View style={style.header}>
            <BackButton onPress={this.onBackButtonPress} />
            <View style={style.titleContainer}>
              <ScreenTitle
                uppercase={false}
                title={t("LOGIN:FORGOT_PASSWORD:PASSWORD_RESET")}
              />
            </View>
          </View>}
      >
        <View style={style.container}>
          <View style={style.descriptionContainer}>
            <ScreenDescription
              description={t("LOGIN:FORGOT_PASSWORD:DESCRIPTION")}
            />
          </View>
          <View style={style.formContainer}>
            <TextField
              keyboardType="email-address"
              placeholder={t("LOGIN:EMAIL")}
              onChangeText={this.onChangeEmail}
            />
            <Button
              title={t("LOGIN:FORGOT_PASSWORD:RESET")}
              onPress={this.onOkButtonClick}
            />
          </View>
        </View>
      </Layout2>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ForgotPasswordScreen);
