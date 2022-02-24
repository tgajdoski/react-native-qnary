import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.HomeScreenButton.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    width: 100,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10
  },
  image: { width: 29, height: 22 },
  contentContainer: { paddingTop: 3 },
  title: {
    color: "#FFFFFF",
    fontSize: 12
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
