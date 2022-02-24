import React, { Component } from "react";
import { Image } from "react-native";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./twitter-tweet.component.style";

import PropTypes from "prop-types";

import renderIf from "render-if";

import Moment from "react-moment";
import "moment-timezone";

import TwitterContent from "./twitter-content.component";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class TwitterTweet extends Component {
  static propTypes = {
    json: PropTypes.object.isRequired
  };
  twitterDateLocation = (d, l, c) => {
    const { style } = this.props;

    let location = "";
    if (l || c) {
      location += " &middot; ";
      if (l && c) {
        location += `${l}, ${c}`;
      } else {
        location += l || c;
      }
    }

    if (d) {
      return (
        <View style={style.date}>
          <Moment style={style.text} element={Text} date={d} format="LT" />
          <Text style={style.text}>-</Text>
          <Moment style={style.text} element={Text} date={d} format="ll" />
          <Text style={style.text}>{location}</Text>
        </View>
      );
    }
    return location;
  };

  tweetImage = json => {
    let image = "";

    const media =
      (json.twitter_extended_entities || {}).media ||
      (((json.object || {}).long_object || {}).twitter_entities || {}).media ||
      (((json.object || {}).long_object || {}).twitter_extended_entities || {})
        .media ||
      {};

    if (media.length > 0) {
      image = media[0].media_url;
    }

    return image;
  };

  render() {
    const { json, t, style } = this.props;

    return (
      <View>
        <View style={style.header}>
          <View>
            {json.actor.image !== "" ? (
              <Image
                style={style.actorImage}
                resizeMode="contain"
                source={{
                  uri: json.actor.image
                }}
              />
            ) : null}
          </View>
          <View style={style.nameContainer}>
            <Text style={style.text}>
              {"@"}
              {json.actor.preferredUsername}
            </Text>
            <Text style={style.text}>
              {json.actor.followersCount} {t("SOCIAL:FOLLOWERS")}
            </Text>
          </View>
        </View>

        <View style={style.content}>
          <TwitterContent content={json.body} />
        </View>

        {renderIf(this.tweetImage(json) !== "")(
          <View style={style.imageContainer}>
            <Image
              style={style.tweetImage}
              resizeMode="contain"
              source={{
                uri: this.tweetImage(json)
              }}
            />
          </View>
        )}

        {renderIf(json.object !== null)(
          <View style={style.object}>
            {this.twitterDateLocation(
              json.object.postedTime,
              json.object.location !== null
                ? json.object.location.displayName
                : "",
              json.object.location !== null
                ? json.object.location.country_code
                : ""
            )}
          </View>
        )}
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(TwitterTweet);
