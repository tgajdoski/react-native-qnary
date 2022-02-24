import gql from "graphql-tag";

const mutation = gql`
  mutation($oid: String!, $uid: String!) {
    completeOnBoarding(oid: $oid, uid: $uid)
  }
`;

export default mutation;
