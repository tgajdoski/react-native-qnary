import gql from "graphql-tag";
const mutation = gql`
  mutation(
    $approvals: [ApprovalInput]
    $oid: String!
    $uid: String!
    $status: String!
    $subject: String
  ) {
    markApprovalsAs(
      input: $approvals
      oid: $oid
      uid: $uid
      status: $status
      subject: $subject
    )
  }
`;
export default mutation;
