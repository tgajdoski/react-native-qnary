import _ from "lodash";

import socialFieldsService from "./social-fields.service";

const isPublishAvailable = list =>
  _.filter(list, c => {
    const service = socialFieldsService[c.source];
    if (!service) {
      return false;
    }

    return service.isPublishSupported(c);
  });

const find = (list, predicate) => _.find(list, predicate);

const organizationUserConnections = {
  isPublishAvailable,
  find
};

export default organizationUserConnections;
