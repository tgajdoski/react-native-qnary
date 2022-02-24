import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.DigitalFootprint.Screen";

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
  titleContainer: {
    paddingTop: 10
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
