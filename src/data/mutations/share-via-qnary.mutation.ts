import gql from "graphql-tag";

const mutation = gql`
  mutation(
    $oid: String!
    $uid: String!
    $connectionId: String!
    $source: String!
    $content: String!
  ) {
    shareviaqnary(
      oid: $oid
      uid: $uid
      connid: $connectionId
      connsource: $source
      content: $content
    ) {
      id
    }
  }
`;

export default mutation;
