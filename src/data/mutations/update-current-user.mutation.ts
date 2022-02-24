import gql from "graphql-tag";

const mutation = gql`
  mutation($user: User!) {
    updateCurrentUser(user: $user) @client
  }
`;

export default mutation;
