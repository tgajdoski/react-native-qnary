import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Welcome.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    flex: 2,
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center"
  },
  titleContainer: {
    paddingTop: 10
  },
  descriptionContainer: {
    paddingTop: 10
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
