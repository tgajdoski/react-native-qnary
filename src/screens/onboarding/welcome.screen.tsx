import React from "react";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./welcome.screen.style";

import PropTypes from "prop-types";

import {
  Layout3,
  Button,
  ScreenTitle,
  ScreenDescription
} from "../../components/onboarding";

import { navigationService } from "../../services";
import { withLocalization, currentUserAccessor } from "../../components/hoc";

interface WelcomeScreenProps {
  t: any;
  style: any;
  currentUser: any;
}

@currentUserAccessor
@withLocalization
class WelcomeScreen extends React.Component<WelcomeScreenProps> {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  nextScreen = "ChangePasswordScreen";

  onNextButtonClick = async () => {
    navigationService.navigate(this.nextScreen, {
      onboarding: true
    });
  };

  render() {
    const { t, style } = this.props;
    const {
      currentUser: { profile }
    } = this.props;

    const name = profile.name || `${profile.firstName} ${profile.lastName}`;

    return (
      <Layout3>
        <View style={style.container}>
          <View style={style.headerContainer}>
            <View style={style.titleContainer}>
              <ScreenTitle title={`${t("WELCOME:HI")} ${name}, `} />
            </View>
            <View style={style.descriptionContainer}>
              <ScreenDescription
                color={"#FFFFFF"}
                description={t("WELCOME:INFO")}
              />
            </View>
          </View>
          <View style={style.contentContainer}>
            <Button
              gradientColors={["#FFFFFF", "#FFFFFF"]}
              color={"#0076CC"}
              title={t("WELCOME:LETS_START")}
              onPress={this.onNextButtonClick}
            />
          </View>
        </View>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(WelcomeScreen);
