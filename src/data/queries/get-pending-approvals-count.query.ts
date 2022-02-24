import gql from "graphql-tag";
const query = gql`
  query GetUserPendingApprovalsCount {
    localState @client {
      pendingApprovalsCounter
    }
  }
`;
export default query;
