import React, { Component } from "react";
import { WebView } from "react-native";

import { connectStyle } from "native-base";
import { STYLE_NAME } from "./privacy-policy-dialog.component.style";

import * as PropTypes from "prop-types";
import Modal from "react-native-modal";

import config from "../../config";
import { withLocalization } from "../../components/hoc";
import { Button } from "../../components/onboarding";

interface PrivacyPolicyDialogProps {
  t: (key: string) => string;
  isVisible: boolean;
  onClose: () => void;
}

@withLocalization
class PrivacyPolicyDialog extends Component<PrivacyPolicyDialogProps> {
  static propTypes = {
    isVisible: PropTypes.bool
  };
  state = {
    isVisible: false
  };

  componentWillReceiveProps = (nextProps: PrivacyPolicyDialogProps) => {
    const { isVisible } = nextProps;
    this.setState({ isVisible });
  };

  close = () => {
    const { onClose } = this.props;
    if (onClose != undefined) {
      onClose();
    }
    this.setState({ isVisible: false });
  };

  render() {
    const { t } = this.props;
    const { isVisible } = this.state;
    return (
      <Modal isVisible={isVisible === true}>
        <WebView
          source={{ uri: config.PRIVACY_POLICY_URL }}
          scalesPageToFit={true}
        />
        <Button
          title={t("GENERIC:CLOSE_BUTTON")}
          onPress={this.close}
          disabled={false}
          isLoading={false}
        />
      </Modal>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(PrivacyPolicyDialog);
