import variable from "../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
