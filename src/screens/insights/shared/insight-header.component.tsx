import React from "react";
import { Linking } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";

import { InsightHtml } from ".";

interface InsightHeaderProps {
  content: string;
  href?: string;
}
class InsightHeader extends React.PureComponent<InsightHeaderProps> {
  static propTypes = {
    content: PropTypes.string.isRequired,
    href: PropTypes.string
  };

  render() {
    const { content, href } = this.props;
    if (href !== null) {
      return (
        <View>
          <InsightHtml html={`<a href=${href}>${content}</a>`} />
        </View>
      );
    }
    return (
      <View>
        <InsightHtml html={`<p>${content}</p>`} />
      </View>
    );
  }
}

export default InsightHeader;
