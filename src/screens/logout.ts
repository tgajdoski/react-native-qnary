import { AsyncStorage } from "react-native";

import firebase from "react-native-firebase";

import { logger, navigationService } from "../services";

const logout = async () => {
  try {
    logger.log("logout");
    await firebase.auth().signOut();
    await AsyncStorage.clear();
  } catch (err) {
    logger.error(err);
  } finally {
    navigationService.navigate("LoginScreen", {});
  }
};

export default logout;
