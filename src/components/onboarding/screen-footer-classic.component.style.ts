import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.ScreenFooterClassic.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    paddingLeft: 15,
    paddingRight: 15
  },
  innerContainer: {
    width: "100%",
    height: 72,
    justifyContent: "center",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  skipButton: {
    color: "#6F6F6F",
    textTransform: "uppercase",
    fontSize: 14,
    lineHeight: 21
  },
  step: {
    color: "#6F6F6F",
    fontSize: 14,
    lineHeight: 21
  },
  steps: {
    color: "#EFEFEF",
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: 2
  },
  nextButton: {
    color: "#3A7BD6",
    textTransform: "uppercase",
    fontSize: 14,
    lineHeight: 21
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
