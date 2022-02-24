import { dataService } from "../../../data";
import { logger } from "../../../services";

import Deffered from "es6-deferred";

import orderBy from "lodash/orderBy";

const getApprovalsIntl = async (oid: string, uid: string, status: string) => {
  let approvals = [];
  try {
    const {
      data: { userapprovals }
    } = await dataService.getUserApprovals(oid, uid, status);
    approvals = orderBy(
      userapprovals,
      ["publish.published_at", "publish_at", "updated_at", "created_at"],
      ["desc", "desc", "desc", "desc"]
    );
  } catch (err) {
    logger.error(err);
  }
  return approvals;
};

const omitTypename = (key: string, value: any) => {
  return key === "__typename" ? undefined : value;
};

const cleanTypeFiels = (approvals: any[]) => {
  const approvalscleand = [];
  for (const app of approvals) {
    approvalscleand.push(JSON.parse(JSON.stringify(app), omitTypename));
  }
  return approvalscleand;
};

const updateComment = (id: string, comment: string) => {
  const d = new Deffered();
  dataService.addComment(id, comment).then(
    (response: any) => {
      const {
        data: { addApprovalComment }
      } = response;
      if (addApprovalComment.isSuccess) {
        d.resolve(true);
      } else {
        d.reject(
          "an error occured while trying to update the approval comment."
        );
      }
    },
    (err: any) => {
      logger.error(err);
      d.reject("an error occured while trying to update the approval comment.");
    }
  );
  return d;
};

const updateContent = (id: string, content: string) => {
  const d = new Deffered();
  dataService.updateContent(id, content).then(
    (response: any) => {
      const {
        data: { updateApproval }
      } = response;

      if (updateApproval.id) {
        d.resolve(true);
      } else {
        d.reject(
          "an error occured while trying to update the approval content."
        );
      }
    },
    (err: any) => {
      logger.error(err);
      d.reject("an error occured while trying to update the approval content.");
    }
  );
  return d;
};

const markApprovalAs = (
  id: any,
  status: string,
  oid: string,
  uid: string,
  subject: string
) => {
  const d = new Deffered();
  try {
    const approvalsList = [{ id }];
    dataService
      .markApprovalsAs(oid, uid, approvalsList, status, subject)
      .then((response: string) => {
        const {
          data: { markApprovalsAs }
        } = response;
        if (markApprovalsAs) {
          d.resolve(true);
        } else {
          d.reject(
            "an error occured while trying to mark the approval as " + status
          );
        }
      });
  } catch (err) {
    logger.log(err);
    d.reject("an error occured while trying to mark the approval as " + status);
  }
  return d.promise;
};

const approvalsService = {
  getPendingApprovals: async (oid: string, uid: string) => {
    const approvals = await getApprovalsIntl(oid, uid, "sent");
    dataService.updateUserPendingApprovalsCount(approvals.length);
    return approvals;
  },
  getApprovedApprovals: async (oid: string, uid: string) => {
    const approvals = await getApprovalsIntl(oid, uid, "approved");
    return approvals;
  },
  getRejectedApprovals: async (oid: string, uid: string) => {
    const approvals = await getApprovalsIntl(oid, uid, "deleted");
    return approvals;
  },
  markApprovalsAs: async (
    oid: string,
    uid: string,
    approvalsList: any[],
    status: string,
    subject: string
  ) => {
    const response = await dataService.markApprovalsAs(
      oid,
      uid,
      cleanTypeFiels(approvalsList),
      status,
      subject
    );
    return response;
  },
  updateComment,
  updateContent,
  markApprovalAs
};

export default approvalsService;
