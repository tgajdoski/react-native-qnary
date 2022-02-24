import React, { Component } from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./login-form.component.style";

import * as PropTypes from "prop-types";

import { withLocalization } from "../../components/hoc";
import { Button, TextField, PasswordField } from "../../components/onboarding";

import { userManager } from "../../data";
import { logger, notificationService, validationService } from "../../services";
import ForgotPasswordLink from "./forgot-password-link.component";

const defaultState = {
  email: "",
  password: "",
  isLoading: false
};

@withLocalization
class LoginForm extends Component {
  static propTypes = {
    t: PropTypes.func
  };

  state = defaultState;

  onButtonPress = async () => {
    const { t, onLoginSuccess } = this.props;
    const { email, password } = this.state;
    // const email = "toni.gajdoski@qnary.com";
    // const password = "toni1000";
    // const email = "admir.durmisi@qnary.com";
    // const password = "admir100";
    // const email = "milcho.cvetkov@qnary.com";
    // const password = "skopje2015";
    // const email = "mark.pilatowski@qnary.com";
    // const password = "Qnary123";
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

    if (password.length === 0) {
      notificationService.showError(
        t("GENERIC:ERROR"),
        t("ERRORS:INVALID_PASSWORD")
      );
      return;
    }

    try {
      this.setState({ isLoading: true });
      // try to authenticate
      const loginResponse = await userManager.login(email, password);

      if (!loginResponse.isSuccess) {
        notificationService.showError(
          t("GENERIC:ERROR"),
          t(loginResponse.error)
        );
        return;
      }

      if (onLoginSuccess !== undefined) {
        onLoginSuccess();
      }
    } catch (err) {
      logger.log(err);
      notificationService.showError(t("GENERIC:ERROR"), t("ERRORS:DEFAULT"));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onEmailChange = (text: string) => {
    this.setState({ email: text });
  };

  onPasswordChange = (text: string) => {
    this.setState({ password: text });
  };

  render() {
    const { t, onForgotPasswordClick, style } = this.props;
    const { isLoading } = this.state;
    return (
      <View style={style.container}>
        <TextField
          keyboardType="email-address"
          placeholder={t("LOGIN:EMAIL")}
          onChangeText={this.onEmailChange}
        />
        <PasswordField
          placeholder={t("LOGIN:PASSWORD")}
          onChangeText={this.onPasswordChange}
        />

        <ForgotPasswordLink onForgotPasswordClick={onForgotPasswordClick} />

        <Button
          title={t("LOGIN:LOGIN")}
          onPress={this.onButtonPress}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(LoginForm);
