import gql from "graphql-tag";

const mutation = gql`
  mutation($token: String!) {
    updateUserToken(token: $token) @client
  }
`;

export default mutation;
