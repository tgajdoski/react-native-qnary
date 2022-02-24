import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ListItemHeader.Component";

export const generateStyle = (variables = variable) => ({
  item: { borderBottomWidth: 0 },
  right: { flex: 0, width: 10 },
  connectionContainer: { flexDirection: "row" },
  connectionContainerInner: { width: 32, height: 32 },
  headerContainer: { paddingLeft: 10 },
  fullName: { fontSize: 15, lineHeight: 20, color: "#000000" },
  displayName: { fontSize: 12, lineHeight: 15, color: "#737373" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
