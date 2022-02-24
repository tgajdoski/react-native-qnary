import React from "react";

import { Image } from "react-native";
import * as PropTypes from "prop-types";

interface NetworkIconProps {
  source: string;
  width: number;
  height: number;
}

class NetworkIcon extends React.Component<NetworkIconProps> {
  static propTypes = {
    source: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };
  render() {
    const { source, width, height } = this.props;
    let imagePath = null;
    switch (source) {
      case "facebook":
        imagePath = require("../../../../assets/icons/facebook.png");
        break;
      case "linkedin":
        imagePath = require("../../../../assets/icons/linkedin.png");
        break;
      case "twitter":
        imagePath = require("../../../../assets/icons/twitter.png");
        break;
      case "instagram":
        imagePath = require("../../../../assets/icons/instagram.png");
        break;
      case "google_plus":
      case "googleplus":
        imagePath = require("../../../../assets/icons/google_plus.png");
        break;
    }
    if (imagePath === null) {
      return null;
    }
    const imageStyle = {
      width,
      height
    };
    return <Image style={imageStyle} source={imagePath} />;
  }
}

export default NetworkIcon;
