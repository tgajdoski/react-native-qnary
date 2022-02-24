import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ListItemCommentEditor.Component";

import { AppLayout } from "../../../constants";
const { window } = AppLayout;

export const generateStyle = (variables = variable) => ({
  textarea: {
    width: window.width - 40,
    height: "90%",
    backgroundColor: "#F1F1F1",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: "#4B4B4B"
  },
  item: { paddingTop: 0, borderBottomWidth: 0 },
  left: { alignItems: "center" },
  right: { alignItems: "center" }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
