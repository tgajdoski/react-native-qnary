import apolloClientAccessor from "./apollo-client-accessor";

import loginQuery from "./queries/login.query";
import getUserDetailsQuery from "./queries/get-user-details.query";
import getUserPendingApprovalsCountQuery from "./queries/get-pending-approvals-count.query";
import updateUserPendingApprovalsCountMutation from "./mutations/update-user-pending-approvals.mutation";
import getUserApprovalsQuery from "./queries/get-user-approvals.query";
import changePasswordMutation from "./mutations/change-password.mutation";
import changeEmailMutation from "./mutations/change-email.mutation";
import sendPasswordResetEmailQuery from "./queries/send-password-reset-email.query";
import allowNotificationsMutation from "./mutations/allow-notifications.mutation";
import allowSMSNotificationsMutation from "./mutations/allow-sms-notifications.mutation";
import getUserConnectionsQuery from "./queries/get-user-connections.query";
import createOrUpdateConnectionMutation from "./mutations/create-or-update-connection.mutation";
import disconnectConnectionMutation from "./mutations/disconnect-connection.mutation";
import alreadyOnboardedQuery from "./queries/already-onboarded.query";
import completeOnboardingMutation from "./mutations/complete-onboarding.mutation";
import clearDeviceCacheMutation from "./mutations/clear-device-cache.mutation";
import sendNotificationToAdminMutation from "./mutations/send-notification-to-admin.mutation";
import pauseNotificationsMutation from "./mutations/pause-notifications.mutation";
import resumeNotificationsMutation from "./mutations/resume-notifications.mutation";
import pauseSMSNotificationsMutation from "./mutations/pause-sms-notifications.mutation";
import resumeSMSNotificationsMutation from "./mutations/resume-sms-notifications.mutation";
import getApprovalQuery from "./queries/get-approval.query";
import getConnectionQuery from "./queries/get-connection.query";
import markApprovalsAsMutation from "./mutations/mark-approvals-as.mutation";
import addCommentMutation from "./mutations/add-comment.mutation";
import updateContentMutation from "./mutations/update-content.mutation";
import getUserInsightsQuery from "./queries/get-user-insights.query";
import getReportQuery from "./queries/get-report.query";
import shareViaQnaryMutation from "./mutations/share-via-qnary.mutation";

class DataService {
  login = (email: string, password: string) => {
    const query = loginQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        email,
        password
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  getUserDetails = (uid: string) => {
    const query = getUserDetailsQuery;
    const client = apolloClientAccessor.getClient();
    return client
      .query({
        variables: {
          uid
        },
        query,
        fetchPolicy: "network-only"
      })
      .then((response: any) => {
        // must fix the response, recieving bad data
        // FIX: POSSIBLE NULL VALUES FOR OID&UID IN ORGANIZATION USER
        const organizationuser = {
          ...response.data.userdetails.organizationuser
        };

        organizationuser.uid = response.data.userdetails.uid;
        organizationuser.oid = response.data.userdetails.oid;

        // console.log("organizationuser fixed,", organizationuser);

        return Promise.resolve({
          data: {
            userdetails: {
              organizationuser
            }
          }
        });
      });
  };

  getUserPendingApprovalsCount = () => {
    const query = getUserPendingApprovalsCountQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      query
    });
  };

  updateUserPendingApprovalsCount = (count: number) => {
    const mutation = updateUserPendingApprovalsCountMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        count
      },
      mutation
    });
  };

  getUserApprovals = (oid: string, uid: string, status: string) => {
    const query = getUserApprovalsQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        oid,
        uid,
        status
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  changePassword = (
    email: string,
    oid: string,
    oldPassword: string,
    newPassword: string
  ) => {
    const mutation = changePasswordMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        email,
        oid,
        oldPassword,
        newPassword
      },
      mutation
    });
  };

  changeEmail = (uid: string, email: string) => {
    const mutation = changeEmailMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        uid,
        email
      },
      mutation
    });
  };

  sendPasswordResetEmail = (email: string) => {
    const query = sendPasswordResetEmailQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        email
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  allowNotifications = (notification: any, oid: string) => {
    const mutation = allowNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        input: notification,
        oid
      },
      mutation
    });
  };

  createSMS = (notification: any, oid: string) => {
    const mutation = allowSMSNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        input: notification,
        oid
      },
      mutation
    });
  };

  getUserConnections = (oid: string, uid: string) => {
    const query = getUserConnectionsQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        oid,
        uid
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  createOrUpdateConnection = (conn: any) => {
    const mutation = createOrUpdateConnectionMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        input: conn
      },
      mutation
    });
  };

  disconnect = (conn: any) => {
    const mutation = disconnectConnectionMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        input: conn
      },
      mutation
    });
  };

  alreadyOnboarded = (oid: string, uid: string) => {
    const query = alreadyOnboardedQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        oid,
        uid
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  completeOnboarding = (oid: string, uid: string) => {
    const mutation = completeOnboardingMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  clearDeviceCache = (oid: string, uid: string) => {
    const mutation = clearDeviceCacheMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  sendNotificationToAdmin = (
    oid: string,
    uid: string,
    from: string,
    subject: string,
    message: string
  ) => {
    const mutation = sendNotificationToAdminMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid,
        from,
        subject,
        msg: message
      },
      mutation
    });
  };

  pauseNotifications = (oid: string, uid: string) => {
    const mutation = pauseNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  resumeNotifications = (oid: string, uid: string) => {
    const mutation = resumeNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  pauseSMSNotifications = (oid: string, uid: string) => {
    const mutation = pauseSMSNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  resumeSMSNotifications = (oid: string, uid: string) => {
    const mutation = resumeSMSNotificationsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid
      },
      mutation
    });
  };

  getApproval = (id: string) => {
    const query = getApprovalQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        aid: id
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  getConnection = (cid: string) => {
    const query = getConnectionQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        cid
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  markApprovalsAs = (
    oid: string,
    uid: string,
    approvalsList: any[],
    status: string,
    subject: string
  ) => {
    const mutation = markApprovalsAsMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        approvals: approvalsList,
        oid,
        uid,
        status,
        subject
      },
      mutation
    });
  };

  addComment = (id: string, comment: string) => {
    const mutation = addCommentMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        aid: id,
        comment
      },
      mutation
    });
  };

  updateContent = (id: string, content: string) => {
    const mutation = updateContentMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        input: {
          id,
          content
        }
      },
      mutation
    });
  };

  getUserInsights = (
    oid: string,
    uid: string,
    lastInsightID: string,
    numberOfResultsToGrab: number
  ) => {
    const query = getUserInsightsQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        oid,
        uid,
        lastInsightID,
        numberOfResultsToGrab
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  getReport = (oid: string, uid: string) => {
    const query = getReportQuery;
    const client = apolloClientAccessor.getClient();
    return client.query({
      variables: {
        oid,
        uid
      },
      query,
      fetchPolicy: "network-only"
    });
  };

  shareViaQnary = (
    oid: string,
    uid: string,
    connectionId: string,
    source: string,
    content: string
  ) => {
    const mutation = shareViaQnaryMutation;
    const client = apolloClientAccessor.getClient();
    return client.mutate({
      variables: {
        oid,
        uid,
        connectionId,
        source,
        content
      },
      mutation
    });
  };
}

const dataService = new DataService();
export default dataService;
