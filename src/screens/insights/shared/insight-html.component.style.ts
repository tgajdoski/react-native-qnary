import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightHtml.Component";

export const generateStyle = (variables = variable) => ({
  tagsStylesDefault: {
    div: {},
    span: {
      color: "#434343",
      fontSize: 15,
      lineHeight: 20
    },
    a: {
      color: "#0277bd",
      fontSize: 15,
      lineHeight: 20
    },
    p: { color: "#434343", fontSize: 15, lineHeight: 20 }
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
