import React from "react";
import { Linking } from "react-native";

import { connectStyle } from "native-base";
import { STYLE_NAME } from "./html-viewer.component.style";

import PropTypes from "prop-types";

import HTML from "react-native-render-html";

import appLayout from "../../constants/app-layout";
const { width } = appLayout.window;

export interface HtmlViewerProps {
  html: string;
  tagsStyles: any;
}

class HtmlViewer extends React.Component<HtmlViewerProps> {
  static propTypes = {
    html: PropTypes.string.isRequired,
    tagsStyles: PropTypes.object
  };

  constructor(props: HtmlViewerProps) {
    super(props);
    this.state = {};
  }

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
        imagesMaxWidth={width}
      />
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HtmlViewer);
