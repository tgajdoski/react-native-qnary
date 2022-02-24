import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightShare.Component";

export const generateStyle = (variables = variable) => ({
  container: { marginTop: 10 },
  text: {
    color: "#434343",
    fontSize: 15,
    lineHeight: 20
  },
  icon: { fontSize: 14 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
