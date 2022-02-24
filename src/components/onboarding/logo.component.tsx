import React from "react";

import { Image } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./logo.component.style";

import logoImg from "../../../assets/images/onboarding/qnary-logo.png";

class Logo extends React.Component {
  render() {
    const { style } = this.props;
    return (
      <View style={style.container}>
        <Image style={style.logo} resizeMode="contain" source={logoImg} />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Logo);
