import React from "react";

import firebase from "react-native-firebase";

import { userManager } from "../data";
import { logger } from "../services";

class AuthLoadingScreen extends React.Component {
  unsubscriber: any = null;
  constructor(props: any) {
    super(props);
    this.bootstrap();
    this.unsubscriber = null;
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrap = () => {
    logger.log("AuthLoadingScreen bootstrap");
    try {
      this.unsubscriber = firebase
        .auth()
        .onAuthStateChanged((firebaseUser: any) => {
          logger.log("AuthLoadingScreen onAuthStateChanged", firebaseUser);
          if (firebaseUser) {
            // refresh token and set it to localState to currentUser
            userManager.refreshToken(firebaseUser).then(
              () => {
                this.navigateTo("ContentScreen");
              },
              (error: any) => {
                logger.log("AuthLoadingScreen Can't refresh token ", error);
                this.navigateTo("LoginScreen");
              }
            );
          } else {
            this.navigateTo("LoginScreen");
          }
        });
    } catch (err) {
      logger.error(err);
      this.navigateTo("LoginScreen");
    }
  };

  navigateTo = (screen: string) => {
    this.props.navigation.navigate(screen, {});
  };

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return null;
  }
}

export default AuthLoadingScreen;
