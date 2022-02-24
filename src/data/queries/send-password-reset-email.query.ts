import gql from "graphql-tag";

const query = gql`
  query($email: String!) {
    passwordResetEmail(email: $email) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default query;
