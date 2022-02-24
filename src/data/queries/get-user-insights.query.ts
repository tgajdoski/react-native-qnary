import gql from "graphql-tag";

const query = gql`
  query(
    $oid: String!
    $uid: String!
    $lastInsightID: String
    $numberOfResultsToGrab: Int
  ) {
    userInsights(
      oid: $oid
      uid: $uid
      lastInsightID: $lastInsightID
      numberOfResultsToGrab: $numberOfResultsToGrab
    ) {
      __typename
      ... on contentOptimizeResults01 {
        id
        category
        type
        version
        optimizations
        created_at
      }
      ... on optimizeResults01 {
        id
        category
        type
        version
        source
        optimizations
        created_at
      }
      ... on scanResults01 {
        id
        category
        type
        version
        created_at
        data {
          status
          socialProfiles {
            type
            username
          }
        }
      }
      ... on searchChanged01 {
        id
        category
        type
        version
        created_at
        alert {
          search {
            source
            q
          }
          data {
            link
            title {
              l
              r
            }
            description {
              l
              r
            }
          }
        }
      }
      ... on searchLeaveTop10_01 {
        id
        category
        type
        version
        created_at
        user {
          tags {
            rating {
              created_at
              search_group_id
              value
            }
          }
        }
        alert {
          data {
            link
            description {
              l
              r
            }
            title {
              l
              r
            }
            position {
              l
              r
            }
          }
          search {
            q
            source
            type
          }
        }
      }
      ... on searchMoved01 {
        id
        category
        type
        version
        created_at
        uid
        oid
        user {
          tags {
            rating {
              created_at
              search_group_id
              value
            }
          }
        }
        alert {
          data {
            link
            description {
              l
              r
            }
            title {
              l
              r
            }
            position {
              l
              r
            }
          }
          search {
            q
            source
            type
          }
        }
      }
      ... on searchnewTop10_01 {
        id
        category
        type
        version
        created_at
        user {
          tags {
            rating {
              created_at
              search_group_id
              value
            }
          }
        }
        alert {
          data {
            link
            description {
              l
              r
            }
            title {
              l
              r
            }
            position {
              l
              r
            }
          }
          search {
            q
            source
            type
          }
        }
      }
      ... on searchReenteredTop10_01 {
        id
        category
        type
        created_at
        user {
          tags {
            rating {
              created_at
              search_group_id
              value
            }
          }
        }
        alert {
          data {
            link
            description {
              l
              r
            }
            title {
              l
              r
            }
            position {
              l
              r
            }
          }
          search {
            q
            source
            type
          }
        }
        url
      }
      ... on searchResults01 {
        id
        actions {
          default
        }
        category
        type
        version
        category_type_version
        created_at
        data_results_count
        q
        total
      }
      ... on engagementContent01 {
        id
        category
        type
        version
        created_at
        subscription {
          oid
        }
        oid
        uid
        subscription {
          oid
        }
        engagement {
          source
          content {
            t_766396923628531712 {
              actor {
                displayName
                followersCount
                id
                id_str
                image
                link
                preferredUsername
              }
              actor_id
              favorite_count
              id
              tag
              id_str
              link
              reply_count
              retweet_count
              score
              user_mentions
            }
          }
        }
      }
      ... on engagementEngagers01 {
        id
        category
        type
        version
        created_at
        engagement {
          source
          engagers {
            t_29379607 {
              displayName
              followersCount
              id
              id_str
              image
              link
              preferredUsername
              score
              stats {
                likes
                mentions
                replies
                retweets
              }
            }
          }
        }
      }
      ... on engagementEngagersbyEngagement01 {
        id
        category
        type
        version
        created_at
        engagement {
          engagers {
            t_29379607 {
              displayName
              followersCount
              id
              id_str
              image
              link
              preferredUsername
              score
              stats {
                likes
                mentions
                replies
                retweets
              }
            }
          }
        }
      }
      ... on engagementEngagersbyInfluence01 {
        id
        category
        type
        version
        created_at
        engagement {
          engagers {
            t_29379607 {
              displayName
              followersCount
              id
              id_str
              image
              link
              preferredUsername
              score
              stats {
                likes
                mentions
                replies
                retweets
              }
            }
          }
        }
      }
      ... on engagementOverall01 {
        id
        category
        type
        version
        created_at
        engagement {
          analytics {
            curr
            percent_change
            prev
          }
          source
        }
      }
      ... on socialFollowers01 {
        id
        category
        type
        version
        created_at
        followers {
          add {
            count
          }
          source
        }
      }
      ... on socialMilestonesFollowers01 {
        id
        category
        type
        version
        created_at
        milestones {
          entries {
            followers {
              tier
              value
            }
          }
          source
        }
      }
      ... on streamBuzzsumoRule01 {
        id
        category
        type
        version
        created_at
        activity {
          object {
            name
            url
            image {
              href
              type
            }
            engagement {
              shares
            }
          }
        }
      }
      ... on streamSuperFeedRule02 {
        id
        category
        type
        version
        created_at
        activity {
          object {
            permalinkUrl
            title
            name
            url
            standardLinks {
              thumbnail {
                href
                rel
                title
                type
              }
            }
            summaryText
          }
          actor {
            displayName
          }
          target {
            title
          }
        }
      }
      ... on streamTwitterRule01 {
        id
        category
        type
        version
        created_at
        subscription {
          _hash
          _id
          created_at
          created_by
          data {
            form {
              feedName
              feedUrl
              notification {
                enabled
                msg
              }
              ruleName
              tweetType
              twitterHandle
            }
          }
          insight {
            category
            category_value
            type
          }
          name
          notification {
            enabled
            msg
          }
          oid
          rule {
            id
            source
            value
          }
          rule_id
          rule_source
          rule_source_id
          rule_subscription_type
          rule_value
          stream {
            _id
          }
          stream_id
          type
          uid
        }
        record {
          kinesis {
            json {
              id
              body
              object {
                postedTime
                location {
                  displayName
                  country_code
                }
              }
              actor {
                displayName
                image
                preferredUsername
                followersCount
              }
              link
              verb
              gnip {
                matching_rules {
                  id
                  tag
                }
              }
              twitter_entities {
                user_mentions {
                  id
                  id_str
                  indices
                  name
                  screen_name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default query;
