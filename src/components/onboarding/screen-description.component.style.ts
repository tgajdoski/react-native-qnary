import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.ScreenDescription.Component";

export const generateStyle = (variables = variable) => ({
  text: {
    color: "#2D2D34",
    fontSize: 14,
    lineHeight: 21
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
