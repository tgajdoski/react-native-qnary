import React, { Component } from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./list-item-actions.component.style";

import * as PropTypes from "prop-types";
import { ImageButton } from "../../../components/app";

interface ListItemActionsProps {
  approval: any;
  onActionCallback: (name: string, approval: any, params?: any) => void;
}

class ListItemActions extends Component<ListItemActionsProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired,
    onActionCallback: PropTypes.func
  };

  onActionCallbackIntl = (name: string, approval: any) => {
    const { onActionCallback } = this.props;
    if (onActionCallback != undefined) {
      onActionCallback(name, approval);
    }
  };

  render() {
    const { approval, style } = this.props;
    return (
      <View style={style.container}>
        <View style={style.containerInner}>
          <View>
            <ImageButton
              image={require("../../../../assets/icons/remove.png")}
              width={13}
              height={14}
              onPress={this.onActionCallbackIntl.bind(
                this,
                "rejected",
                approval
              )}
            />
          </View>
          <View>
            <ImageButton
              image={require("../../../../assets/icons/comment.png")}
              width={17}
              height={14}
              onPress={this.onActionCallbackIntl.bind(
                this,
                "commenting_started",
                approval
              )}
            />
          </View>
          <View>
            <ImageButton
              image={require("../../../../assets/icons/edit.png")}
              width={13}
              height={14}
              onPress={this.onActionCallbackIntl.bind(
                this,
                "editing_started",
                approval
              )}
            />
          </View>
          <View>
            <ImageButton
              image={require("../../../../assets/icons/approve.png")}
              width={13}
              height={14}
              onPress={this.onActionCallbackIntl.bind(
                this,
                "approved",
                approval
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ListItemActions);
