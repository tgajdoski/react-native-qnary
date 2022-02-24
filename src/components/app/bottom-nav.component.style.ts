import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.BottomNav.Component";

export const generateStyle = (variables = variable) => ({
  image: {
    width: 27,
    height: 20
  },
  button: { height: "100%" },
  footer: {
    backgroundColor: "#fff",
    height: 65,
    borderTopColor: "#EFEFEF"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
