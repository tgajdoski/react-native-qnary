import React from "react";
import { View } from "native-base";
import DeviceInfo from "react-native-device-info";
import PropTypes from "prop-types";

import { dataService } from "../../../data";
import { logger } from "../../../services";

import { currentUserAccessor } from "../../../components/hoc";
import { AsyncStorage } from "@aws-amplify/core";

@currentUserAccessor
class AllowNotifications extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    onRef: PropTypes.func
  };
  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  allowNotifications = async () => {
    const { currentUser } = this.props;

    const model = DeviceInfo.getModel();
    const uniqueId = DeviceInfo.getUniqueID();
    const platform = DeviceInfo.getSystemName();
    const version = DeviceInfo.getSystemVersion();
    const manufacturer = DeviceInfo.getManufacturer();
    const serialnum = DeviceInfo.getSerialNumber();

    const notification = {
      app: "qnary",
      token: uniqueId,
      platform: platform.toLowerCase(),
      uid: currentUser.uid,
      status: 1,
      device: {}
    };

    const device = {
      id: uniqueId, // + deviceId,
      available: true,
      cordova: "react-native",
      isVirtual: false,
      manufacturer,
      model,
      platform,
      serial: serialnum,
      uuid: uniqueId,
      version
    };

    const refToken = await AsyncStorage.getItem("registrationToken");
    logger.log("refToken", refToken);
    notification.token = refToken;
    notification.device = device;

    logger.log("notification: ", JSON.stringify(notification));

    return dataService.allowNotifications(notification, currentUser.oid);
  };

  render() {
    return <View />;
  }
}

export default AllowNotifications;
