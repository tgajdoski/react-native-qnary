import React from "react";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./home.screen.style";

import * as PropTypes from "prop-types";

import { Logo } from "../../components/onboarding";
import { HomeScreenLayout } from "../../components/app";
import { HomeScreenButton, HomeScreenNotificationsList } from "./components";
import { navigationService } from "../../services";
import { withLocalization, currentUserAccessor } from "../../components/hoc";

@currentUserAccessor
@withLocalization
class HomeScreen extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  state = {
    notifications: [
      {
        id: 1,
        type: "new_followers",
        title: "55 New followers",
        description: "in the past week"
      },
      {
        id: 2,
        type: "reconnect",
        title: "Reconnect Twitter account.",
        description: ""
      },
      {
        id: 3,
        type: "all_done",
        title: "You are all caught up.",
        description: "Check back later for new updates."
      }
    ]
  };

  navigateTo = (screenName: string) => {
    navigationService.navigate(screenName, {});
  };

  render() {
    const { t, style } = this.props;
    const {
      currentUser: { profile }
    } = this.props;

    const name = profile.firstName || profile.lastName || profile.name;

    const { notifications } = this.state;

    return (
      <HomeScreenLayout gradientColors={["#3A7BD5", "#3A7BD5"]}>
        <View style={style.container}>
          <View style={style.logoContainer}>
            <Logo />
          </View>

          <View style={style.topContainer}>
            <Text style={style.title}>Welcome back, {name + "!"}</Text>
            <View style={style.notificationsContainer}>
              <HomeScreenNotificationsList notifications={notifications} />
            </View>
          </View>

          <View style={style.bottomContainer}>
            <View style={style.buttonsContainer}>
              <View>
                <HomeScreenButton
                  title="Contact Admin"
                  icon={require("../../../assets/images/home/contact-admin.png")}
                  onPress={this.navigateTo.bind(this, "ContactAdminScreen")}
                />
              </View>
              <View>
                <HomeScreenButton
                  title="Connect Social"
                  icon={require("../../../assets/images/home/connect-social.png")}
                  onPress={this.navigateTo.bind(this, "DigitalFootprintScreen")}
                />
              </View>
              <View>
                <HomeScreenButton
                  title="Review Content"
                  icon={require("../../../assets/images/home/review-content.png")}
                  onPress={this.navigateTo.bind(this, "ContentScreen")}
                />
              </View>
            </View>
            <View style={style.buttonsContainer}>
              <View>
                <HomeScreenButton
                  title="Settings"
                  icon={require("../../../assets/images/home/settings.png")}
                  onPress={this.navigateTo.bind(this, "SettingsScreen")}
                />
              </View>
              <View>
                <HomeScreenButton
                  title="Analytics"
                  icon={require("../../../assets/images/home/analitycs.png")}
                  onPress={this.navigateTo.bind(this, "ReportScreen")}
                />
              </View>
              <View>
                <HomeScreenButton
                  title="Feed"
                  icon={require("../../../assets/images/home/feed.png")}
                  onPress={this.navigateTo.bind(this, "FeedScreen")}
                />
              </View>
            </View>
          </View>
        </View>
      </HomeScreenLayout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HomeScreen);
