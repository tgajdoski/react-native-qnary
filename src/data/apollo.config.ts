import { AsyncStorage } from "react-native";

import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
// import { createPersistedQueryLink } from "apollo-link-persisted-queries";

import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject
} from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";

import config from "../config";
import defaults from "./defaults";
import resolvers from "./resolvers";
import userManager from "./user-manager";
import customFetch from "./apollo.custom.fetch";

import { logger, navigationService } from "../services";
import introspectionQueryResultData from "./fragmentTypes.json";

const SCHEMA_VERSION = "0.0.7";
const SCHEMA_VERSION_KEY = "apollo-schema-version";

async function configureClient(onComplete: (apolloClient: any) => void) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  // Set up Cache
  const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: object => {
      switch (object.__typename) {
        case "Profile":
          return `${object.id}_${object.alias}`; // use `id`  and `alias` as the primary key
        default:
          return defaultDataIdFromObject(object); // fall back to default handling
      }
    }
  });

  const stateLink = withClientState({ cache, resolvers, defaults });

  const contextLink = setContext((_, { headers }) => {
    try {
      const { localState } = userManager.getUserToken();
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${localState.token}`
          // Authentication: `${localState.token}`
        }
      };
    } catch (err) {
      // https://github.com/apollographql/apollo-client/issues/1542
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (
      networkError &&
      networkError.statusCode !== undefined &&
      networkError.statusCode === 401
    ) {
      logger.log(`[Network error]: ${networkError}`);
      setTimeout(() => {
        navigationService.navigate("LoginScreen", {});
      }, 1);
      return;
    }

    if (graphQLErrors) {
      let isUnauthorized = false;
      graphQLErrors.map(({ message, locations, path }) => {
        logger.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        if (message === "Unauthorized request") {
          isUnauthorized = true;
        }
      });

      if (isUnauthorized) {
        setTimeout(() => {
          navigationService.navigate("LoginScreen", {});
        }, 1);
        return;
      }
    }

    if (networkError) {
      logger.log(`[Network error]: ${networkError}`);
    }
  });

  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage,
    trigger: "background",
    debug: true
  });

  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore();
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge();
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  const httpLink = createHttpLink({
    uri: `${config.API_URL}`,
    fetch: customFetch
  });

  //  const pLink = createPersistedQueryLink().concat(httpLink);

  const link = ApolloLink.from([errorLink, stateLink, contextLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache
  });

  onComplete(client);
}

export default configureClient;
