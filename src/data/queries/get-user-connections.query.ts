import gql from "graphql-tag";

const query = gql`
  query($oid: String!, $uid: String!) {
    organizationUserConnections(oid: $oid, uid: $uid) {
      id
      created_at
      created_by
      name
      oid
      uid
      source
      source_type
      type
      updated_at
      auth {
        provider
        firebase_id
        access_token
        expires
        expires_in
        created_at
      }
      ignore
      profile {
        id
        name
        alias
        firstname
        lastname
        avatar
        bio
        email
      }
      status
      version
    }
  }
`;

export default query;
