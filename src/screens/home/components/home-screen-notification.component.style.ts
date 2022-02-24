import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.HomeScreenNotification.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  containerInner: { flexDirection: "row" },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%"
  },
  imageBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(20, 180, 241, 0.17)"
  },
  imageButtonWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    width: "75%",
    paddingLeft: 15,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  title: {
    fontSize: 19,
    lineHeight: 21,
    color: "#515151"
  },
  description: {
    fontSize: 13,
    lineHeight: 15,
    color: "#515151"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
