import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ShareViaQnaryRow.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  item: { width: 70, height: 50, paddingTop: 7 },
  insightShare: { width: 70, height: 50 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
