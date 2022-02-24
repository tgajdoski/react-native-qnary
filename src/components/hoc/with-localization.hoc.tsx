import React from "react";

import hoistNonReactStatics from "hoist-non-react-statics";

import { NamespacesConsumer } from "react-i18next";

const namespaces: string[] = [
  "LANGUAGES",
  "GENERIC",
  "MENU",
  "LOGIN",
  "NOTIFICATIONS",
  "SMS",
  "INSIGHTS",
  "CONTENT",
  "TRACK",
  "SETTINGS",
  "OPTIMIZE",
  "MESSAGE_ADMIN",
  "NETWORK_TERMS",
  "DISPLAY_NAMES",
  "SOCIAL",
  "SEARCH_RATINGS",
  "ERRORS",
  "REPORT"
];

export function withLocalization(WrappedComponent: any) {
  class HOC extends React.Component {
    renderComponent = (t: any, tf: any) => {
      const props = { ...this.props, t: tf.t };
      return <WrappedComponent {...props} />;
    };
    render() {
      return (
        <NamespacesConsumer wait={true} ns={namespaces}>
          {(t, tf) => this.renderComponent(t, tf)}
        </NamespacesConsumer>
      );
    }
  }
  hoistNonReactStatics(HOC, WrappedComponent);
  return HOC;
}

export default withLocalization;
