import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Content.Screen";

export const generateStyle = (variables = variable) => ({
  activeTabStyle: {
    backgroundColor: "#3A7BD5"
  },
  tab: { backgroundColor: "#FBFBFB" },
  tabStyle: {
    backgroundColor: "#3A7BD5"
  },
  tabLabel: { color: "#fff", fontSize: 16 },
  editContainer: { padding: 20, backgroundColor: "#FFF" },
  commentContainer: { padding: 20, backgroundColor: "#FFF" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
