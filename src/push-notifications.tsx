import React from "react";

import { PushNotificationIOS, AsyncStorage } from "react-native";

import Analytics from "@aws-amplify/analytics";
import PushNotification from "@aws-amplify/pushnotification";
import awsconfig from "../aws-exports";

import { logger } from "./services";

class PushNotificationsProvider extends React.Component {
  componentDidMount = () => {
    Analytics.configure(awsconfig);
    PushNotification.configure(awsconfig);

    PushNotification.onNotification((notification: any) => {
      logger.log("in app notification", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    });

    // get the registration token
    PushNotification.onRegister((token: any) => {
      logger.log("in app registration", token);
      AsyncStorage.setItem("registrationToken", token);
      // this.setState({ deviceToken: token });
    });
  };

  render() {
    return null;
  }
}

export default PushNotificationsProvider;
