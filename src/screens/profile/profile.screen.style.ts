import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Profile.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FBFBFB",
    alignItems: "center"
  },
  containerInner: {
    height: "100%",
    width: "90%",
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "#E5E5E5",
    borderRadius: 4
  },
  top: {
    height: "50%",
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 0.5
  },
  bottom: {
    height: "50%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  list2: {
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20
  },
  list2Item: {
    borderBottomWidth: 0
  },
  networkIconBadge: {
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 0,
    bottom: -8
  },
  networkIconBadgeInner: {
    zIndex: 2,
    borderWidth: 0.7,
    borderColor: "#3B5999",
    backgroundColor: "#3B5999",
    opacity: 0.15,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  networkIconWrapper: {
    zIndex: 3,
    left: 8
  },
  connectionName: {
    paddingLeft: 25,
    color: "#4D4A4A",
    fontSize: 13,
    lineHeight: 17
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
