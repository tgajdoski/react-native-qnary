import React from "react";

import { View, Item, Input, connectStyle } from "native-base";
import { STYLE_NAME } from "./password-field.component.style";

import * as PropTypes from "prop-types";

import { TouchableOpacity, Image } from "react-native";

import showPasswordImagePath from "../../../assets/images/eye_black.png";

interface PasswordFieldProps {
  secureTextEntry?: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
}

class PasswordField extends React.PureComponent<PasswordFieldProps> {
  static propTypes = {
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func
  };

  state = {
    showPassword: true
  };

  componentDidMount = () => {
    const { secureTextEntry } = this.props;
    this.setState({ showPassword: secureTextEntry || true });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.secureTextEntry !== this.props.secureTextEntry) {
      if (this.props.secureTextEntry != undefined) {
        this.showPassword(this.props.secureTextEntry);
      }
    }
  };

  onChangeTextIntl = (text: string) => {
    const { onChangeText } = this.props;
    onChangeText(text);
  };

  showPassword = (showPassword: boolean) => {
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { placeholder, style } = this.props;
    const { showPassword } = this.state;
    return (
      <View>
        <View style={style.inputContainer}>
          <Item>
            <Input
              style={style.input}
              returnKeyType="go"
              underlineColorAndroid="transparent"
              placeholder={placeholder}
              onChangeText={this.onChangeTextIntl}
              secureTextEntry={showPassword}
            />
          </Item>
        </View>
        <TouchableOpacity
          style={style.showPasswordButton}
          onPress={this.showPassword.bind(this, showPassword)}
        >
          <Image
            style={style.showPasswordImage}
            source={showPasswordImagePath}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(PasswordField);
