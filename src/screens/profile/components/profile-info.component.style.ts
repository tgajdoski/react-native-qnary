import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ProfileInfo.Component";

export const generateStyle = (variables = variable) => ({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  userProfileAvartar: {
    borderWidth: 0.7,
    borderColor: "#ddd",
    borderStyle: "dashed",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  userProfileAvatarContent: {
    width: 96,
    height: 96,
    backgroundColor: "#fff",
    borderRadius: 48
  },
  userProfileAvatarBadge: {
    borderWidth: 0.3,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    left: -15
  },
  userProfileQnaryLogo: {
    bottom: -10,
    left: 10,
    width: 20,
    height: 20
  },

  list1: {
    paddingTop: 10
  },
  list1Item: {
    paddingTop: 2,
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  profileName: {
    fontSize: 19,
    color: "#000000"
  },
  list1Item1: {
    paddingTop: 0,
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  email: {
    fontSize: 12,
    color: "#6B6B6B"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
