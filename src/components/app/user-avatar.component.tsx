import React, { Component } from "react";
import { Thumbnail } from "native-base";

import * as PropTypes from "prop-types";

import { dataService } from "../../data";
import {
  logger,
  profileFunctionsService,
  socialNetworkOrderService
} from "../../services";

const defaultSize = 64;

interface UserAvatarProps {
  oid: string;
  uid: string;
  size?: number;
  source?: string;
  conn?: any;
  shape: string;
}

class UserAvatar extends Component<UserAvatarProps> {
  static propTypes = {
    oid: PropTypes.string,
    uid: PropTypes.string,
    size: PropTypes.number,
    source: PropTypes.string,
    conn: PropTypes.object,
    shape: PropTypes.string
  };
  constructor(props: UserAvatarProps) {
    super(props);

    const { oid, uid, size, source, conn, shape } = props;

    let thumbnailSize = defaultSize;
    if (size !== undefined) {
      thumbnailSize = size;
    }

    this.state = {
      oid,
      uid,
      thumbnailSize,
      source,
      conn,
      avatarSource: null,
      square: shape === "square",
      circle: shape === "circle"
    };
  }

  componentWillMount = async () => {
    const { oid, uid, source, conn } = this.state;
    try {
      this.setDefaultAvatar();
      const userAvatar = await this.getAvatar(oid, uid, source, conn);
      if (userAvatar !== null && userAvatar.length > 0) {
        this.setState({
          avatarSource: {
            uri: userAvatar
          }
        });
      }
    } catch (err) {
      logger.error(err);
    }
  };

  getAvatar = async (oid, uid, source, conn) => {
    const profileFunctions = profileFunctionsService;
    const { socialNetworkOrder } = socialNetworkOrderService;

    try {
      const {
        data: { organizationUserConnections }
      } = await dataService.getUserConnections(oid, uid);

      let userAvatar = "";
      const userConnections = organizationUserConnections;

      const l1 = socialNetworkOrder.length;
      const l2 = userConnections.length;
      let j = 0;

      if (conn) {
        userAvatar = profileFunctions.getAvatar(conn);
      } else if (source) {
        for (j = 0; j < l2; j += 1) {
          if (userConnections[j].source === source) {
            userAvatar = profileFunctions.getAvatar(userConnections[j]);
            if (userAvatar !== "") {
              break;
            }
          }
        }
      } else {
        for (let i = 0; i < l1; i += 1) {
          for (j = 0; j < l2; j += 1) {
            if (userConnections[j].source === socialNetworkOrder[i]) {
              userAvatar = profileFunctions.getAvatar(userConnections[j]);
              if (userAvatar !== "") {
                break;
              }
            }
          }
          if (userAvatar !== "") {
            break;
          }
        }
      }
      return userAvatar;
    } catch (err) {
      logger.log(err); // eslint-disable-line
    }

    return null;
  };

  onErrorLoadingAvatar = () => {
    this.setDefaultAvatar();
  };

  setDefaultAvatar = () => {
    this.setState({
      avatarSource: require("../../../assets/images/default_profile_normal.png")
    });
  };

  render = () => {
    const { avatarSource, circle, thumbnailSize } = this.state;
    if (avatarSource === null) {
      return null;
    }

    if (circle) {
      const imageStyle = {
        width: thumbnailSize,
        height: thumbnailSize,
        borderRadius: thumbnailSize / 2
      };
      return (
        <Thumbnail
          style={imageStyle}
          source={avatarSource}
          onError={this.onErrorLoadingAvatar}
        />
      );
    } else {
      const imageStyle = {
        width: thumbnailSize,
        height: thumbnailSize,
        borderRadius: 5
      };
      return (
        <Thumbnail
          style={imageStyle}
          square={true}
          source={avatarSource}
          onError={this.onErrorLoadingAvatar}
        />
      );
    }
  };
}

export default UserAvatar;
