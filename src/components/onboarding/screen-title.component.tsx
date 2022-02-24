import React from "react";

import { Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./screen-title.component.style";

import * as PropTypes from "prop-types";

interface ScreenTitleProps {
  title: string;
  uppercase: boolean;
}

class ScreenTitle extends React.PureComponent<ScreenTitleProps> {
  static propTypes = {
    title: PropTypes.string,
    uppercase: PropTypes.bool
  };
  render() {
    const { title, uppercase, style } = this.props;
    let titleValue = title;
    if (uppercase) {
      titleValue = title.toUpperCase();
    }
    return <Text style={style.text}>{titleValue}</Text>;
  }
}

export default connectStyle(STYLE_NAME, {})(ScreenTitle);
