import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ListItemFooter.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text: { fontSize: 14, color: "#737373" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
