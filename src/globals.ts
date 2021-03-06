// fonts
import GlobalFont from "react-native-global-font";

import firebase from "react-native-firebase";

const defaultHandler = global.ErrorUtils.getGlobalHandler();
const crashlytics = firebase.crashlytics();

const configureGlobals = (callback: () => void) => {
  // apply Proxima Nova as defult font
  GlobalFont.applyGlobal("Proxima Nova");

  global.ErrorUtils.setGlobalHandler((...args) => {
    const error = args[0] || "Unknown";
    console.log("Crashlytics error sent", error);

    if (error instanceof Error) {
      crashlytics.setStringValue("stack", `${error.stack}`);
      crashlytics.recordError(0, `RN Fatal: ${error.message}`);
    } else {
      // Have never gotten this log so far. Might not be necessary.
      crashlytics.recordError(0, `RN Fatal: ${error}`);
    }

    defaultHandler.apply(this, args);
  });

  callback();
};

export default configureGlobals;
