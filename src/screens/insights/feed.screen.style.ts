import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Feed.Screen";

export const generateStyle = (variables = variable) => ({
  noContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    backgroundColor: "#FBFBFB"
  },
  list: {},
  listItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 0,
    paddingRight: 10
  },
  moreButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 20
  },
  more: {
    color: "#fff"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
