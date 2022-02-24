import React, { Component } from "react";

import { View } from "native-base";

import * as PropTypes from "prop-types";

import AutoHeightImage from "react-native-auto-height-image";

import { AppLayout } from "../../../constants";
const { width } = AppLayout.window;

interface ApprovalImageProps {
  approval: any;
}

class ApprovalImage extends Component<ApprovalImageProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired
  };

  render() {
    const { approval } = this.props;
    if (
      approval.image !== undefined &&
      approval.image !== null &&
      approval.image.length > 0
    ) {
      return (
        <View>
          <AutoHeightImage
            width={width - 70}
            source={{ uri: approval.image }}
          />
        </View>
      );
    }
    return null;
  }
}

export default ApprovalImage;
