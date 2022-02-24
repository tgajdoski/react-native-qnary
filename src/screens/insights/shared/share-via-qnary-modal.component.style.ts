import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ShareViaQnaryModal.Component";

import { AppLayout } from "../../../constants";
const { height } = AppLayout.window;

export const generateStyle = (variables = variable) => ({
  header: { backgroundColor: "#3A7BD5" },
  left: { flex: 0.3 },
  body: { flex: 0.4 },
  right: { flex: 0.3 },
  textarea: {
    height,
    color: "#4B4B4B"
  },
  footer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 5
  },
  connectionContainer: { padding: 10 },
  cancel: { fontSize: 12, lineHeight: 15, color: "#fff" },
  title: { fontSize: 15, color: "#fff" },
  connection: { flexDirection: "row" },
  userAvatar: { width: 60, height: 60 },
  nameContainer: { paddingLeft: 10 },
  displayName: { fontSize: 15 },
  networkName: { fontSize: 12 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
