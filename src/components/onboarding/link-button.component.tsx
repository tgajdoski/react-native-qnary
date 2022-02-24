import React from "react";

import { TouchableOpacity } from "react-native";

import * as PropTypes from "prop-types";

import { connectStyle } from "native-base";
import { STYLE_NAME } from "./link-button.component.style";

import { Label } from ".";

interface LinkButtonProps {
  onPress?: () => void;
  title: string;
}

class LinkButton extends React.PureComponent<LinkButtonProps> {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
  };
  render() {
    const { onPress, title, style } = this.props;
    return (
      <TouchableOpacity style={style.StyledButton} onPress={onPress}>
        <Label title={title} />
      </TouchableOpacity>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(LinkButton);
