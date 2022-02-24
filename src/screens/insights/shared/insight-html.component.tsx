import React from "react";
import { Linking } from "react-native";

import { connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-html.component.style";

import PropTypes from "prop-types";

import HTML from "react-native-render-html";

interface InsightHtmlProps {
  html: string;
  tagsStyles: any;
}

class InsightHtml extends React.PureComponent<InsightHtmlProps> {
  static propTypes = {
    html: PropTypes.string.isRequired,
    tagsStyles: PropTypes.object
  };

  onLinkPress = (evt: any, href: string) => {
    Linking.canOpenURL(href).then(() => {
      Linking.openURL(href);
    });
  };

  render() {
    const { html, tagsStyles, style } = this.props;

    let tagsStylesDefault = { ...style.tagsStylesDefault };

    if (tagsStyles != undefined) {
      tagsStylesDefault = tagsStyles;
    }

    return (
      <HTML
        tagsStyles={tagsStylesDefault}
        onLinkPress={this.onLinkPress}
        html={html}
      />
    );
  }
}

export default connectStyle(STYLE_NAME, {})(InsightHtml);
