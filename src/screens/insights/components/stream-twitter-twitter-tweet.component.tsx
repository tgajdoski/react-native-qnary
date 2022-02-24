import React, { Component } from "react";
import { View, Text, connectStyle } from "native-base";
import { STYLE_NAME } from "./insight-component.style";

import PropTypes from "prop-types";
import renderIf from "render-if";

import InsightBase from "./insight-base.component";

import {
  InsightHeader,
  TwitterProfile,
  InsightCategory,
  TwitterTweet,
  InsightShare
} from "../shared";
import { withLocalization } from "../../../components/hoc";

import helpers from "../shared/helpers";

@withLocalization
class StreamTwitterTwitterTweet extends Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    t: PropTypes.func
  };
  render() {
    const { insight, profile, t, style } = this.props;

    const { getTwitterEntityName, getIncludeOrHashtag } = helpers;

    const entityName = getTwitterEntityName(
      (((insight || {}).subscription || {}).insight || {}).category_value ||
        ((insight || {}).rule || {}).value,
      (
        ((((insight || {}).record || {}).kinesis || {}).json || {})
          .twitter_entities || {}
      ).user_mentions
    );

    const insightCategory =
      (((insight || {}).subscription || {}).insight || {}).category ||
      (((insight || {}).subscription || {}).insight || {}).label;

    const render1 = () => {
      switch (insightCategory) {
        case "retweet":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:RETWEET", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  user: entityName
                })}
              />
            </View>
          );
        case "mention":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:MENTION", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  mention: (((insight || {}).subscription || {}).insight || {})
                    .category_value
                })}
              />
            </View>
          );
        case "from":
          switch (
            ((((insight || {}).record || {}).kinesis || {}).json || {}).verb
          ) {
            case "share":
              return (
                <View>
                  <InsightHeader
                    content={t(
                      "INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:FROM_SHARE",
                      {
                        actor: (
                          (
                            (((insight || {}).record || {}).kinesis || {})
                              .json || {}
                          ).actor || {}
                        ).displayName
                      }
                    )}
                  />
                </View>
              );
            case "post":
              return (
                <View>
                  <InsightHeader
                    content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:FROM", {
                      actor: (
                        (
                          (((insight || {}).record || {}).kinesis || {}).json ||
                          {}
                        ).actor || {}
                      ).displayName
                    })}
                  />
                </View>
              );
            default:
              return (
                <View>
                  <InsightHeader
                    content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:FROM", {
                      actor: (
                        (
                          (((insight || {}).record || {}).kinesis || {}).json ||
                          {}
                        ).actor || {}
                      ).displayName
                    })}
                  />
                </View>
              );
          }

        case "link":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:LINK", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  mention: profile.name
                })}
              />
              <View>
                {(
                  ((((insight || {}).record || {}).kinesis || {}).json || {})
                    .gnip || {}
                ).urls.map(url => (
                  <Text>{url.expanded_url}</Text>
                ))}
              </View>
            </View>
          );
        case "owned_link":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:LINK", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  mention: profile.name
                })}
              />
              <View>
                {(
                  ((((insight || {}).record || {}).kinesis || {}).json || {})
                    .gnip || {}
                ).urls.map(url => (
                  <View>
                    <Text>{url.expanded_url}</Text>
                  </View>
                ))}
              </View>
            </View>
          );

        case "to":
          return (
            <View>
              {renderIf(
                (
                  ((((insight || {}).record || {}).kinesis || {}).json || {})
                    .inReplyTo || {}
                ).link
              )(
                <View>
                  {renderIf(
                    (
                      (
                        (((insight || {}).record || {}).kinesis || {}).json ||
                        {}
                      ).inReplyTo || {}
                    ).link
                  )(
                    <InsightHeader
                      content={t(
                        "INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:REPLIED_TO",
                        {
                          actor: (
                            (
                              (((insight || {}).record || {}).kinesis || {})
                                .json || {}
                            ).actor || {}
                          ).displayName,
                          user: entityName
                        }
                      )}
                    />
                  )}
                  {renderIf(
                    !(
                      (
                        (((insight || {}).record || {}).kinesis || {}).json ||
                        {}
                      ).inReplyTo || {}
                    ).link
                  )(
                    <InsightHeader
                      content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:TO", {
                        actor: (
                          (
                            (((insight || {}).record || {}).kinesis || {})
                              .json || {}
                          ).actor || {}
                        ).displayName,
                        user:
                          (
                            (
                              (((insight || {}).record || {}).kinesis || {})
                                .json || {}
                            ).actor || {}
                          ).displayName !== entityName
                            ? ` to ${entityName}.`
                            : ""
                      })}
                    />
                  )}
                </View>
              )}
            </View>
          );

        case "hashtag":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:ABOUT", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  about: getIncludeOrHashtag(
                    (((insight || {}).subscription || {}).insight || {})
                      .category_value
                  )
                })}
              />
            </View>
          );
        case "include":
          return (
            <View>
              <InsightHeader
                content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:INCLUDE", {
                  actor: (
                    ((((insight || {}).record || {}).kinesis || {}).json || {})
                      .actor || {}
                  ).displayName,
                  about: getIncludeOrHashtag(
                    (((insight || {}).subscription || {}).insight || {})
                      .category_value
                  )
                })}
              />
            </View>
          );
        default:
          return (
            <InsightHeader
              content={t("INSIGHTS:INSIGHTS:STREAM:TWITTER:RULE:DEFAULT")}
            />
          );
      }
    };

    const renderTabContent = () => {
      return (
        <InsightCategory
          name={t(
            "INSIGHTS:INSIGHTS:STREAM:TWITTER:TWITTER_TWEET:TWITTER_TWEET"
          )}
        />
      );
    };

    const renderActions = () => {
      return <InsightShare insight={insight} />;
    };

    return (
      <InsightBase
        color="#4099ff"
        insight={insight}
        profile={profile}
        tab={renderTabContent}
        actions={renderActions}
      >
        <View>
          <View>{render1()}</View>
          <View style={style.marginTop10}>
            {renderIf(
              (((insight || {}).subscription || {}).insight || {}).category ===
                "mention" ||
                (((insight || {}).subscription || {}).insight || {})
                  .category === "retweet"
            )(
              <View>
                <TwitterProfile
                  json={(((insight || {}).record || {}).kinesis || {}).json}
                />
              </View>
            )}

            <View>
              <TwitterTweet
                json={(((insight || {}).record || {}).kinesis || {}).json}
              />
            </View>
          </View>
        </View>
      </InsightBase>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(StreamTwitterTwitterTweet);
