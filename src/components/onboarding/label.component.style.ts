import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.Label.Component";

export const generateStyle = (variables = variable) => ({
  label: {
    color: "#686868",
    fontSize: 12,
    lineHeight: 18
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
