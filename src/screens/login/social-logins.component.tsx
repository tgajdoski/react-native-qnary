import React, { Component } from "react";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./social-logins.component.style";

import { withLocalization } from "../../components/hoc";
import NetworkIcon from "../optimize/components/network-icon.component";

@withLocalization
class SocialLogins extends Component {
  render() {
    const { style } = this.props;
    return (
      <View style={style.container}>
        <View style={style.innerContainer1}>
          <View style={style.horizontalLine} />
          <View style={style.oRcontainer}>
            <Text style={style.text}>OR</Text>
          </View>
          <View style={style.horizontalLine} />
        </View>
        <View style={style.innerContainer2}>
          <Text style={style.text}>Create new account using:</Text>
        </View>
        <View style={style.innerContainer3}>
          <View style={style.innerContainer31}>
            <View style={style.innerContainer32}>
              <View>
                <NetworkIcon source="facebook" width={23} height={23} />
              </View>
              <View style={style.verticalLine}>
                <Text />
              </View>
              <View>
                <NetworkIcon source="linkedin" width={23} height={23} />
              </View>
              <View style={style.verticalLine}>
                <Text />
              </View>
              <View>
                <NetworkIcon source="twitter" width={23} height={23} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SocialLogins);
