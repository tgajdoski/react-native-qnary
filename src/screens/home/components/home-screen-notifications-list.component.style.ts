import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.HomeScreenNotificationsList.Component";

export const generateStyle = (variables = variable) => ({
  separator: {
    width: 20,
    height: "100%"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
