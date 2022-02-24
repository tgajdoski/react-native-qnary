import React, { ReactNode } from "react";

import { connectStyle, Container, View, Footer } from "native-base";

import { STYLE_NAME } from "./layout3.component.style";

import * as PropTypes from "prop-types";

import LinearGradient from "react-native-linear-gradient";
import renderIf from "render-if";

import { KeyboardAwareContent } from "../custom";

interface Layout3Props {
  children: ReactNode;
  gradiendColors: string[];
  footerContent: ReactNode;
  fixedFooter?: boolean;
}

class Layout3 extends React.PureComponent<Layout3Props> {
  static propTypes = {
    children: PropTypes.node,
    gradiendColors: PropTypes.array,
    footerContent: PropTypes.node,
    fixedFooter: PropTypes.bool
  };

  render() {
    const {
      children,
      gradiendColors,
      footerContent,
      fixedFooter,
      style
    } = this.props;

    let gradiendColorsDefault = ["#00D2FF", "#3A7BD5"];
    if (gradiendColors !== undefined) {
      gradiendColorsDefault = gradiendColors;
    }

    const isFixedFooter =
      fixedFooter !== null && fixedFooter === true ? true : false;

    return (
      <Container style={style.container}>
        <LinearGradient style={style.background} colors={gradiendColorsDefault}>
          <KeyboardAwareContent contentContainerStyle={style.contentContainer}>
            <View style={style.contentContainerInner}>{children}</View>
            {renderIf(!isFixedFooter && footerContent)(
              <View style={style.footerContainer}>{footerContent}</View>
            )}
          </KeyboardAwareContent>
          {renderIf(isFixedFooter && footerContent)(
            <Footer>{footerContent}</Footer>
          )}
        </LinearGradient>
      </Container>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Layout3);
