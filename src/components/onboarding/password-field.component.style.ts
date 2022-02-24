import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.OnBoarding.PasswordField.Component";

export const generateStyle = (variables = variable) => ({
  inputContainer: {
    marginBottom: 15
  },
  input: {
    height: 57,
    backgroundColor: "#F1F1F1",
    color: "#4B4B4B",
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: 15
  },
  showPasswordButton: {
    position: "absolute",
    top: 18,
    right: 10,
    opacity: 0.7
  },
  showPasswordImage: {
    zIndex: 99,
    width: 25,
    height: 25,
    tintColor: "rgba(0, 0, 0, 0.2)"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
