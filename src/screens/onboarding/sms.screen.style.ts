import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.SMS.Screen";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    height: "30%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15
  },
  screenTitleContainer: {
    paddingTop: 15
  },
  screenDescriptionContainer: {
    paddingTop: 15
  },
  input: {
    width: "100%",
    color: "#5B5A5A",
    backgroundColor: "#fff"
  },
  inputTextStyle: {
    backgroundColor: "#fff",
    height: 40,
    borderBottomColor: "#5B5A5A",
    borderBottomWidth: 1
  },
  inputFlagStyle: {
    padding: 5
  },
  inputWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 4
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
