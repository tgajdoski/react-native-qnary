import contentLengthService from "./content-length.service";

const countdown = (content, source, max) => {
  const len = contentLengthService.len(source, content, max);
  return len.remaining;
};

const countdownFilter = {
  countdown
};

export default countdownFilter;
