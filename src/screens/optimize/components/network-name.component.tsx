import React from "react";
import * as PropTypes from "prop-types";
import { Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./network-name.component.style";

import { withLocalization } from "../../../components/hoc";

import { localizationHelper, profileFunctionsService } from "../../../services";

interface NetworkNameProps {
  network: any;
  color?: string;
  t?: (key: string) => string;
}

@withLocalization
class NetworkName extends React.Component<NetworkNameProps> {
  static propTypes = {
    network: PropTypes.object.isRequired,
    color: PropTypes.string,
    t: PropTypes.func
  };

  getNetworkName = (network: any) => {
    const { t } = this.props;
    if (!network.id) {
      return localizationHelper.networkName(t, network.source);
    }
    if (network.id) {
      return (
        profileFunctionsService.getDisplayName(network) ||
        profileFunctionsService.getFullName(network) ||
        profileFunctionsService.getID(network)
      );
    }
    return "";
  };

  render() {
    const { network, color, style } = this.props;
    let textColor;
    if (color != undefined) {
      textColor = color;
    } else {
      textColor = "#000";
      switch (network.source) {
        case "facebook":
          textColor = "#3B5999";
          break;
        case "linkedin":
          textColor = "#3177B1";
          break;
        case "twitter":
          textColor = "#1997EC";
          break;
        case "instagram":
          textColor = "#E4405F";
          break;
        case "google_plus":
        case "googleplus":
          textColor = "#DD4B39";
          break;
      }
    }
    if (network === null) {
      return null;
    }

    const textStyle = { ...style.text };
    textStyle.color = textColor;

    return <Text style={textStyle}>{this.getNetworkName(network)}</Text>;
  }
}

export default connectStyle(STYLE_NAME, {})(NetworkName);
