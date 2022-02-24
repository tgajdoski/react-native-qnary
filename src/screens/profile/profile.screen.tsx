import React, { Component } from "react";
import { Text, View, List, ListItem, connectStyle, Content } from "native-base";
import { STYLE_NAME } from "./profile.screen.style";

import PropTypes from "prop-types";

import { Layout, BottomNav } from "../../components/app";
import { currentUserAccessor, withLocalization } from "../../components/hoc";

import { dataService } from "../../data";
import { logger, profileFunctionsService } from "../../services";
import NetworkIcon from "../optimize/components/network-icon.component";
import { ProfileInfo } from "./components";

@currentUserAccessor
@withLocalization
class ProfileScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  state = {
    organizationUserConnections: []
  };

  componentDidMount = async () => {
    const {
      currentUser: { oid, uid }
    } = this.props;
    try {
      const {
        data: { organizationUserConnections }
      } = await dataService.getUserConnections(oid, uid);

      this.setState({ organizationUserConnections });
    } catch (err) {
      logger.log(err);
    }
  };

  render() {
    const { t, style } = this.props;
    const { organizationUserConnections } = this.state;

    return (
      <Layout title={t("MENU:PROFILE")}>
        <Content contentContainerStyle={style.container}>
          <View style={style.containerInner}>
            <View style={style.top}>
              <ProfileInfo
                image={require("../../../assets/images/profile-picture-qnary-logo.png")}
              />
            </View>
            <View style={style.bottom}>
              {organizationUserConnections != undefined ? (
                <List style={style.list2}>
                  {organizationUserConnections.map(c => (
                    <ListItem key={c.id} style={style.list2Item}>
                      <View>
                        <View style={style.networkIconBadge}>
                          <View style={style.networkIconBadgeInner} />
                        </View>
                        <View style={style.networkIconWrapper}>
                          <NetworkIcon
                            source={c.source}
                            width={14}
                            height={14}
                          />
                        </View>
                      </View>
                      {c.source === "twitter" ? (
                        <Text style={style.connectionName}>
                          {profileFunctionsService.getFullName(c)} {"/ "}
                          {profileFunctionsService.getDisplayName(c)}
                        </Text>
                      ) : (
                        <Text style={style.connectionName}>
                          {profileFunctionsService.getFullName(c)}
                        </Text>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : null}
            </View>
          </View>
        </Content>
        <BottomNav active="" />
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ProfileScreen);
