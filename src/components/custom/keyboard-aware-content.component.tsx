import React from "react";

import { Content } from "native-base";

import KeyboardListener from "react-native-keyboard-listener";

import * as PropTypes from "prop-types";

class KeyboardAwareContent extends React.Component<{
  style?: any;
  contentContainerStyle?: any;
}> {
  static propTypes = {
    children: PropTypes.node
  };

  content: any = null;

  onKeyboardDidShow = () => {
    if (this.content !== null) {
      this.content._root.scrollToEnd();
    }
  };

  updateContentRef = (ref: any) => {
    this.content = ref;
  };

  render() {
    const { children, style, contentContainerStyle } = this.props;
    return (
      <Content
        ref={this.updateContentRef}
        style={style}
        contentContainerStyle={contentContainerStyle}
      >
        <KeyboardListener onDidShow={this.onKeyboardDidShow} />
        {children}
      </Content>
    );
  }
}

export default KeyboardAwareContent;
