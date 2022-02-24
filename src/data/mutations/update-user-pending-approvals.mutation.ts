import gql from "graphql-tag";
const mutation = gql`
  mutation($count: Int!) {
    updateUserPendingApprovalsCount(count: $count) @client
  }
`;

export default mutation;
