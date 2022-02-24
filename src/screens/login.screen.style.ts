import variable from "../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Login.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  loginFormContainer: {
    flex: 2,
    justifyContent: "flex-start"
  },
  socialLoginContainer: {
    flex: 1,
    justifyContent: "flex-start"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
