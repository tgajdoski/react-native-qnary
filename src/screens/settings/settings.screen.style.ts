import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Settings.Screen";

// import { AppLayout } from "../../constants";
// const { width } = AppLayout.window;

export const generateStyle = (variables = variable) => ({
  container: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    justifyContent: "center"
  },
  containerInner: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "#E5E5E5",
    borderRadius: 4
  },
  top: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "red",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 0.5
  },
  bottom: {
    width: "100%"
    // borderWidth: 1,
    // borderColor: "blue"
  },
  list: {},
  listItem: {
    height: 50,
    marginBottom: 5
  },
  item: { borderBottomWidth: 0 },
  left: { flex: 0.1 },
  body: {
    flex: 0.8,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  label: {
    paddingTop: 3,
    color: "#414141",
    fontSize: 14,
    lineHeight: 12
  },
  right: { flex: 0.1 },
  notificationContainer: {
    width: "100%",
    flexDirection: "column"
  },
  notificationContainer1: {
    width: "100%"
  },
  notificationContainer2: {
    paddingTop: 10,
    paddingBottom: 10
  },
  notificationsTitle: {
    color: "#414141",
    fontSize: 14,
    lineHeight: 17,
    paddingLeft: 0,
    marginLeft: 0
  },
  notificationsDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: "#979797"
  },
  resetCache: {
    color: "red",
    fontSize: 12
  },
  emailAdminButtonContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  emailAdminButton: {
    backgroundColor: "#fff",
    borderColor: "#0076CC",
    borderWidth: 0.7,
    height: 50
  },
  emailAdminButtonText: {
    color: "#2D2D2D",
    fontSize: 14,
    lineHeight: 12,
    paddingTop: 3
  },
  profileInfoEditImage: {
    width: 13,
    height: 14,
    bottom: -12,
    left: 12
  },
  change_password: { width: 23, height: 22 },
  change_email: { width: 20, height: 13 },
  choose_language: { width: 17, height: 17 },
  edit: { width: 13, height: 14 },
  sms_settings: { width: 19, height: 18 },
  email_administrator: { width: 13, height: 14 },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
