import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.NoApprovals.Component";

export const generateStyle = (variables = variable) => ({
  list: { minHeight: 200 },
  listItem: { borderBottomWidth: 0 },
  noContentContainer: { flex: 1, alignItems: "center" },
  title: { fontSize: 18 },
  description: { fontSize: 12 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
