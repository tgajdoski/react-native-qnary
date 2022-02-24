import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { userManager } from "../../data";

function currentUserAccessor(WrappedComponent: any) {
  class HOC extends React.Component {
    getCurrentUser = () => {
      const {
        localState: { currentUser }
      } = userManager.getCurrentUser();
      return currentUser;
    };

    render() {
      const currentUser = this.getCurrentUser();
      if (currentUser !== null) {
        return <WrappedComponent {...this.props} currentUser={currentUser} />;
      }
      return null;
    }
  }
  hoistNonReactStatics(HOC, WrappedComponent);
  return HOC;
}

export default currentUserAccessor;
