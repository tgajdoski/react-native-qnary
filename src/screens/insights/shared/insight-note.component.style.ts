import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightNote.Component";

export const generateStyle = (variables = variable) => ({
  tagsStyles: {
    p: { color: "#0277bd", fontSize: 15, lineHeight: 19 },
    strong: { color: "#0277bd", fontSize: 15, lineHeight: 19 }
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
