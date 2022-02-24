import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.TextField.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    marginBottom: 15
  },
  input: {
    height: 57,
    backgroundColor: "#F1F1F1",
    color: "#4B4B4B",
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: 15
  },
  image: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 9,
    top: 9
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
