import React from "react";
import { TouchableOpacity } from "react-native";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./connect-network.component.style";

import PropTypes from "prop-types";
import NetworkIcon from "./network-icon.component";
import NetworkName from "./network-name.component";
import { ImageButton } from "../../../components/app";

interface ConnectNetworkProps {
  horizontal?: boolean;
  network: any;
  trash?: (network: any) => void;
  connectNetwork?: (network: any) => void;
}

class ConnectNetwork extends React.Component<ConnectNetworkProps> {
  static propTypes = {
    horizontal: PropTypes.bool,
    network: PropTypes.object.isRequired,
    trash: PropTypes.func,
    connectNetwork: PropTypes.func
  };

  render() {
    const { horizontal, network, trash, connectNetwork, style } = this.props;

    const trash1 = trash != undefined ? trash : () => null;
    const connectNetwork1 =
      connectNetwork != undefined ? connectNetwork : () => null;

    if (horizontal != undefined && horizontal) {
      return (
        <View style={style.horizontal_view_container}>
          <TouchableOpacity onPress={connectNetwork1}>
            <View style={style.horizontal_view_networkIcon}>
              <NetworkIcon source={network.source} width={23} height={23} />
            </View>
            <View style={style.horizontal_view_networkName}>
              <NetworkName network={network} />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={style.vertical_view_container}>
          <View style={style.vertical_view_containerInner}>
            <View style={style.vertical_view_networkIcon}>
              <NetworkIcon source={network.source} width={23} height={23} />
            </View>
            <View style={style.vertical_view_networkName}>
              <NetworkName network={network} />
            </View>
            <View style={style.vertical_view_remove}>
              <ImageButton
                onPress={trash1}
                image={require("../../../../assets/icons/remove.png")}
                width={14}
                height={13}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

export default connectStyle(STYLE_NAME, {})(ConnectNetwork);
