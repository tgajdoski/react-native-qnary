import _ from "lodash";

import socialFieldsService from "./social-fields.service";

const maxLength = (source: any) =>
  _.get(socialFieldsService, [source, "content", "max"], -1);

const maxContentLengthFilter = {
  maxLength
};

export default maxContentLengthFilter;
