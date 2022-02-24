import gql from "graphql-tag";

const query = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      oid
      token
    }
  }
`;

export default query;
