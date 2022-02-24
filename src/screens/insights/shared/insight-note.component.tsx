import React from "react";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-note.component.style";
import PropTypes from "prop-types";
import HTML from "react-native-render-html";

interface InsightNoteProps {
  note: string;
}

class InsightNote extends React.PureComponent<InsightNoteProps> {
  static propTypes = {
    note: PropTypes.string.isRequired
  };
  render() {
    const { note, style } = this.props;
    return (
      <View>
        <HTML tagsStyles={style.tagsStyles} html={`<p>${note}</p>`} />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(InsightNote);
