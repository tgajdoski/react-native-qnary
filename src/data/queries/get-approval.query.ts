import gql from "graphql-tag";

const query = gql`
  query($aid: String!) {
    getapproval(aid: $aid) {
      id
      category
      content
      source
      image
      comment
      connection_id
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
