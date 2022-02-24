import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.Report.Screen";

import { AppLayout } from "../../constants";

const { width } = AppLayout.window;

export const generateStyle = (variables = variable) => ({
  list: {
    width
  },
  listItem: {
    color: "#0277bd",
    fontSize: 15
  },
  listItemLogo: {
    color: "#0277bd",
    width: 30
  },
  deleteConnection: {
    color: "#0277bd"
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
