import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.TwitterProfile.Component";

export const generateStyle = (variables = variable) => ({
  actor: { flexDirection: "row", height: 80, paddingRight: 20 },
  actorImage: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 20
  },
  nameContainer: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  text: { color: "#434343", fontSize: 12, lineHeight: 15 },
  displayName: { fontWeight: "bold" },
  summary: { color: "#434343", fontSize: 15, lineHeight: 20 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
