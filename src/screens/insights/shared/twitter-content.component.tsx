import React, { Component } from "react";

import PropTypes from "prop-types";

import { autoLinkFilter } from "../../../services";
import { InsightHtml } from ".";

interface TwitterContentProps {
  content: string;
}

class TwitterContent extends Component<TwitterContentProps> {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  render() {
    const { content } = this.props;

    return (
      <InsightHtml
        html={`<p>${autoLinkFilter.autoLink(content, "twitter")}</p>`}
      />
    );
  }
}

export default TwitterContent;
