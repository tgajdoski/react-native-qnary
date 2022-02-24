import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ForgotPasswordLink.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    alignItems: "flex-end",
    marginBottom: 15
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
