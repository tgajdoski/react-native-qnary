import React, { Component } from "react";
import { View, Text, Left, Right, Item, connectStyle } from "native-base";
import { STYLE_NAME } from "./list-item-header.component.style";

import * as PropTypes from "prop-types";

import NetworkIcon from "../../optimize/components/network-icon.component";

import { UserAvatar } from "../../../components/app";

import { withLocalization } from "../../../components/hoc";

import {
  profileFunctionsService,
  localizationHelper,
  logger
} from "../../../services";

import { dataService } from "../../../data";
import renderIf from "render-if";

interface ListItemHeaderProps {
  approval: any;
  currentUser: any;
}

@withLocalization
class ListItemHeader extends Component<ListItemHeaderProps> {
  static propTypes = {
    approval: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  state = {
    connection: null,
    loaded: false
  };

  componentDidMount = async () => {
    const { approval } = this.props;

    try {
      if (approval.connection_id !== null) {
        const {
          data: { getConnection }
        } = await dataService.getConnection(approval.connection_id);
        this.setState({ connection: getConnection });
      } else {
        this.setState({ connection: null });
      }
    } catch (err) {
      logger.log(err);
    } finally {
      this.setState({ loaded: true });
    }
  };

  renderUserConnection = () => {
    const {
      t,
      style,
      approval,
      currentUser: { oid, uid }
    } = this.props;

    const { connection, loaded } = this.state;

    const { source } = approval;

    return (
      <View style={style.connectionContainer}>
        <View style={style.connectionContainerInner}>
          {renderIf(connection !== null && loaded)(
            <UserAvatar
              shape="circle"
              conn={connection}
              oid={oid}
              uid={uid}
              size={32}
            />
          )}
          {renderIf(connection === null)(
            <UserAvatar
              shape="circle"
              source={source}
              oid={oid}
              uid={uid}
              size={32}
            />
          )}
        </View>
        {renderIf(connection !== null && loaded)(
          <View style={style.headerContainer}>
            <Text style={style.fullName}>
              {profileFunctionsService.getFullName(connection)}
            </Text>
            <Text style={style.displayName}>
              {profileFunctionsService.getDisplayName(connection)}
            </Text>
          </View>
        )}
        {renderIf(connection === null && loaded)(
          <View style={style.headerContainer}>
            <Text style={style.fullName}>{t("CONTENT:NO_CONNECTION")}</Text>
            <Text style={style.displayName}>
              {localizationHelper.networkName(t, source)}
            </Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    const { style, approval } = this.props;
    return (
      <Item style={style.item}>
        <Left>{this.renderUserConnection()}</Left>
        <Right style={style.right}>
          <NetworkIcon source={approval.source} width={23} height={23} />
        </Right>
      </Item>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ListItemHeader);
