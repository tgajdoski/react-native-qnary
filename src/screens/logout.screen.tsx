import React from "react";

import logout from "./logout";

class LogoutScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    await logout();
  };

  render() {
    return null;
  }
}

export default LogoutScreen;
