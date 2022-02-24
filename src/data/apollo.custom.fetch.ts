import config from "../config";

import { userManager } from "../data";

import { logger } from "../services";

import firebase from "react-native-firebase";

const customFetch = (uri: string, options: any) => {
  /* eslint-disable no-console */
  if (config.ENVIRONMENT === "dev") {
    logger.info("customFetch, uri, options", uri, options);
  }
  const originalFetch = fetch(uri, options);
  return originalFetch.then((fetchResponse: any) => {
    const { status } = fetchResponse;
    if (status === 200) {
      // the response is OK
      return fetchResponse;
    }

    if (status !== 401) {
      // ERROR response, but the token is still valid
      logger.log("Ups, we recieved an error response = ", fetchResponse);
      return fetchResponse;
    }

    // 401 the token is expired
    logger.log("fetchResponse=", fetchResponse);
    const firebaseUser = firebase.auth().currentUser;

    if (firebaseUser === null) {
      // if the firebase user is null, we cannot re-authenticate the user
      logger.log("fetchResponse firebaseUser=", firebaseUser);
      return fetchResponse;
    }

    // try to refresh the token, and call the originalFetch
    return firebaseUser
      .getIdToken(true)
      .then(idToken => {
        logger.log("fetchResponse getIdToken, ========", idToken);
        return userManager
          .updateUserToken(idToken)
          .then(() => {
            return originalFetch;
          })
          .catch((error: any) => {
            logger.error("fetchResponse getIdToken error", error);
            return fetchResponse;
          });
      })
      .catch(error => {
        logger.error("fetchResponse getIdToken error", error);
        return fetchResponse;
      });
  });
};

export default customFetch;
