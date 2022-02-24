import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.HomeScreenLayout.Component";

export const generateStyle = (variables = variable) => ({
  background: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainerInner: {
    width: "100%",
    height: "90%",
    paddingLeft: 15,
    paddingRight: 15
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
