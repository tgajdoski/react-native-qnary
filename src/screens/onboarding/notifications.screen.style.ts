import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Notifications.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },
  contentContainerInner: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 30
  },
  screenDescriptionContainer: {
    paddingBottom: 15
  },
  inputWrapper: { flexDirection: "row" },
  input: {
    borderColor: "#535358",
    borderRadius: 0
  },
  allowNotificationsContainer: { paddingLeft: 20 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
