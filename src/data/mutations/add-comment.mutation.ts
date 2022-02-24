import gql from "graphql-tag";

const mutation = gql`
  mutation($aid: String!, $comment: String!) {
    addApprovalComment(aid: $aid, comment: $comment) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
