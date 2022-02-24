import gql from "graphql-tag";
const mutation = gql`
  mutation(
    $oid: String!
    $msg: String!
    $uid: String!
    $subject: String!
    $from: String!
  ) {
    messageAdmin(
      oid: $oid
      msg: $msg
      uid: $uid
      subject: $subject
      from: $from
    ) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
