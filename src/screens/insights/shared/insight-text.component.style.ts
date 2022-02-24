import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightText.Component";

export const generateStyle = (variables = variable) => ({
  text: {
    color: "#434343",
    fontSize: 15,
    lineHeight: 20
  },
  link: {
    color: "#0277bd",
    fontSize: 15,
    lineHeight: 20,
    textDecorationLine: "underline"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
