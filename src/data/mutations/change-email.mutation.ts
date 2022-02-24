import gql from "graphql-tag";
const mutation = gql`
  mutation($uid: String!, $email: String!) {
    changeEmail(uid: $uid, email: $email) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
