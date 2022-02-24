import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.SocialLogins.Component";

export const generateStyle = (variables = variable) => ({
  container: {},
  innerContainer1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  innerContainer2: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 15
  },
  innerContainer3: {
    alignItems: "center"
  },
  innerContainer31: { width: "80%" },
  innerContainer32: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: { color: "#939393", fontSize: 14, lineHeight: 17 },
  horizontalLine: {
    borderBottomWidth: 0.7,
    borderBottomColor: "#F1F1F1",
    width: "40%",
    margin: 15
  },
  verticalLine: {
    borderLeftWidth: 0.7,
    borderLeftColor: "#F1F1F1"
  },
  oRcontainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
