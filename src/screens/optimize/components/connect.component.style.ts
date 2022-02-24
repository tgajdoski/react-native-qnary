import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Connect.Component";

export const generateStyle = (variables = variable) => ({
  container: { flex: 1, justifyContent: "flex-start", paddingTop: 20 },
  socialNetworks: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    justifyContent: "space-between"
  },
  networkItemDivider: {
    width: 15
  },
  userConnections: { paddingTop: 20 },
  userConnectionDivider: { height: 15 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
