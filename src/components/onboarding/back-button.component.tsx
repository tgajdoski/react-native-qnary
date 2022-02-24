import React from "react";

import { TouchableOpacity, Image } from "react-native";

import * as PropTypes from "prop-types";

import { connectStyle } from "native-base";
import { STYLE_NAME } from "./back-button.component.style";

interface LinkButtonProps {
  onPress?: () => void;
}

class BackButton extends React.PureComponent<LinkButtonProps> {
  static propTypes = {
    onPress: PropTypes.func
  };
  render() {
    const { onPress, style } = this.props;
    return (
      <TouchableOpacity style={style.button} onPress={onPress}>
        <Image
          style={style.image}
          source={require("../../../assets/images/onboarding/back-button.png")}
        />
      </TouchableOpacity>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(BackButton);
