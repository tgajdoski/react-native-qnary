import React, { Component } from "react";

import { Icon } from "native-base";

import * as PropTypes from "prop-types";

interface ApprovalIconProps {
  approval: any;
}

class ApprovalIcon extends Component<ApprovalIconProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired
  };
  render() {
    const {
      approval: { source }
    } = this.props;
    if (source === null) {
      return null;
    }

    if (source === "other") {
      return <Icon name="document" />;
    }

    return <Icon type="FontAwesome" name={source} />;
  }
}

export default ApprovalIcon;
