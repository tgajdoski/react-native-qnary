import variable from "../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.SideBar.Component";

import { AppLayout } from "../../constants";
const { isIphoneX } = AppLayout;

export const generateStyle = (variables = variable) => ({
  container: {
    backgroundColor: "#e2e2e2"
  },
  logoWrapper: {
    backgroundColor: "#0277bd",
    justifyContent: "center",
    alignItems: "center",
    height: isIphoneX ? 89 : 64
  },
  logo: {
    height: 60,
    width: 180,
    resizeMode: "contain"
  },
  menuItem: {
    backgroundColor: "#fff",
    marginLeft: 0,
    paddingLeft: 15,
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 0.5
  },
  menuItemIcon: {
    color: "#0277bd",
    fontSize: 20
  },
  menuItemText: {
    paddingLeft: 10,
    fontSize: 14
  },
  break: {
    height: 30,
    backgroundColor: "#eee"
  },
  badgeStyle: { position: "absolute", right: 15, top: 10 },
  badgeText: { fontSize: 12 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
