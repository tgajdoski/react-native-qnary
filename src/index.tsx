import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  YellowBox,
  InteractionManager
} from "react-native";

import { I18nextProvider, translate } from "react-i18next";

// globals
import configureGlobals from "./globals";

// screens
import SplashScreen from "react-native-splash-screen";

// services
import AppStackNavigator from "./screens/app-stack.navigator";
import { navigationService } from "./services";

// data (apollo)
import { ApolloProvider } from "react-apollo";
import configureClient from "./data/apollo.config";
import apolloClientAccessor from "./data/apollo-client-accessor";

// localization
import i18n from "./localization/i18n";

// themes
import { View, Root, connectStyle } from "native-base";
import { STYLE_NAME } from "./index.style";
import { StyleProviderThemed } from "./style-provider";
import PushNotificationsProvider from "./push-notifications";

YellowBox.ignoreWarnings(["[WARN]"]);
YellowBox.ignoreWarnings(["Class"]);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});

class WrappedApp extends React.Component {
  state = {
    client: null
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      configureGlobals(() => {
        configureClient(client => {
          apolloClientAccessor.setClient(client);
          this.setState({ client });
          // hide the splashscreen when the app is ready
          SplashScreen.hide();
        });
      });
    });
  }

  render() {
    const { client } = this.state;

    if (!client) {
      return null;
    }

    return (
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
          <StyleProviderThemed>
            <Root>
              <View style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <AppStackNavigator
                  ref={navigatorRef => {
                    navigationService.setContainer(navigatorRef);
                  }}
                />
                <PushNotificationsProvider />
              </View>
            </Root>
          </StyleProviderThemed>
        </ApolloProvider>
      </I18nextProvider>
    );
  }
}
// Wrapping a stack with translation hoc asserts we trigger new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedAppWithLanguage = () => (
  <WrappedApp screenProps={{ t: i18n.getFixedT() }} />
);

const ReloadAppOnLanguageChange = translate("translation", {
  bindI18n: "languageChanged",
  bindStore: false
})(WrappedAppWithLanguage);

class App extends Component<{}> {
  render() {
    return <ReloadAppOnLanguageChange props={this.props} />;
  }
}

export default connectStyle(STYLE_NAME, {})(App);
