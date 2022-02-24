import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Layout.Component";

export const generateStyle = (variables = variable) => ({
  header: { backgroundColor: "#3A7BD5" },
  left: { flex: 0.1 },
  body: {
    flex: 0.8
  },
  headerInner: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: { fontSize: 18, width: "100%", color: "#fff" },
  right: { flex: 0.1 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
