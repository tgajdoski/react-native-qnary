import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.Layout2.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    padding: 0
  },
  contentContainer: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  headerBackground: {
    height: 330.5,
    width: "100%"
  },
  mainContentContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },
  footer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    paddingLeft: 15,
    paddingRight: 15
  },
  footerInner: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopColor: "#F1F1F1",
    borderTopWidth: 1
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
