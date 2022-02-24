import gql from "graphql-tag";
const mutation = gql`
  mutation($input: NotificationInput!, $oid: String!) {
    allowNotification(input: $input, oid: $oid)
  }
`;

export default mutation;
