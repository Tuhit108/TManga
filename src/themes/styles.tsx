import { getStatusBarHeight } from "react-native-status-bar-height";
import { Platform } from "react-native";

export const statusBarHeight = Platform.OS == "ios"
  ? getStatusBarHeight()
  : getStatusBarHeight();

