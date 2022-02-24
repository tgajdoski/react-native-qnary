import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.LanguagePickerLink.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  textWrapper: {
    paddingLeft: 5,
    paddingRight: 5
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
