import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ChangePassword0.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  ShowPasswordsView: {
    display: "flex",
    flexDirection: "row"
  },
  ShowPasswordsLabelWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  ShowPasswordsSwitchWrapper: {
    flex: 1,
    alignItems: "flex-end"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
