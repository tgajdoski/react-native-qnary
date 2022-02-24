import React, { Component } from "react";
import { Image } from "react-native";
import { Text, View, List, ListItem, connectStyle } from "native-base";
import { STYLE_NAME } from "./profile-info.component.style";

import PropTypes from "prop-types";

import { UserAvatar } from "../../../components/app";
import { currentUserAccessor } from "../../../components/hoc";

import { dataService } from "../../../data";
import { logger } from "../../../services";

@currentUserAccessor
class ProfileInfo extends Component {
  static propTypes = {
    t: PropTypes.func,
    image: PropTypes.number,
    imageStyle: PropTypes.object,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  state = {
    profileInfo: {
      name: "",
      company: "",
      email: "",
      phone: ""
    }
  };

  componentDidMount = async () => {
    const {
      currentUser: { oid, uid, email, profile, settings }
    } = this.props;

    const { profileInfo } = this.state;

    try {
      const {
        sms: {
          phone_details: { formatedNumber }
        }
      } = settings;

      if (formatedNumber != undefined) {
        profileInfo.phone = formatedNumber;
      }
    } catch (err) {
      logger.log(err);
    }

    profileInfo.name = `${profile.firstName} ${profile.lastName}`;
    profileInfo.email = email;

    try {
      const {
        data: { organizationUserConnections }
      } = await dataService.getUserConnections(oid, uid);

      this.setState({ organizationUserConnections });
    } catch (err) {
      logger.log(err);
    }

    this.setState({
      profileInfo
    });
  };

  render() {
    const {
      t,
      image,
      imageStyle,
      currentUser: { oid, uid },
      style
    } = this.props;
    const { profileInfo } = this.state;

    const profileName = () => {
      if (profileInfo.company.length > 0) {
        return profileInfo.name + ", " + profileInfo.company;
      }
      return profileInfo.name;
    };

    let userProfileQnaryLogoStyle = { ...style.userProfileQnaryLogo };
    if (imageStyle != undefined) {
      userProfileQnaryLogoStyle = {
        ...imageStyle
      };
    }

    return (
      <View style={style.container}>
        <View style={style.userProfileAvartar}>
          <View style={style.userProfileAvatarContent}>
            <UserAvatar oid={oid} uid={uid} shape="circle" size={96} />
            <View style={style.userProfileAvatarBadge}>
              <Image
                resizeMode="contain"
                style={userProfileQnaryLogoStyle}
                source={
                  image ||
                  require("../../../../assets/images/profile-picture-qnary-logo.png")
                }
              />
            </View>
          </View>
        </View>
        <List style={style.list1}>
          <ListItem style={style.list1Item}>
            <Text style={style.profileName}>{profileName()}</Text>
          </ListItem>
          <ListItem style={style.list1Item1}>
            <Text style={style.email}>{profileInfo.email}</Text>
          </ListItem>
          <ListItem style={style.list1Item1}>
            <Text style={style.email}>{profileInfo.phone}</Text>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ProfileInfo);
