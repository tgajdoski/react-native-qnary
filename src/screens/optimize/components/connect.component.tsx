import React from "react";
import { FlatList } from "react-native";
import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./connect.component.style";

import PropTypes from "prop-types";
import Deferred from "es6-deferred";
import _ from "lodash";
import renderIf from "render-if";

import { currentUserAccessor, withLocalization } from "../../../components/hoc";
import ConnectNetwork from "./connect-network.component";
import OAuthIO from "./oauthio.component";
import config from "../../../config";
import { dataService } from "../../../data";

import {
  logger,
  socialNetworkOrderService,
  profileFunctionsService,
  dialogService,
  localizationHelper,
  oAuthIOService
} from "../../../services";

import { Loading } from "../../../components/app";

interface ConnectProps {
  currentUser?: any;
  t?: any;
}

@currentUserAccessor
@withLocalization
class Connect extends React.Component<ConnectProps> {
  static propTypes = {
    currentUser: PropTypes.object,
    t: PropTypes.func
  };

  oAuthIO: any = null;

  constructor(props: ConnectProps) {
    super(props);
    this.loadUserConections = this.loadUserConections.bind(this);
    this.connect = this.connect.bind(this);
    this.trash = this.trash.bind(this);
  }

  state = {
    socialNetworks: [],
    supportedNetworks: [],
    userConns: [],
    isLoading: false
  };

  componentDidMount = async () => {
    const supportedSocialNetworks = socialNetworkOrderService.supported;
    this.setState({ supportedNetworks: supportedSocialNetworks });

    const socialNetworks = [];
    for (let i = 0, l = supportedSocialNetworks.length; i < l; i += 1) {
      socialNetworks.push(this.createNetwork(supportedSocialNetworks[i]));
    }
    this.setState({ socialNetworks });

    await this.loadUserConections();
  };

