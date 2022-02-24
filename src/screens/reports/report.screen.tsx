import React, { Component } from "react";

import {
  View,
  Spinner,
  Body,
  Text,
  Left,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Icon,
  H1,
  connectStyle
} from "native-base";

import { STYLE_NAME } from "./report.screen.style";

import { Col, Row, Grid } from "react-native-easy-grid";

import PropTypes from "prop-types";
import renderIf from "render-if";

import { isNull, isNil } from "lodash";
import { currentUserAccessor, withLocalization } from "../../components/hoc";

import LineChart from "react-native-responsive-linechart";

import { dataService } from "../../data";
import { logger } from "../../services";

import { Layout, BottomNav, UserAvatar } from "../../components/app";

@currentUserAccessor
@withLocalization
class ReportScreen extends Component {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      social_profiles: [],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      data1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  dedup_and_sum(arr, prop) {
    const seen = {};
    const total = [];
    arr.forEach(function(o) {
      const id = o[prop];
      if (id in seen) {
        const data = seen[id].data + o.data;
        seen[id] = o;
        seen[id].data = data;
        total.push(total.splice(total.indexOf(id), 1));
      } else {
        seen[id] = o;
        total.push(id);
      }
    });
    return total.map(function(k) {
      return seen[k];
    });
  }

  async componentWillMount() {
    // await this.loadReports();
    this.loadReports();
  }

