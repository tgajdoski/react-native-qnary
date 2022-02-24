import React from "react";
import { StyleProvider } from "native-base";

import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/commonColor";

export class StyleProviderThemed extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        {this.props.children}
      </StyleProvider>
    );
  }
}
