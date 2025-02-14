import { Platform } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// Import native components
import BannerWidget from './specs/BannerWidget';
import EmbedBannerWidget from './specs/EmbedBannerWidget';
import type { Spec, NudgeConfiguration } from './NativeCustomerGlu';

const LINKING_ERROR =
  `The package '@customerglu/react-native-customerglu' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

// Get the native module
const CustomerGluModule =
  TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');

if (!CustomerGluModule) {
  throw new Error(LINKING_ERROR);
}

// Export native components
export { BannerWidget, EmbedBannerWidget };

// Export types
export type { NudgeConfiguration };

// Export module methods with proper types
export const {
  // Required methods
  initCGSDK,
  registerDevice,

  // Optional methods
  logout,
  clearGluData,
  dataClear,
  testIntegration,

  // Banner methods
  loadBanner,
  loadEmbedBanner,
  closeBanner,
  closeWebView,
  SetDefaultBannerImage,

  // Campaign methods
  loadCampaign,
  loadCampaignById,
  loadCampaignWithUrl,
  LoadAllCampagins,
  LoadCampaginsByFilter,
  isCampaignValid,
  getCampaignStatus,
  openWallet,
  openNotifications,
  openEntryPoint,
  enableEntryPoints,

  // Configuration methods
  configureLoaderColour,
  configureLoadingScreenColor,
  configureStatusBarColour,
  configureDarkBackgroundColor,
  configureLightBackgroundColor,
  configureWhiteListedDomains,
  configureDomainCodeMsg,
  enableDebugging,
  enableDarkMode,
  enablePrecaching,
  gluSDKDebuggingMode,

  // Event methods
  sendEventData,
  sendData,
  sendUserData,

  // Analytics methods
  enableAnalytics,
  enableAnalytic,
  disableAnalytics,

  // User methods
  UpdateUserAttributes,
  UpdateProfile,
  allowAnonymousRegistration,

  // Notification methods
  DisplayCGNotification,
  DisplayCGBackgroundNotification,

  // PIP methods
  addMarginsForPIP,
  addDelayForPIP,

  // Utility methods
  getDeviceId,
  getUserId,
  GetRefferalId,
  getDefaultLanguage,
  setDefaultLanguage,
  handleDeepLinkUri,
  setOpenWalletAsFallback,
  disableGluSdk,
  SetCurrentClassName,
  SetCGCurrentClassName,
} = CustomerGluModule;

export default CustomerGluModule;
