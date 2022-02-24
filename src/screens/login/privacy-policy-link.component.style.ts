import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.PrivacyPolicyLink.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
