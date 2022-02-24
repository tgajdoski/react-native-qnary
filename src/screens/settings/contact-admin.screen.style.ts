import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ContactAdmin.Screen";

import { AppLayout } from "../../constants";
const { window } = AppLayout;

export const generateStyle = (variables = variable) => ({
  body: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20
  },
  textarea: {
    color: "#4B4B4B",
    backgroundColor: "#f1f1f1",
    width: window.width - 40,
    height: "90%"
  },
  item: { paddingTop: 10, borderBottomWidth: 0 },
  left: { alignItems: "center" },
  right: { alignItems: "center" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
