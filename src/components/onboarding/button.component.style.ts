import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.Button.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    borderRadius: 4
  },
  button: {
    width: "100%",
    height: 51
  },
  buttonContentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContentInnerContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 21
  },
  spinner: { paddingLeft: 5 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
