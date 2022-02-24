import gql from "graphql-tag";

const mutation = gql`
  mutation($oid: String!, $uid: String!) {
    updateSmsFlag(oid: $oid, uid: $uid, offFlag: true) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
