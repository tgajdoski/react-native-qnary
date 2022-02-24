import React from "react";

import { TouchableOpacity, StyleSheet } from "react-native";

import * as PropTypes from "prop-types";

import { View, Spinner, connectStyle, Text } from "native-base";
import { STYLE_NAME } from "./button.component.style";

import LinearGradient from "react-native-linear-gradient";

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title: string;
  isLoading?: boolean;
  uppercase?: boolean;
  gradientColors: any[];
  color?: string;
}

class Button extends React.PureComponent<ButtonProps> {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    uppercase: PropTypes.bool,
    gradientColors: PropTypes.array,
    color: PropTypes.string
  };
  render() {
    const {
      disabled,
      onPress,
      title,
      gradientColors,
      color,
      isLoading,
      style
    } = this.props;

    // overide button background
    let defaultGradientColors = ["#00D2FF", "#3A7BD5"];
    if (gradientColors !== undefined) {
      defaultGradientColors = gradientColors;
    }

    // overide button colors
    let defaultColor = "#FFFFFF";
    if (color != undefined) {
      defaultColor = color;
    }
    const buttonLabelStyle = { ...style.buttonLabel };
    buttonLabelStyle.color = defaultColor;

    return (
      <LinearGradient
        style={style.container}
        colors={defaultGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          style={StyleSheet.flatten([
            style.button,
            {
              opacity: disabled ? 0.5 : 1
            }
          ])}
          disabled={disabled || false}
          onPress={onPress}
        >
          <View style={style.buttonContentContainer}>
            <View
              style={StyleSheet.flatten([
                style.buttonContentInnerContainer,
                {
                  flex: isLoading ? 0 : 1
                }
              ])}
            >
              <Text style={buttonLabelStyle} uppercase={true}>
                {title}
              </Text>
            </View>
            <View>
              {isLoading ? (
                <Spinner size="small" color="blue" style={style.spinner} />
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Button);
