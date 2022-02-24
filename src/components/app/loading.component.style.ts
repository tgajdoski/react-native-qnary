import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Loading.Component";

export const generateStyle = (variables = variable) => ({
  container: { flex: 1, alignItems: "center", justifyContent: "center" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
