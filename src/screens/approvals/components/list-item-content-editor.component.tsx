import React, { Component } from "react";
import {
  View,
  Text,
  Textarea,
  Item,
  Left,
  Right,
  Form,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./list-item-content-editor.component.style";

import PropTypes from "prop-types";

import { approvalsService } from "../../../services";
import { withLocalization } from "../../../components/hoc";
import { Button } from "../../../components/onboarding";
import { AnimatedView } from "../../../components/app";

interface ListItemContentEditorProps {
  approval: any;
  onActionCallback: (name: string, approval: any, params?: any) => void;
}

@withLocalization
class ListItemContentEditor extends Component<ListItemContentEditorProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired,
    onActionCallback: PropTypes.func
  };

  textInputRef: any = null;

  constructor(props: ListItemContentEditorProps) {
    super(props);

    const { approval } = this.props;

    const postType = approvalsService.getPostType(approval);
    const source = approval.source;

    let content = approval.content;
    if (approval.edited_content !== undefined) {
      content = approval.edited_content;
    }

    const charsRemaining = approvalsService.charsRemaining(
      source,
      postType,
      content
    );

    this.state = {
      isFormValid:
        charsRemaining === null ||
        (charsRemaining !== null && charsRemaining > 0),
      source,
      content,
      postType,
      charsRemaining
    };
  }

  updateContent = (content: string) => {
    const { source, postType } = this.state;
    const charsRemaining = approvalsService.charsRemaining(
      source,
      postType,
      content
    );

    this.setState({ charsRemaining });
    this.setState({
      isFormValid:
        charsRemaining === null ||
        (charsRemaining !== null && charsRemaining > 0)
    });

    this.setState({ content });
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
    const { approval, onActionCallback } = this.props;
    const { content } = this.state;
    if (onActionCallback !== undefined) {
      onActionCallback(name, approval, {
        content
      });
    }
  };

  onContentEditingFinished = () => {
    const { content, isFormValid } = this.state;
    if (!isFormValid) {
      return;
    }

    const { approval, onActionCallback } = this.props;

    if (onActionCallback !== undefined) {
      onActionCallback("editing_finished", approval, {
        content
      });
    }
  };

  render() {
    const { t, style } = this.props;
    const { content, postType, charsRemaining, isFormValid } = this.state;

    const renderContentEditor = () => {
      if (content === null) {
        return null;
      }
      return (
        <Textarea
          ref={ref => {
            this.textInputRef = ref;
          }}
          value={content}
          style={style.textarea}
          onChangeText={this.updateContent}
        />
      );
    };

    const renderCharacterCounter = () => {
      if (charsRemaining !== null && postType !== null) {
        const conterTextStyle = {
          fontSize: 10,
          color: charsRemaining <= 10 ? "red" : "#000"
        };
        return (
          <View style={style.counterContainer}>
            <Text style={conterTextStyle}>
              {`${charsRemaining}/${postType.postTypeCharLimit}`}
            </Text>
          </View>
        );
      }
      return null;
    };

    return (
      <AnimatedView nonUsedAreaHeight={190}>
        <Form>
          <View>{renderContentEditor()}</View>
          <View>{renderCharacterCounter()}</View>

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
                onPress={this.onContentEditingFinished}
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

export default connectStyle(STYLE_NAME, {})(ListItemContentEditor);
