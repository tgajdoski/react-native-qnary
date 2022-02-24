import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./home-screen-notification.component.style";

import * as PropTypes from "prop-types";
import renderIf from "render-if";
import { ImageButton } from "../../../components/app";

interface HomeScreenNotificationProps {
  notification: any;
  onPress: (notification: any) => void;
}

class HomeScreenNotification extends React.Component<
  HomeScreenNotificationProps
> {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };
  static navigationOptions = {
    header: null
  };

  render() {
    const { style, notification, onPress } = this.props;

    const getNotificationIcon = () => {
      switch (notification.type) {
        case "new_followers":
          return require("../../../../assets/images/home/new-followers-icon.png");
        case "reconnect":
          return require("../../../../assets/images/home/reconnect.png");
        case "all_done":
          return require("../../../../assets/images/home/done.png");
        default:
          return null;
      }
    };

    const notificationIcon = getNotificationIcon();

    return (
      <View style={style.container}>
        <View style={style.containerInner}>
          <View style={style.imageContainer}>
            {renderIf(notificationIcon !== null)(
              <View style={style.imageBackground}>
                <View style={style.imageButtonWrapper}>
                  <ImageButton
                    onPress={onPress}
                    image={notificationIcon}
                    width={25}
                    height={25}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={style.contentContainer}>
            <TouchableOpacity onPress={onPress}>
              <Text style={style.title}>{notification.title}</Text>
              <Text style={style.description}>{notification.description}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HomeScreenNotification);
