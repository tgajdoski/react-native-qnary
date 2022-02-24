import React from "react";
import * as PropTypes from "prop-types";

import { Picker, Icon } from "native-base";

import { approvalsService } from "./services";
import { logger, dialogService } from "../../services";
import { withLocalization } from "../../components/hoc";

@withLocalization
class ContentScreenHeaderRight extends React.Component<{
  currentUser: any;
  approvals: any[];
  onRefresh: () => void;
}> {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    approvals: PropTypes.array,
    onRefresh: PropTypes.func
  };

  onMarkApprovalsAs = async (value: string) => {
    // https://github.com/facebook/react-native/issues/10471
    setTimeout(() => {
      try {
        let status = "";
        if (value === "0") {
          status = "approved";
        } else if (value === "1") {
          status = "rejected";
        } else {
          return;
        }

        const {
          t,
          currentUser: { oid, uid },
          approvals,
          onRefresh
        } = this.props;

        const subject = t("MESSAGE_ADMIN:MESSAGE_FROM");

        const templateKey =
          status === "approved"
            ? "CONTENT:SCHEDULED_FOR_PUBLISH"
            : "CONTENT:ADMIN_NOTIFIED";

        dialogService
          .confirm({
            title: t(`CONTENT:${status.toUpperCase()}_ALL`),
            template: t(templateKey),
            okText: t("GENERIC:OKAY_BUTTON"),
            cancelText: t("GENERIC:CANCEL_BUTTON")
          })
          .then(
            () => {
              approvalsService
                .markApprovalsAs(oid, uid, approvals, status, subject)
                .then(
                  response => {
                    const {
                      data: { markApprovalsAs }
                    } = response;
                    if (markApprovalsAs) {
                      onRefresh();
                    }
                  },
                  (err: any) => {
                    logger.error(err);
                  }
                );
            },
            () => {
              logger.log("UNDO"); // eslint-disable-line
            }
          );
      } catch (err) {
        logger.log(err);
      }
    }, 600);
  };

  render() {
    const { t } = this.props;
    return (
      <Picker
        note={true}
        mode="dropdown"
        style={{ flex: 1, width: 120 }}
        iosIcon={<Icon name="ios-more" style={{ color: "#fff" }} />}
        onValueChange={this.onMarkApprovalsAs}
      >
        <Picker.Item label={t("CONTENT:APPROVED_ALL")} value="0" />
        <Picker.Item label={t("CONTENT:REJECTED_ALL")} value="1" />
        <Picker.Item label={t("GENERIC:CANCEL_BUTTON")} value="2" />
      </Picker>
    );
  }
}

export default ContentScreenHeaderRight;
