import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.LoginForm.Component";

export const generateStyle = (variables = variable) => ({
  container: {}
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
