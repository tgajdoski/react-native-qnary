import gql from "graphql-tag";
const mutation = gql`
  mutation($input: NotificationInput!, $oid: String!) {
    allowSms(input: $input, oid: $oid)
  }
`;
export default mutation;
