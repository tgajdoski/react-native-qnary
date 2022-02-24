import updateCurrentUser from "./update-current-user.resolver";
import updateUserToken from "./update-user-token.resolver";
import updateUserPendingApprovalsCount from "./update-user-pending-approvals-count.resolver";

export default {
  Mutation: {
    updateCurrentUser,
    updateUserToken,
    updateUserPendingApprovalsCount
  }
};
