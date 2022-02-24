import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./language-picker-link.component.style";

import { withLocalization } from "../../components/hoc";
import LanguagePicker from "./language-picker.component";
import { Label } from "../../components/onboarding";

@withLocalization
class LanguagePickerLink extends Component {
  updateLanguagePickerRef = (ref: any) => {
    this.languagePicker = ref;
  };

  openLanguagePicker = () => {
    this.languagePicker.open();
  };

  render() {
    const { t, style } = this.props;
    return (
      <View style={style.container}>
        <LanguagePicker onRef={this.updateLanguagePickerRef} />
        <TouchableOpacity onPress={this.openLanguagePicker}>
          <View style={style.innerContainer}>
            <View>
              <Image
                source={require("../../../assets/images/onboarding/language1.png")}
              />
            </View>
            <View style={style.textWrapper}>
              <Label title={t("SETTINGS:CHOOSE_LANGUAGE")} />
            </View>
            <View>
              <Image
                source={require("../../../assets/images/onboarding/language2.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(LanguagePickerLink);
