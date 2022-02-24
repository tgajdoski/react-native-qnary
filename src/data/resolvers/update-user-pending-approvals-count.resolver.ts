import gql from "graphql-tag";

const query = gql`
  query GetUserPendingApprovalsCount {
    localState @client {
      pendingApprovalsCounter
    }
  }
`;

export default (_, { count }, { cache }) => {
  const previousState = cache.readQuery({ query });

  const data = {
    localState: {
      ...previousState.localState,
      pendingApprovalsCounter: count
    }
  };

  cache.writeQuery({
    query,
    data
  });

  return true;
};
