import React, { Component } from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./list-item-content-viewer.component.style";

import PropTypes from "prop-types";

import { HtmlViewer } from "../../../components/app";
import ApprovalImage from "./approval-image.component";

import { autoLinkFilter } from "../../../services";

class ListItemContentViewer extends Component {
  static propTypes = {
    approval: PropTypes.object.isRequired
  };

  render() {
    const { style, approval } = this.props;

    const contentWrapperStyle = {
      paddingTop:
        approval.image != undefined && approval.image.length > 0 ? 10 : 0
    };

    let { content } = approval;

    const renderContent = () => {
      if (approval.edited_content !== undefined) {
        content = approval.edited_content;
      }

      return (
        <HtmlViewer
          html={`<span>${autoLinkFilter.autoLink(content, "twitter")}</span>`}
        />
      );
    };

    return (
      <View>
        <View>
          <ApprovalImage approval={approval} />
        </View>
        <View style={contentWrapperStyle}>{renderContent()}</View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ListItemContentViewer);
