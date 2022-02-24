import React from "react";

import * as PropTypes from "prop-types";

import { Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./label.component.style";

interface LabelProps {
  onPress?: () => void;
  title: string;
  color: string;
}

class Label extends React.PureComponent<LabelProps> {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    color: PropTypes.string
  };

  render() {
    const { onPress, title, color, style } = this.props;
    const labelStyle = { ...style.label };
    if (color != undefined) {
      labelStyle.color = color;
    }
    return (
      <Text style={labelStyle} onPress={onPress}>
        {title}
      </Text>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Label);
