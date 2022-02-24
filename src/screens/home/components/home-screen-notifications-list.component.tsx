import React from "react";
import { FlatList } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./home-screen-notifications-list.component.style";

import * as PropTypes from "prop-types";

import Swipeout from "react-native-swipeout";

import HomeScreenNotification from "./home-screen-notification.component";
import appLayout from "../../../constants/app-layout";

const { width } = appLayout.window;

interface HomeScreenNotificationsListProps {
  notifications: any[];
  onRemove?: (notification: any) => void;
}

class HomeScreenNotificationsList extends React.Component<
  HomeScreenNotificationsListProps
> {
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };
  static navigationOptions = {
    header: null
  };
  state = {
    scrollEnabled: true,
    activeRowKey: null
  };

  onNotificationClick = (notificaition: any) => {
    return null;
  };

  render() {
    const { style, onRemove, notifications } = this.props;

    const renderSeparator = () => <View style={style.separator} />;

    const renderItem = ({ item: rowData, index }) => {
      const notificationItemStyle = {
        width: notifications.length > 1 ? width - 65 : width
      };
      return (
        <Swipeout
          sectionId={1}
          autoClose={true}
          onOpen={(secId, rowId, direction) => {
            this.setState({ activeRowKey: rowId });
          }}
          onClose={(rowId, direction) => {
            if (rowId === this.state.activeRowKey) {
              this.setState({
                activeRowKey: null
              });
            }
          }}
          right={[
            {
              text: "Delete",
              type: "delete",
              onPress: (notification: any) => {
                console.log("this.state.activeRowKey", this.state.activeRowKey);
                if (onRemove != undefined) {
                  onRemove(notification);
                }
              }
            }
          ]}
          scroll={scrollEnabled => {
            this.setState({ scrollEnabled });
          }}
          rowID={index}
        >
          <View style={notificationItemStyle}>
            <HomeScreenNotification
              notification={rowData}
              onPress={this.onNotificationClick}
            />
          </View>
        </Swipeout>
      );
    };

    return (
      <FlatList
        scrollEnabled={this.state.scrollEnabled}
        horizontal={true}
        data={notifications}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HomeScreenNotificationsList);
