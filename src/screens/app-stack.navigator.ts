import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import {
  LoginScreen,
  ForgotPasswordScreen,
  LogoutScreen,
  AuthLoadingScreen
} from ".";

import { HomeScreen } from "./home";

import {
  WelcomeScreen,
  ChangePasswordScreen,
  NotificationsScreen,
  SmsScreen
} from "./onboarding";

import { DigitalFootprintScreen } from "./optimize";

import { FeedScreen } from "./insights";

import { ContentScreen } from "./approvals";

import { ProfileScreen } from "./profile";

import { ReportScreen } from "./reports";

import {
  SettingsScreen,
  ContactAdminScreen,
  ChangeEmailScreen
} from "./settings";

const OnBoardingStack = {
  screen: createSwitchNavigator(
    {
      WelcomeScreen: { screen: WelcomeScreen },
      ChangePasswordScreen: { screen: ChangePasswordScreen },
      NotificationsScreen: { screen: NotificationsScreen },
      SmsScreen: { screen: SmsScreen },
      DigitalFootprintScreen: { screen: DigitalFootprintScreen }
    },
    {
      initialRouteName: "WelcomeScreen"
    }
  ),
  navigationOptions: {
    header: null
  }
};

const AppStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    ContentScreen: { screen: ContentScreen },

    FeedScreen: { screen: FeedScreen },
    DigitalFootprintScreen: { screen: DigitalFootprintScreen },

    ContactAdminScreen: { screen: ContactAdminScreen },
    ChangeEmailScreen: { screen: ChangeEmailScreen },
    ChangePasswordScreen: { screen: ChangePasswordScreen },

    LogoutScreen: { screen: LogoutScreen },
    ProfileScreen: { screen: ProfileScreen },
    ReportScreen: { screen: ReportScreen },
    SettingsScreen: { screen: SettingsScreen },
    SmsScreen: { screen: SmsScreen }
  },
  {
    initialRouteName: "ContentScreen"
  }
);

const MainSwitch = createSwitchNavigator({
  OnBoardingScreen: OnBoardingStack,
  App: AppStack
});

const AppStackNavigator = createSwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    AuthLoading: AuthLoadingScreen,
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    Main: MainSwitch
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default AppStackNavigator;