  loadReports = async () => {
    this.setState({ isLoading: true });

    const {
      currentUser: { oid, uid }
    } = this.props;

    let resultsFollowers = [];
    let resultsEngagements = [];
    try {
      const {
        data: { getreport }
      } = await dataService.getReport(oid, uid);
      const social_profiles = getreport.data;
      let perDaysEngagements = [];
      let perDaysFollowers = [];
      let totalEngagements = 0;
      let totalFollowers = 0;

      let hasData = false;

      if (!isNil(social_profiles) && social_profiles.length !== 0) {
        social_profiles.forEach(prof => {
          if (!isNil(prof.typeData)) {
            prof.typeData.forEach(typeData => {
              if (["engagement"].indexOf(typeData.type) > -1) {
                totalEngagements += typeData.total;
                perDaysEngagements = perDaysEngagements.concat(
                  typeData.totalByDay
                );
              }
              if (["network"].indexOf(typeData.type) > -1) {
                totalFollowers += typeData.total;
                perDaysFollowers = perDaysFollowers.concat(typeData.totalByDay);
              }
            });
            hasData = true;
          }
        });
      }

      // clear duplicate and sum values
      resultsFollowers = this.dedup_and_sum(perDaysFollowers, "date").reverse();
      resultsEngagements = this.dedup_and_sum(perDaysEngagements, "date").reverse();

      let grapFollowerData = resultsFollowers.map(a => a.value);
      let graphEngagementsData = resultsEngagements.map(a => a.value);

      if (grapFollowerData.length === 0) {
        grapFollowerData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      if (graphEngagementsData.length === 0) {
        graphEngagementsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      this.setState({
        social_profiles,
        data: grapFollowerData,
        data1: graphEngagementsData,
        totalFollowers,
        totalEngagements,
        hasData
      });
    } catch (err) {
      logger.log(err);
    }

    this.setState({ isLoading: false });
  };

  render() {
    const {
      social_profiles,
      data,
      data1,
      isLoading,
      totalEngagements,
      totalFollowers,
      hasData
    } = this.state;
    const {
      t,
      style,
      currentUser,
      currentUser: { oid, uid, profile }
    } = this.props;

    const config = {
      line: {
        strokeWidth: 1,
        strokeColor: "#216D99"
      },
      area: {
        gradientFrom: "#2e86de",
        gradientFromOpacity: 1,
        gradientTo: "#87D3FF",
        gradientToOpacity: 1
      },
      insetY: 10,
      insetX: 10,
      interpolation: "spline",
      backgroundColor: "#fff",
      yAxis: { visible: false },
      grid: { visible: false }
    };

    const totals = social_profile => {
      let follTotal = 0;
      let follGrowth = 0;
      let engTotal = 0;
      let engGrowth = 0;

      if (!isNull(social_profile.typeData)) {
        for (const sptypedata of social_profile.typeData) {
          if (sptypedata.type.indexOf("network") > -1) {
            follTotal = isNull(sptypedata.total) ? 0 : sptypedata.total;
            follGrowth = isNull(sptypedata.growth) ? 0 : Math.round(sptypedata.growth * 100);
          }
          if (sptypedata.type.indexOf("engagement") > -1) {
            engTotal = isNull(sptypedata.total) ? 0 : sptypedata.total;
            engGrowth = isNull(sptypedata.growth) ? 0 : Math.round(sptypedata.growth * 100);
          }
        }
      }

      console.log("ALO BRE ", follTotal, follGrowth, engTotal, engGrowth);
      return {
        follTotal,
        follGrowth,
        engTotal,
        engGrowth
      };
    };

    getLogo = network => `logo-${network}`;

    const showEngagements = social_profile => {
      console.log("social_profile", social_profile);
      if (totals(social_profile).engTotal > 0) {
        return true;
      }
      return false;
    };

    const showFollower = social_profile => {
      if (totals(social_profile).follTotal > 0) {
        return true;
      }
      return false;
    };

    const colorstyle = num => {
      return num > 0 ? "green" : num === 0 ? "black" : "red";
    };

    // loading
    if (isLoading) {
      return (
        <View
          title={t("MENU:REPORT")}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Spinner color="blue" />
        </View>
      );
    }

    // no data
    if (isNil(social_profiles) || social_profiles.length === 0 || !hasData) {
      return (
        <Layout title={t("MENU:REPORT")}>
          <Content
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#fff",
              padding: 5
            }}
          >
            <List style={{ width: "100%" }}>
              <ListItem avatar={true}>
                <Left>
                  <UserAvatar oid={oid} uid={uid} shape="round" />
                </Left>
                <Body>
                  <Text>{profile.name}</Text>
                </Body>
              </ListItem>

              <ListItem
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 20
                }}
              >
                <H1 style={{ fontSize: 18 }}>{t("REPORT:NO_DATA")}</H1>
              </ListItem>
            </List>
          </Content>
          <BottomNav active="report" />
        </Layout>
      );
    }

    return (
      <Layout title={t("MENU:REPORT")}>
        <Content
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            padding: 5
          }}
        >
          <List style={{ width: "100%" }}>
            <ListItem avatar={true}>
              <Left>
                <UserAvatar oid={oid} uid={uid} shape="round" />
              </Left>
              <Body>
                <Text>{profile.name}</Text>
              </Body>
            </ListItem>
            <ListItem charts={true}>
              <Grid>
                <Col>
                  <Text>
                    {totalFollowers} {t("SOCIAL:FOLLOWERS")}
                  </Text>
                  <LineChart
                    style={{
                      flex: 0.5,
                      height: 50
                    }}
                    config={config}
                    data={data}
                  />
                </Col>
                <Col>
                  <Text>
                    {totalEngagements} {t("SOCIAL:ENGAGEMENTS")}
                  </Text>
                  <LineChart
                    style={{
                      flex: 0.5,
                      height: 50
                    }}
                    config={config}
                    data={data1}
                  />
                </Col>
              </Grid>
            </ListItem>
            {social_profiles.map((social_profile, index) => {
              return renderIf(!isNil(social_profile.typeData))(
                <ListItem
                  currentUser={currentUser}
                  key={social_profile.source + index}
                >
                  <Card style={{ width: "100%" }}>
                    <CardItem header={true}>
                      <Icon
                        name={getLogo(social_profile.source)}
                        style={style.listItemLogo}
                      />
                      <Text>{social_profile.name}</Text>
                    </CardItem>
                    <CardItem style={{ paddingTop: 0 }}>
                      <Grid>
                        {renderIf(showFollower(social_profile))(
                          <Row style={{ padding: 5 }}>
                            <Col>
                              <Text>Followers</Text>
                              <Text style={{ fontWeight: "bold" }}>
                                {totals(social_profile).follTotal}
                              </Text>
                            </Col>
                            <Col>
                              <Text>Growth</Text>
                              <Text
                                style={{
                                  color: colorstyle(
                                    totals(social_profile).follGrowth
                                  ),
                                  fontWeight: "bold"
                                }}
                              >
                                {totals(social_profile).follGrowth}%
                              </Text>
                            </Col>
                          </Row>
                        )}
                        {renderIf(true)(
                          <Row style={{ padding: 5 }}>
                            <Col>
                              <Text>Engagement</Text>
                              <Text style={{ fontWeight: "bold" }}>
                                {totals(social_profile).engTotal}
                              </Text>
                            </Col>
                            <Col>
                              <Text>Growth</Text>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: colorstyle(
                                    totals(social_profile).engGrowth
                                  )
                                }}
                              >
                                {totals(social_profile).engGrowth}%
                              </Text>
                            </Col>
                          </Row>
                        )}
                      </Grid>
                    </CardItem>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <BottomNav active="report" />
      </Layout>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ReportScreen);
