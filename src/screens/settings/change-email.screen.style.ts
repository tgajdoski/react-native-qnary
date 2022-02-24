import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ChangeEmail.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    height: "40%",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },
  screenTitleContainer: {
    paddingTop: 15
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
