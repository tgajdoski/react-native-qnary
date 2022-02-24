import gql from "graphql-tag";

const query = gql`
  query($oid: String!, $uid: String!) {
    alreadyOnboarded(oid: $oid, uid: $uid) {
      isBoarded
      error {
        code
        message
      }
    }
  }
`;

export default query;
