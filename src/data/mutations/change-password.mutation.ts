import gql from "graphql-tag";
const mutation = gql`
  mutation(
    $email: String!
    $oid: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    passwordUpdate(
      email: $email
      oid: $oid
      oldpass: $oldPassword
      newpass: $newPassword
    ) {
      isSuccess
      error {
        code
        message
      }
    }
  }
`;

export default mutation;
