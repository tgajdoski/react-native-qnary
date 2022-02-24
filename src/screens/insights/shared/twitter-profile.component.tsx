import React from "react";

import { Image } from "react-native";

import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./twitter-profile.component.style";

import renderIf from "render-if";

import PropTypes from "prop-types";
import { withLocalization } from "../../../components/hoc";

@withLocalization
class TwitterProfile extends React.PureComponent {
  static propTypes = {
    json: PropTypes.object.isRequired,
    t: PropTypes.func
  };
  render() {
    const { t, json, style } = this.props;

    if (json.actor === undefined) {
      return null;
    }

    const imageUri =
      json.actor.image !== null && json.actor.image.length > 0
        ? json.actor.image
        : "";

    return (
      <View>
        <View style={style.actor}>
          <View>
            <Image
              style={style.actorImage}
              resizeMode="contain"
              source={{
                uri: imageUri
              }}
            />
          </View>
          <View style={style.nameContainer}>
            <Text style={style.text}>
              <Text style={style.displayName}>{json.actor.displayName}</Text>
              {" - @ "}
              {json.actor.preferredUsername}
            </Text>
            <Text style={style.text}>
              {json.actor.followersCount} {t("SOCIAL:FOLLOWERS")}
            </Text>
          </View>
        </View>

        <View>
          {renderIf(json.actor.summary)(
            <Text style={style.summary}>{json.actor.summary}</Text>
          )}
        </View>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(TwitterProfile);
