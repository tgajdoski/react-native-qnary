import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ListItemActions.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    borderColor: "#EFEFEF",
    borderWidth: 0.5,
    borderRadius: 50
  },
  containerInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
