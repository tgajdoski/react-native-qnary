import React from "react";

import { Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./screen-description.component.style";

import * as PropTypes from "prop-types";

interface ScreenDescriptionProps {
  description: string;
  color?: string;
}

class ScreenDescription extends React.PureComponent<ScreenDescriptionProps> {
  static propTypes = {
    description: PropTypes.string,
    color: PropTypes.string
  };
  render() {
    const { description, color, style } = this.props;
    const textStyle = { ...style.text };
    if (color != undefined) {
      textStyle.color = color;
    }
    return <Text style={textStyle}>{description}</Text>;
  }
}

export default connectStyle(STYLE_NAME, {})(ScreenDescription);
