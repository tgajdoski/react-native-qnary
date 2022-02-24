import gql from "graphql-tag";
const mutation = gql`
  mutation($input: ConnOrgUserConnInput!) {
    disconnectConnection(input: $input)
  }
`;
export default mutation;
