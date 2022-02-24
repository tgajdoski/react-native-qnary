import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.ScreenTitle.Component";

export const generateStyle = (variables = variable) => ({
  text: {
    color: "#FFFFFF",
    fontSize: 19.5,
    lineHeight: 27
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
