import gql from "graphql-tag";

const query = gql`
  query GetCurrentUser {
    localState @client {
      currentUser
    }
  }
`;

export default query;
