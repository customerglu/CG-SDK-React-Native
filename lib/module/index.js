import { Platform } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// Import native components
import BannerWidget from './specs/BannerWidget';
import EmbedBannerWidget from './specs/EmbedBannerWidget';
const LINKING_ERROR = `The package '@customerglu/react-native-customerglu' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';

// Get the native module
const CustomerGluModule = TurboModuleRegistry.getEnforcing('Rncustomerglu');
if (!CustomerGluModule) {
  throw new Error(LINKING_ERROR);
}

// Export native components
export { BannerWidget, EmbedBannerWidget };

// Export module methods
export const {
  registerDevice,
  sendData,
  dataClear,
  testIntegration,
  loadCampaignById,
  loadCampaignWithUrl,
  openWallet,
  initCGSDK,
  enableAnalytic,
  allowAnonymousRegistration,
  disableGluSdk,
  configureLoaderColour,
  configureDarkBackgroundColor,
  configureLightBackgroundColor,
  configureStatusBarColour,
  configureLoadingScreenColor,
  enablePrecaching,
  gluSDKDebuggingMode,
  enableEntryPoints,
  handleDeepLinkUri,
  closeWebView,
  isCampaignValid,
  getCampaignStatus,
  setOpenWalletAsFallback,
  addMarginsForPIP,
  addDelayForPIP,
  SetDefaultBannerImage,
  UpdateUserAttributes,
  UpdateProfile,
  DisplayCGNotification,
  DisplayCGBackgroundNotification,
  GetRefferalId,
  LoadAllCampagins,
  LoadCampaginsByFilter,
  SetCurrentClassName,
  SetCGCurrentClassName,
  configureWhiteListedDomains,
  configureDomainCodeMsg
} = CustomerGluModule;
export default CustomerGluModule;
//# sourceMappingURL=index.js.map