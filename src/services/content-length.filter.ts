import contentLengthService from "./content-length.service";

const contentLength = (content, source) =>
  contentLengthService.len(source, content).length;

const contentLengthFilter = {
  contentLength
};

export default contentLengthFilter;
