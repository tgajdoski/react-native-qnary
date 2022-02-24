import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.NetworkName.Component";

export const generateStyle = (variables = variable) => ({
  text: { fontSize: 11, lineHeight: 18 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
