import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Home.Screen";

export const generateStyle = (variables = variable) => ({
  container: { flex: 1 },
  title: {
    fontSize: 28,
    color: "#fff",
    lineHeight: 34
  },
  logoContainer: {
    flex: 0.18,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  topContainer: {
    flex: 0.35,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  bottomContainer: {
    flex: 0.47
  },
  buttonsContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between"
  },
  notificationsContainer: {
    marginTop: 30,
    width: "100%",
    height: 110
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
