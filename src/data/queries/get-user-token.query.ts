import gql from "graphql-tag";

const query = gql`
  query GetUserToken {
    localState @client {
      token
    }
  }
`;

export default query;
