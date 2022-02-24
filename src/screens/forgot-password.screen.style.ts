import variable from "../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ForgotPassword.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  descriptionContainer: {
    alignItems: "flex-start",
    marginBottom: 15
  },
  header: {
    width: "100%",
    height: "100%",
    paddingLeft: 50,
    paddingTop: 80,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  titleContainer: {
    paddingTop: 30
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
