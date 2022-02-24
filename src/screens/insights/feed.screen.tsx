import React, { Component } from "react";
import {
  View,
  Text,
  List,
  ListItem,
  Content,
  Spinner,
  Button,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./feed.screen.style";

import { RefreshControl } from "react-native";

import PropTypes from "prop-types";

import orderBy from "lodash/orderBy";

import { Layout, BottomNav, Loading } from "../../components/app";

import { QnaryInsight } from "./shared";
import { currentUserAccessor, withLocalization } from "../../components/hoc";
import { dataService } from "../../data";
import { logger } from "../../services";

@currentUserAccessor
@withLocalization
class FeedScreen extends Component {
  static propTypes = {
    t: PropTypes.func
  };
  static navigationOptions = {
    header: null
  };

  state = {
    oid: "",
    uid: "",
    profile: null,
    isLoading: false,
    refreshing: false,
    userConnections: [],
    insights: [],
    searchid: "",
    hasMoreInsights: false,
    numberOfResultsToGrab: 11
  };

  componentDidMount = async () => {
    const {
      currentUser: { oid, uid, profile }
    } = this.props;

    this.setState(
      {
        oid,
        uid,
        profile
      },
      async () => {
        await this.loadUserConnections();
        await this.refreshList(null);
      }
    );
  };

  concatAndDeDuplicateObjectsDeep = (p, ...arrs) =>
    [...new Set([].concat(...arrs).map(a => JSON.stringify(a)))].map(a =>
      JSON.parse(a)
    );

  getUserInsights = async (oid, uid, lastInsightID, numberOfResultsToGrab) => {
    try {
      const {
        data: { userInsights }
      } = await dataService.getUserInsights(
        oid,
        uid,
        lastInsightID,
        numberOfResultsToGrab
      );
      if (userInsights) {
        return userInsights;
      }
    } catch (err) {
      logger.log("getUserInsights", err); // eslint-disable-line
    }
    return [];
  };

  refreshList = async lastInsightID => {
    const { oid, uid, insights, numberOfResultsToGrab } = this.state;

    this.setState({
      isLoading: true
    });

    logger.log("refreshList", lastInsightID);

    const userInsights = await this.getUserInsights(
      oid,
      uid,
      lastInsightID,
      numberOfResultsToGrab
    );
    const newInsights = orderBy(
      this.concatAndDeDuplicateObjectsDeep("id", insights, userInsights),
      ["id"],
      ["desc"]
    );

    // if server returns a page with less results than the numberOfResultsToGrab, probably is no more data
    if (Object.keys(userInsights).length < numberOfResultsToGrab) {
      this.setState({
        insights: newInsights,
        hasMoreInsights: false,
        isLoading: false
      });
    } else {
      this.setState({
        insights: newInsights,
        hasMoreInsights: true,
        isLoading: false
      });
    }
  };

  loadUserConnections = async () => {
    try {
      const {
        currentUser: { oid, uid }
      } = this.props;
      const {
        data: { organizationUserConnections }
      } = await dataService.getUserConnections(oid, uid);

      this.setState({ userConnections: organizationUserConnections });
    } catch (err) {
      logger.log(err);
    }
  };

  doRefresh = async () => {
    this.setState({
      refreshing: true
    });

    await this.refreshList(null);

    this.setState({
      refreshing: false
    });
  };

  loadMore = async () => {
    const { insights } = this.state;
    const lastInsightID = insights[Object.keys(insights).length - 1].id;
    await this.refreshList(lastInsightID);
  };

  render() {
    const { t, style } = this.props;
    const {
      insights,
      profile,
      userConnections,
      searchid,
      isLoading,
      refreshing,
      hasMoreInsights
    } = this.state;

    const feedTitle = () =>
      t("INSIGHTS:FEED", {
        name: profile.firstName || profile.name
      });

    const renderRefreshControl = () => (
      <RefreshControl onRefresh={this.doRefresh} refreshing={refreshing} />
    );

    const renderLoader = () => {
      if (isLoading && !refreshing) {
        return <Loading />;
      }
      return null;
    };

    const renderNoInsights = () => {
      if (isLoading) {
        return null;
      }

      if (insights.length === 0) {
        return (
          <View>
            <Text>{t("INSIGHTS:NO_INSIGHTS")}</Text>
          </View>
        );
      }

      return null;
    };

    if (profile === null) {
      return null;
    }

    return (
      <Layout title={feedTitle()}>
        {insights.length === 0 ? (
          <Content contentContainerStyle={style.noContentContainer}>
            {renderLoader()}
            {renderNoInsights()}
          </Content>
        ) : null}

        {insights.length > 0 ? (
          <Content
            contentContainerStyle={style.contentContainer}
            refreshControl={renderRefreshControl()}
          >
            <List style={style.list}>
              {insights.map((insight, i) => (
                <ListItem
                  key={`${(insight || {}).id}_${i.toString()}`}
                  style={style.listItem}
                >
                  <QnaryInsight
                    insight={insight}
                    profile={profile}
                    connections={userConnections}
                    searchid={searchid}
                    admin="admin"
                  />
                </ListItem>
              ))}
            </List>
            {insights.length > 0 && hasMoreInsights ? (
              <View style={style.moreButtonContainer}>
                <Button
                  small={true}
                  disabled={isLoading}
                  onPress={this.loadMore}
                >
                  <Text style={style.more}>{t("INSIGHTS:MORE")}</Text>
                  {isLoading ? <Spinner size="small" color="blue" /> : null}
                </Button>
              </View>
            ) : null}
          </Content>
        ) : null}
        <BottomNav active="feed" />
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(FeedScreen);
