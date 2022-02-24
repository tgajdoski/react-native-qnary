import React, { ReactNode } from "react";

import { ImageBackground } from "react-native";

import {
  connectStyle,
  Container,
  View,
  Footer,
  Left,
  Right,
  Item
} from "native-base";
import { STYLE_NAME } from "./layout1.component.style";

import * as PropTypes from "prop-types";

import Logo from "./logo.component";
import { KeyboardAwareContent } from "../custom";
import { PrivacyPolicyLink, LanguagePickerLink } from "../../screens/login";

interface Layout1Props {
  children: ReactNode;
}

class Layout1 extends React.PureComponent<Layout1Props> {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children, style } = this.props;
    return (
      <Container style={style.container}>
        <KeyboardAwareContent contentContainerStyle={style.contentContainer}>
          <View style={style.headerContainer}>
            <ImageBackground
              style={style.headerBackground}
              source={require("../../../assets/images/onboarding/header-background.png")}
            >
              <Logo />
            </ImageBackground>
          </View>
          <View style={style.mainContentContainer}>{children}</View>
        </KeyboardAwareContent>
        <Footer style={style.footer}>
          <Item style={style.footerInner}>
            <Left>
              <PrivacyPolicyLink />
            </Left>
            <Right>
              <LanguagePickerLink />
            </Right>
          </Item>
        </Footer>
      </Container>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Layout1);
