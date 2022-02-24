import React from "react";

import { View, connectStyle } from "native-base";

import { STYLE_NAME } from "./forgot-password-link.component.style";

import { withLocalization } from "../../components/hoc";
import { Label } from "../../components/onboarding";

interface SignupSectionProps {
  onForgotPasswordClick: () => void;
}

@withLocalization
class ForgotPasswordLink extends React.PureComponent<SignupSectionProps> {
  render() {
    const { t, style, onForgotPasswordClick } = this.props;
    return (
      <View style={style.container}>
        <Label
          title={t("LOGIN:FORGOT_PASSWORD:FORGOT_PASSWORD")}
          onPress={onForgotPasswordClick}
        />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ForgotPasswordLink);
