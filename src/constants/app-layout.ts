import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const isIphoneX = Platform.OS === "ios" && (height === 812 || width === 812);

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  isIphoneX
};
