import gql from "graphql-tag";

const mutation = gql`
  mutation($input: ApprovalInput) {
    updateApproval(input: $input) {
      id
    }
  }
`;

export default mutation;
