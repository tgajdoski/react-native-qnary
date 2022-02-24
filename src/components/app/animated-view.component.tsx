import * as React from "react";
import { Animated } from "react-native";

import KeyboardListener from "react-native-keyboard-listener";

import { AppLayout } from "../../constants";

const { window, isIphoneX } = AppLayout;

export interface AnimatedViewProps {
  nonUsedAreaHeight: number;
}

class AnimatedView extends React.Component<AnimatedViewProps, {}> {
  formHeight: number;
  formHeightAnimated: Animated.Value;
  keyboardHeightAnimated: Animated.Value;

  constructor(props: AnimatedViewProps) {
    super(props);
    this.keyboardHeightAnimated = new Animated.Value(0);
    this.formHeight = isIphoneX
      ? window.height - props.nonUsedAreaHeight - 20
      : window.height - props.nonUsedAreaHeight;
    this.formHeightAnimated = new Animated.Value(this.formHeight);
  }

  keyboardDidShow = (event: any) => {
    let toHeight =
      window.height -
      event.endCoordinates.height -
      this.props.nonUsedAreaHeight;
    if (isIphoneX) {
      toHeight = toHeight - 20;
    }
    Animated.parallel([
      Animated.timing(this.keyboardHeightAnimated, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.formHeightAnimated, {
        duration: event.duration,
        toValue: toHeight
      })
    ]).start();
  };

  keyboardDidHide = (event: any) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeightAnimated, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.formHeightAnimated, {
        duration: event.duration,
        toValue: this.formHeight
      })
    ]).start();
  };

  public render() {
    const { children } = this.props;
    const viewStyle = {
      height: this.formHeightAnimated
    };
    return (
      <Animated.View style={viewStyle}>
        <KeyboardListener
          onDidShow={this.keyboardDidShow}
          onDidHide={this.keyboardDidHide}
        />
        {children}
      </Animated.View>
    );
  }
}

export default AnimatedView;
