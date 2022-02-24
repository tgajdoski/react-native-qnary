import apolloClientAccessor from "./apollo-client-accessor";
import dataService from "./data.service";

import getCurrentUserQuery from "./queries/get-current-user.query";
import updateCurrentUserQuery from "./mutations/update-current-user.mutation";

import getUserTokenQuery from "./queries/get-user-token.query";
import updateUserTokenQuery from "./mutations/update-user-token.mutation";
import logger from "../services/logger.service";

import firebase from "react-native-firebase";

const userManager = {
  getUserToken: () => {
    const query = getUserTokenQuery;
    const client = apolloClientAccessor.getClient();
    return client.readQuery({
      query
    });
  },
  updateUserToken: (token: string) => {
    const mutation = updateUserTokenQuery;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        token
      },
      mutation
    });
  },
  getCurrentUser: () => {
    const query = getCurrentUserQuery;
    const client = apolloClientAccessor.getClient();
    return client.readQuery({
      query
    });
  },
  updateCurrentUser: (user: any) => {
    const mutation = updateCurrentUserQuery;
    const client = apolloClientAccessor.getClient();

    return client.mutate({
      variables: {
        user
      },
      mutation
    });
  },
  login: async (email: string, password: string) => {
    const response = {
      isSuccess: false,
      error: ""
    };

    let firebaseResponse;
    try {
      firebaseResponse = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      logger.error(err);
      if (err.code !== null) {
        switch (err.code) {
          case "auth/user-not-found":
            response.error = "ERRORS:INVALID_USER";
            return response;
          case "auth/wrong-password":
            response.error = "ERRORS:INVALID_PASSWORD";
            return response;
        }
      }
      // TODO: catch firebase errors like user not found
      response.error = "ERRORS:DEFAULT";
      return response;
    }

    const { user } = firebaseResponse;
    logger.log("USER=", user);

    const token = await user.getIdToken();

    if (token === null || token === undefined) {
      response.isSuccess = false;
      response.error = "ERRORS:DEFAULT";
      return response;
    }

    const uid = user.uid;

    try {
      // update user token (local storage)
      await userManager.updateUserToken(token);

      // update user details (local storage)
      logger.log("getUserDetails(uid)", uid);
      const userDetailsResponse = await dataService.getUserDetails(uid);
      const { organizationuser } = userDetailsResponse.data.userdetails;

      logger.log("organizationuser=", organizationuser);

      if (
        organizationuser === null ||
        organizationuser.oid === undefined ||
        organizationuser.oid === null
      ) {
        // server response is too bad, the program cannot continue
        response.isSuccess = false;
        response.error = "ERRORS:DEFAULT";
        return response;
      }

      await userManager.updateCurrentUser(organizationuser);
      response.isSuccess = true;
      return response;
    } catch (err) {
      logger.error(err);
      response.error = "ERRORS:DEFAULT";
      return response;
    }
  },
  refresh: async () => {
    const {
      localState: { currentUser }
    } = userManager.getCurrentUser();
    const { uid } = currentUser;
    // update user details (local storage)
    const userDetailsResponse = await dataService.getUserDetails(uid);
    const { organizationuser } = userDetailsResponse.data.userdetails;
    await userManager.updateCurrentUser(organizationuser);
  },
  refreshToken: async (firebaseUser: any) => {
    const idToken: string = await firebaseUser.getIdToken(true);

    await userManager.updateUserToken(idToken);

    const uid = firebaseUser.uid;

    // update user details (local storage)
    const userDetailsResponse = await dataService.getUserDetails(uid);
    const { organizationuser } = userDetailsResponse.data.userdetails;
    await userManager.updateCurrentUser(organizationuser);
  }
};

export default userManager;
