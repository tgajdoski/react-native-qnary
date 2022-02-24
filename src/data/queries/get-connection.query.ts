import gql from "graphql-tag";
const query = gql`
  query($cid: String!) {
    getConnection(cid: $cid) {
      id
      created_at
      auth {
        firebase_id
        provider
        oauth_token_secret
        access_token
        created_at
        expires
        expires_in
      }
      name
      created_by
      oid
      profile {
        avatar
        bio
        email
        firstname
        id
        lastname
        name
        alias
        username
        raw {
          emailAddress
          firstName
          headline
          id
          lastName
          pictureUrl
          publicProfileUrl
        }
        url
        id
      }
      publish {
        settings {
          schedules {
            default {
              opt_in
              timezone
            }
          }
        }
      }
      source
      source_type
      status
      type
      uid
      version
    }
  }
`;

export default query;
