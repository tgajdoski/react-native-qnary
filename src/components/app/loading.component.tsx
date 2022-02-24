import React from "react";
import { View, Spinner, connectStyle } from "native-base";
import { STYLE_NAME } from "./loading.component.style";

class Loading extends React.Component {
  render = () => {
    const { style } = this.props;
    return (
      <View style={style.container}>
        <Spinner size="small" color="blue" />
      </View>
    );
  };
}

export default connectStyle(STYLE_NAME, {})(Loading);
