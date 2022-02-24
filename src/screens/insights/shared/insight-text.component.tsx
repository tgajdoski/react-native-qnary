import React from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-text.component.style";

import PropTypes from "prop-types";

import InsightLink from "./insight-link.component";

interface InsightTextProps {
  text: string;
  href?: string;
}

class InsightText extends React.PureComponent<InsightTextProps> {
  static propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string
  };
  render() {
    const { text, href, style } = this.props;
    if (href != undefined && href !== null) {
      return (
        <InsightLink href={href}>
          <Text style={style.link}>{text}</Text>
        </InsightLink>
      );
    }
    return (
      <View>
        <Text style={style.text}>{text}</Text>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(InsightText);
