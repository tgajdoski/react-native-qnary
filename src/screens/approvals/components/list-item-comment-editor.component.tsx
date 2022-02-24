import React, { Component } from "react";
import {
  View,
  Item,
  Left,
  Right,
  Textarea,
  Form,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./list-item-comment-editor.component.style";

import PropTypes from "prop-types";
import { withLocalization } from "../../../components/hoc";
import { Button } from "../../../components/onboarding";

import { AnimatedView } from "../../../components/app";

interface ListItemCommentEditorProps {
  approval: any;
  onActionCallback: (name: string, approval: any, params?: any) => void;
}

@withLocalization
class ListItemCommentEditor extends Component<ListItemCommentEditorProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired,
    onActionCallback: PropTypes.func
  };

  textInputRef: any = null;

  constructor(props: ListItemCommentEditorProps) {
    super(props);

    const { approval } = this.props;

    const comment = approval.comment || "";

    this.state = {
      isFormValid: false,
      comment
    };
  }

  updateComment = (comment: string) => {
    this.setState({ comment });
    this.setState({ isFormValid: comment !== null && comment.length > 0 });
  };

  setFocusInput() {
    if (this.textInputRef !== null) {
      this.textInputRef._root.focus();
    }
  }

  componentDidMount() {
    this.setFocusInput();
  }

  onActionCallbackIntl = (name: string) => {
    const { comment } = this.state;
    const { approval, onActionCallback } = this.props;
    if (onActionCallback !== undefined) {
      onActionCallback(name, approval, {
        comment
      });
    }
  };

  onCommentEditingFinished = () => {
    const { comment, isFormValid } = this.state;
    if (!isFormValid) {
      return;
    }

    const { approval, onActionCallback } = this.props;

    if (onActionCallback !== undefined) {
      onActionCallback("commenting_finished", approval, {
        comment
      });
    }
  };

  render() {
    const { t, style } = this.props;
    const { comment, isFormValid } = this.state;

    const renderCommentEditor = () => {
      return (
        <Textarea
          ref={ref => {
            this.textInputRef = ref;
          }}
          rowSpan={10}
          value={comment}
          style={style.textarea}
          onChangeText={this.updateComment}
        />
      );
    };

    return (
      <AnimatedView nonUsedAreaHeight={160}>
        <Form>
          <View>{renderCommentEditor()}</View>
          <Item style={style.item}>
            <Left style={style.left}>
              <Button
                onPress={this.onActionCallbackIntl.bind(this, "cancel")}
                title={t("GENERIC:CANCEL")}
                gradientColors={["#fff", "#fff"]}
                color={"#414141"}
              />
            </Left>
            <Right style={style.right}>
              <Button
                onPress={this.onCommentEditingFinished}
                disabled={!isFormValid}
                title={t("GENERIC:OKAY")}
              />
            </Right>
          </Item>
        </Form>
      </AnimatedView>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ListItemCommentEditor);
