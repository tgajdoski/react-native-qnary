import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightBase.Component";

export const generateStyle = (variables = variable) => ({
  card: {
    borderRadius: 4,
    backgroundColor: "#fff",
    borderLeftColor: "#EFEFEF",
    borderLeftWidth: 0.5,
    borderRightColor: "#EFEFEF",
    borderRightWidth: 0.5,
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 0.5
  },
  header: {
    borderLeftWidth: 4,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 10,
    marginBottom: 0,
    justifyContent: "center"
  },
  header_item: { borderBottomWidth: 0 },
  header_left: { flex: 0.8 },
  header_left1: { flexDirection: "column" },
  header_right: { flex: 0.2 },
  full: { width: "100%" },
  created_at: {
    fontSize: 12,
    lineHeight: 15,
    color: "#737373"
  },
  bodyInnerContiner: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 10,
    marginBottom: 0,
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.7,
    borderBottomColor: "#EFEFEF"
  },
  footer: {
    paddingTop: 0,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 50
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
