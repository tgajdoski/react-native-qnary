import React, { ReactNode } from "react";

import { ImageBackground } from "react-native";

import {
  connectStyle,
  Container,
  View,
  Footer,
  Content,
  Left,
  Right,
  Item
} from "native-base";

import { STYLE_NAME } from "./layout2.component.style";

import * as PropTypes from "prop-types";
import { PrivacyPolicyLink, LanguagePickerLink } from "../../screens/login";
import renderIf from "render-if";

import { KeyboardAwareContent } from "../custom";

interface Layout2Props {
  headerContent: JSX.Element;
  children: ReactNode;
}

class Layout2 extends React.PureComponent<Layout2Props> {
  static propTypes = {
    children: PropTypes.node,
    headerContent: PropTypes.node
  };

  render() {
    const { headerContent, children, style } = this.props;
    return (
      <Container style={style.container}>
        <KeyboardAwareContent contentContainerStyle={style.contentContainer}>
          <View style={style.headerContainer}>
            <ImageBackground
              style={style.headerBackground}
              source={require("../../../assets/images/onboarding/header-background2.png")}
            >
              {renderIf(headerContent !== null)(headerContent)}
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

export default connectStyle(STYLE_NAME, {})(Layout2);
