import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightCategory.Component";

export const generateStyle = (variables = variable) => ({
  text: { fontSize: 15, lineHeight: 20, color: "#000" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
