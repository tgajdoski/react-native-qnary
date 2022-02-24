import React from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./login.screen.style";

import { Layout1 } from "../components/onboarding";

import { LoginForm, SocialLogins } from "./login";

import { navigationService } from "../services";
import { userManager, dataService } from "../data";

interface LoginScreenProps {
  style: any;
}

class LoginScreen extends React.Component<LoginScreenProps> {
  static navigationOptions = {
    header: null
  };

  onLoginSuccess = () => {
    const {
      localState: {
        currentUser: { oid, uid }
      }
    } = userManager.getCurrentUser();

    dataService.alreadyOnboarded(oid, uid).then((response: any) => {
      const {
        data: { alreadyOnboarded }
      } = response;
      if (!alreadyOnboarded.isBoarded) {
        navigationService.navigate("OnBoardingScreen", {});
      } else {
        navigationService.navigate("ContentScreen", {});
      }
    });
  };

  onForgotPasswordClick = () => {
    navigationService.navigate("ForgotPasswordScreen", {});
  };

  render() {
    const { style } = this.props;
    return (
      <Layout1>
        <View style={style.container}>
          <View style={style.loginFormContainer}>
            <LoginForm
              onLoginSuccess={this.onLoginSuccess}
              onForgotPasswordClick={this.onForgotPasswordClick}
            />
          </View>
          {/* <View style={style.socialLoginContainer}>
            <SocialLogins />
          </View> */}
        </View>
      </Layout1>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(LoginScreen);
