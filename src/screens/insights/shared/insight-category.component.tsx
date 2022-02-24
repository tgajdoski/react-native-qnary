import React from "react";

import { Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-category.component.style";

import PropTypes from "prop-types";

interface InsightCategoryProps {
  name: string;
}

class InsightCategory extends React.PureComponent<InsightCategoryProps> {
  static propTypes = {
    name: PropTypes.string.isRequired
  };
  render() {
    const { name, style } = this.props;
    return <Text style={style.text}>{name}</Text>;
  }
}

export default connectStyle(STYLE_NAME, {})(InsightCategory);
