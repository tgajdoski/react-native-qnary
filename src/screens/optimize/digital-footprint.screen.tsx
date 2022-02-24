import React from "react";

import { Image, ScrollView } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./digital-footprint.screen.style";

import PropTypes from "prop-types";

import {
  Layout3,
  WizardNavigation,
  ScreenFooterClassic,
  ScreenTitle
} from "../../components/onboarding";

import { navigationService } from "../../services";

import { Connect } from "./components";
import { withLocalization } from "../../components/hoc";

interface DigitalFootprintScreenProps {
  t: any;
  style: any;
}

@withLocalization
class DigitalFootprintScreen extends React.Component<
  DigitalFootprintScreenProps
> {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  nextScreen = "ContentScreen";

  onNextButtonClick = async () => {
    this.navigateToNextScreen();
  };

  onSkipButtonClick = async () => {
    this.navigateToNextScreen();
  };

  isBoarding = () => {
    const { navigation } = this.props;
    const onboarding = navigation.getParam("onboarding", undefined);
    return onboarding;
  };

  navigateToNextScreen = () => {
    if (this.isBoarding()) {
      navigationService.navigate(this.nextScreen, {
        onboarding: true
      });
    } else {
      // navigationService.navigate("SettingsScreen", {});
      const { navigation } = this.props;
      const { goBack } = navigation;
      goBack();
    }
  };
  render() {
    const { t, style } = this.props;
    const renderFooter = () => {
      return this.isBoarding() ? (
        <WizardNavigation
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          step={4}
          steps={4}
          enabled={true}
        />
      ) : (
        <ScreenFooterClassic
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          enabled={true}
        />
      );
    };
    return (
      <Layout3
        gradiendColors={["#FDDE48", "#FDDE48"]}
        footerContent={renderFooter()}
        fixedFooter={true}
      >
        <ScrollView>
          <View style={style.container}>
            <View style={style.headerContainer}>
              <Image
                source={require("../../../assets/images/onboarding/connect-social-channels.png")}
              />
              <View style={style.titleContainer}>
                <ScreenTitle
                  color={"#fff"}
                  title={t("OPTIMIZE:CONNECT:CONNECT_SOCIAL_CHANNELS")}
                />
              </View>
            </View>
            <View style={style.contentContainer}>
              <Connect />
            </View>
          </View>
        </ScrollView>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(DigitalFootprintScreen);
