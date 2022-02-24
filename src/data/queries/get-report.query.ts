import gql from "graphql-tag";
const query = gql`
  query($oid: String!, $uid: String!) {
    getreport(oid: $oid, uid: $uid) {
      data {
        source
        name
        typeData {
          type
          hasData
          total
          growth
          totalByDay {
            date
            value
          }
        }
      }
    }
  }
`;

export default query;
