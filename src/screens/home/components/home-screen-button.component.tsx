import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./home-screen-button.component.style";

import * as PropTypes from "prop-types";

interface HomeScreenButtonProps {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

class HomeScreenButton extends React.Component<HomeScreenButtonProps> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };
  static navigationOptions = {
    header: null
  };

  render() {
    const { style, title, icon, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={style.container}>
          <View>
            <Image resizeMode="contain" style={style.image} source={icon} />
          </View>
          <View style={style.contentContainer}>
            <Text style={style.title}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HomeScreenButton);
