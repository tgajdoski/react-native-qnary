import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ConnectNetwork.Component";

export const generateStyle = (variables = variable) => ({
  horizontal_view_container: {
    height: 75,
    width: 75,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  horizontal_view_networkIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  horizontal_view_networkName: {
    paddingTop: 10
  },
  vertical_view_container: {
    height: 60,
    width: "100%",
    backgroundColor: "#FFF"
  },
  vertical_view_containerInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  vertical_view_networkIcon: {
    width: "10%",
    paddingLeft: 15,
    alignItems: "flex-start"
  },
  vertical_view_networkName: {
    width: "80%",
    paddingLeft: 15,
    alignItems: "flex-start"
  },
  vertical_view_remove: {
    width: "10%",
    paddingRight: 15,
    alignItems: "flex-end"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
