import React from "react";

import * as PropTypes from "prop-types";

import { View, Item, Input, connectStyle } from "native-base";
import { STYLE_NAME } from "./text-field.component.style";

interface TextFieldProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  keyboardType:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search";
}

class TextField extends React.PureComponent<TextFieldProps> {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    keyboardType: PropTypes.string
  };

  onChangeTextIntl = (text: string) => {
    const { onChangeText } = this.props;
    onChangeText(text);
  };

  render() {
    const { value, placeholder, keyboardType, style } = this.props;
    const keyboardType1 = keyboardType || "default";
    return (
      <View style={style.container}>
        <Item>
          <Input
            style={style.input}
            placeholder={placeholder}
            onChangeText={this.onChangeTextIntl}
            value={value}
            autoCapitalize="none"
            keyboardType={keyboardType1}
            autoCorrect={false}
          />
        </Item>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(TextField);
