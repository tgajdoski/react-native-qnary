import gql from "graphql-tag";
const query = gql`
  query($uid: String!) {
    userdetails(uid: $uid) {
      uid
      oid
      organizationuser {
        account_type
        uid
        oid
        email
        profile {
          firstName
          lastName
          name
          slug
          timezone
        }
        settings {
          locale
          mobile {
            onboarded
          }
          notifications {
            push {
              off
            }
          }
          sms {
            phone_details {
              phonenumber
              formatedNumber
              countrycode
              intlprefix
            }
            push {
              off
            }
          }
        }
      }
    }
  }
`;

export default query;
