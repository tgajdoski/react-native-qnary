import React from "react";

import { Linking, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

interface InsightLinkProps {
  href: string;
  children: any;
}

class InsightLink extends React.PureComponent<InsightLinkProps> {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  openLink = (url: string) => {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  };

  render() {
    const { href, children } = this.props;
    return (
      <TouchableOpacity onPress={this.openLink.bind(this, href)}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default InsightLink;
