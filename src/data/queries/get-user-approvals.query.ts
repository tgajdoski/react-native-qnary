import gql from "graphql-tag";
const query = gql`
  query($oid: String!, $uid: String!, $status: String!) {
    userapprovals(oid: $oid, uid: $uid, status: $status) {
      id
      category
      content
      source
      image
      status
      type
      connection_id
      comment
      publish {
        settings {
          opt_in
          timezone
        }
        status
        updated_at
        published_at
      }
      publish_at
      publish_at_str
      publish_date
      created_at
      updated_at
    }
  }
`;

export default query;
