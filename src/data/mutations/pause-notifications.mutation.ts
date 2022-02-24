import gql from "graphql-tag";

const mutation = gql`
  mutation($oid: String!, $uid: String!) {
    updateNotificationFlag(oid: $oid, uid: $uid, offFlag: true) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
