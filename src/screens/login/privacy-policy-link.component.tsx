import React, { Component } from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./privacy-policy-link.component.style";

import { PrivacyPolicyDialog } from ".";

import { withLocalization } from "../../components/hoc";
import { Label } from "../../components/onboarding";

@withLocalization
class PrivacyPolicyLink extends Component {
  state = {
    modalVisible: false
  };

  openPrivacyPolicyDialog = () => {
    this.setState({ modalVisible: true });
  };

  onClose = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { t, style } = this.props;
    const { modalVisible } = this.state;
    return (
      <View style={style.container}>
        <Label
          title={t("LOGIN:PRIVACY_POLICY")}
          onPress={this.openPrivacyPolicyDialog}
        />
        <PrivacyPolicyDialog isVisible={modalVisible} onClose={this.onClose} />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(PrivacyPolicyLink);
