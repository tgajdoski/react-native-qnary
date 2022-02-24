import gql from "graphql-tag";
const mutation = gql`
  mutation($input: ConnectionInput!) {
    createOrUpdateConnection(input: $input)
  }
`;

export default mutation;