  loadUserConections = async () => {
    try {
      this.setState({ isLoading: true });
      const {
        currentUser: { oid, uid }
      } = this.props;
      const {
        data: { organizationUserConnections }
      } = await dataService.getUserConnections(oid, uid);
      logger.log("organizationUserConnections", organizationUserConnections);
      this.setState({ userConns: organizationUserConnections });
    } catch (err) {
      logger.error("loadUserConections err", err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  createNetwork = source => {
    const provider = source[0] === "googleplus" ? "google_plus" : source[0];
    const version = source[0] === "linkedin" ? "2" : "1";
    const network = {
      source: source[0],
      name: "",
      type: "profile",
      auth: { provider: provider === "linkedin" ? "linkedin2" : provider },
      version,
      status: 0,
      ignore: 0,
      supported: true,
      optimizations: {},
      content: [],
      connecting: false
    };
    return network;
  };

  // connect network directive
  trash = async network => {
    const self = this;
    try {
      logger.log("trash:network", network); // eslint-disable-line

      const {
        currentUser: { oid, uid, email, displayName },
        t
      } = this.props;

      await dialogService.confirm({
        title: t("OPTIMIZE:CONNECT:ARE_YOU_SURE"),
        template: t("OPTIMIZE:CONNECT:ARE_YOU_SURE_DISCONNECT", {
          network: localizationHelper.networkName(t, network.source)
        }),
        okText: t("GENERIC:OKAY_BUTTON"),
        cancelText: t("GENERIC:CANCEL_BUTTON")
      });

      const conn = {
        id: network.id,
        auth: {
          firebase_id: network.auth.firebase_id,
          provider: network.auth.provider
        },
        user: {
          oid,
          uid,
          email,
          displayName
        },
        created_by: network.created_by,
        ignore: network.ignore,
        name: network.name,
        oid: network.oid,
        uid: network.uid,
        profile: {
          firstname: network.profile.firstname,
          lastname: network.profile.lastname,
          name: network.profile.name
        },
        source: network.source,
        source_type: network.source_type,
        status: network.status,
        type: network.type
      };

      logger.log("trash:conn", conn); // eslint-disable-line

      const {
        data: { disconnectConnection }
      } = await dataService.disconnect(conn);

      if (disconnectConnection) {
        await self.loadUserConections();
      }
    } catch (err) {
      logger.log("trash connection err", err); // eslint-disable-line
    }
  };

  connectNetwork = async conn => {
    logger.log("connectNetwork", conn.id); // eslint-disable-line
    if (conn.id) {
      logger.log("reconnecting"); // eslint-disable-line
      this.reconnect(conn);
    } else {
      logger.log("connecting"); // eslint-disable-line
      this.connect(conn).then(() => {
        this.loadUserConections();
      });
    }
  };

  mapToGraphQlConnection = (conn, r) => {
    const {
      currentUser: { oid, uid, email, displayName }
    } = this.props;

    const { avatar, bio, firstname, lastname, name, url } = r.me;

    const value = {
      created_by: uid,
      uid,
      oid,
      source: conn.source,
      source_type: [conn.source, conn.type].join("_"),
      type: conn.type,
      version: conn.version || 1,
      // provider: conn.auth.provider,
      profile: {
        avatar,
        bio,
        email: r.me.email,
        firstname,
        lastname,
        id: r.me.id,
        name,
        url,
        raw: {
          emailAddress: r.me.raw.emailAddress,
          firstName: r.me.raw.firstName,
          id: r.me.raw.id,
          lastName: r.me.raw.lastName,
          pictureUrl: r.me.raw.pictureUrl,
          publicProfileUrl: r.me.raw.publicProfileUrl
        }
      },
      status: 1,
      ignore: false,
      auth: {
        provider: r.result.provider,
        firebase_id: r.result.data.firebase_id,
        access_token: r.result.data.access_token,
        expires_in: r.result.data.expires_in
      },
      user: {
        oid,
        uid,
        email,
        displayName
      }
    };
    value.name =
      value.profile.name ||
      value.profile.username ||
      value.profile.alias ||
      value.profile.url ||
      value.profile.id ||
      "unknown";

    logger.log("calculating expires");
    const expires =
      r.result.data.expires_in > 0
        ? new Date().getTime() + r.result.data.expires_in * 1000
        : null;

    if (expires !== null) {
      value.auth.expires = expires;
    }

    return value;
  };

  connect = conn => {
    const self = this;
    logger.log("connect", conn); // eslint-disable-line
    const deffered = new Deferred();
    this.connectWithOAuthPopup(conn).then(
      r => {
        logger.log("connect:result", JSON.stringify(r)); // eslint-disable-line

        const value = self.mapToGraphQlConnection(conn, r);
        logger.log("value", value); // eslint-disable-line

        dataService.createOrUpdateConnection(value).then(
          response => {
            logger.log("createOrUpdateConnection: success", response); // eslint-disable-line
            const {
              data: { createOrUpdateConnection }
            } = response;
            if (createOrUpdateConnection) {
              deffered.resolve(true);
            } else {
              deffered.reject(false);
            }
          },
          err => {
            // todo alert error
            logger.log("createOrUpdateConnection:error", JSON.stringify(err)); // eslint-disable-line
          }
        );
      },
      err => {
        logger.log("connect:error", JSON.stringify(err)); // eslint-disable-line
      }
    );

    return deffered.promise;
  };

  showWrongAccountPopup = (connection, oldMe, me) => {
    logger.log("checking accounts", JSON.stringify(oldMe), JSON.stringify(me)); // eslint-disable-line

    const { t } = this.props;

    return new Promise((resolve, reject) => {
      if (oldMe.id === me.id) {
        return resolve();
      }

      const template = `<p>${t(
        "SETTINGS:PROFILE:PROFILE"
      )}: ${profileFunctionsService.anyName({
        source: connection.source,
        profile: oldMe
      })}<br/>${t("OPTIMIZE:CONNECT:ADD")}: ${profileFunctionsService.anyName({
        source: connection.source,
        profile: me
      })}<br/><br/>${t("OPTIMIZE:CONNECT:ARE_YOU_SURE")}</p>`;

      const reconnectConfirmPopup = dialogService.confirm({
        title: t("OPTIMIZE:CONNECT:CONNECT").toUpperCase(),
        template,
        okText: t("GENERIC:OKAY_BUTTON"),
        cancelText: t("GENERIC:UNDO")
      });

      return reconnectConfirmPopup.then(res => {
        if (res) {
          logger.log("You are sure");
          return resolve();
        }
        logger.log("You are not sure");
        return reject();
      });
    });
  };

  reconnect = async conn => {
    const self = this;

    const deffered = new Deferred();
    this.connectWithOAuthPopup(conn)
      .then(r => {
        logger.log("showWrongAccountPopup:show");
        return self.showWrongAccountPopup(conn, conn.profile, r.me).then(
          () => r,
          err => {
            logger.log("showWrongAccountPopup:error", JSON.stringify(err)); // eslint-disable-line
          }
        );
      })
      .then(
        r => {
          logger.log("connect:result", JSON.stringify(r)); // eslint-disable-line

          const value = self.mapToGraphQlConnection(conn, r);

          value.origin = "fullcontact";
          value.id = conn.id;
          logger.log("value", value); // eslint-disable-line

          dataService.createOrUpdateConnection(value).then(
            response => {
              logger.log("createOrUpdateConnection: success", response); // eslint-disable-line
              const {
                data: { createOrUpdateConnection }
              } = response;
              if (createOrUpdateConnection) {
                deffered.resolve(true);
              } else {
                deffered.reject(false);
              }
            },
            err => {
              // todo alert error
              logger.log("createOrUpdateConnection:error", JSON.stringify(err)); // eslint-disable-line
            }
          );
        },
        err => {
          logger.log("connect:error", JSON.stringify(err)); // eslint-disable-line
        }
      );

    return deffered.promise;
  };

  // connect network service
  connectWithOAuthPopup = conn => {
    const { source } = conn;
    const provider = oAuthIOService.sourceToProviderMap(source);

    const settings = _.get(oAuthIOService.SETTINGS, [provider], {});
    settings.cache = false;

    return this.oAuthIO.openPopup({
      publicUrl: config.OAuthIO_PUBLIC_URL,
      callbackUrl: "https://localhost",
      provider,
      opts: settings
    });
  };

  render() {
    const { style } = this.props;
    const { socialNetworks, userConns, isLoading } = this.state;

    // const renderSocialNetworkItem = ({ item }) => {
    //   return (
    //     <ConnectNetwork
    //       horizontal={true}
    //       network={item}
    //       connectNetwork={this.connectNetwork.bind(this, item)}
    //     />
    //   );
    // };

    // const renderSocialNetworkItemDivider = () => {
    //   return <View style={style.networkItemDivider} />;
    // };

    // const renderSocialNetworkItemKey = (item: any, index: number) =>
    //   index.toString();

    return (
      <View style={style.container}>
        <View style={style.socialNetworks}>
          {socialNetworks.map((item: any) => (
            <View key={item.source}>
              <ConnectNetwork
                horizontal={true}
                network={item}
                connectNetwork={this.connectNetwork.bind(this, item)}
              />
            </View>
          ))}
          {/* <FlatList
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={socialNetworks}
            renderItem={renderSocialNetworkItem}
            ItemSeparatorComponent={renderSocialNetworkItemDivider}
            keyExtractor={renderSocialNetworkItemKey}
          /> */}
        </View>
        <View style={style.userConnections}>
          {renderIf(isLoading)(<Loading />)}
          {userConns.map((network: any) => (
            <View key={`${network.source}_${network.id}`}>
              <ConnectNetwork
                network={network}
                trash={this.trash.bind(this, network)}
              />
              <View style={style.userConnectionDivider} />
            </View>
          ))}
        </View>
        <OAuthIO
          ref={w => {
            this.oAuthIO = w;
          }}
        />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Connect);
