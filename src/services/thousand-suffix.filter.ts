import { isNaN } from "lodash";

const thousandSuffixFilter = {
  format: (input: number, decimals: number) => {
    const suffixes = ["k", "M", "G", "T", "P", "E"];

    if (isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    const exp = Math.floor(Math.log(input) / Math.log(1000));
    return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
  }
};

export default thousandSuffixFilter;
