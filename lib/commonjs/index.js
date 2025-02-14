"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BannerWidget", {
  enumerable: true,
  get: function () {
    return _BannerWidget.default;
  }
});
exports.DisplayCGNotification = exports.DisplayCGBackgroundNotification = void 0;
Object.defineProperty(exports, "EmbedBannerWidget", {
  enumerable: true,
  get: function () {
    return _EmbedBannerWidget.default;
  }
});
exports.testIntegration = exports.setOpenWalletAsFallback = exports.setDefaultLanguage = exports.sendUserData = exports.sendEventData = exports.sendData = exports.registerDevice = exports.openWallet = exports.openNotifications = exports.openEntryPoint = exports.logout = exports.loadEmbedBanner = exports.loadCampaignWithUrl = exports.loadCampaignById = exports.loadCampaign = exports.loadBanner = exports.isCampaignValid = exports.initCGSDK = exports.handleDeepLinkUri = exports.gluSDKDebuggingMode = exports.getUserId = exports.getDeviceId = exports.getDefaultLanguage = exports.getCampaignStatus = exports.enablePrecaching = exports.enableEntryPoints = exports.enableDebugging = exports.enableDarkMode = exports.enableAnalytics = exports.enableAnalytic = exports.disableGluSdk = exports.disableAnalytics = exports.default = exports.dataClear = exports.configureWhiteListedDomains = exports.configureStatusBarColour = exports.configureLoadingScreenColor = exports.configureLoaderColour = exports.configureLightBackgroundColor = exports.configureDomainCodeMsg = exports.configureDarkBackgroundColor = exports.closeWebView = exports.closeBanner = exports.clearGluData = exports.allowAnonymousRegistration = exports.addMarginsForPIP = exports.addDelayForPIP = exports.UpdateUserAttributes = exports.UpdateProfile = exports.SetDefaultBannerImage = exports.SetCurrentClassName = exports.SetCGCurrentClassName = exports.LoadCampaginsByFilter = exports.LoadAllCampagins = exports.GetRefferalId = void 0;
var _reactNative = require("react-native");
var _BannerWidget = _interopRequireDefault(require("./specs/BannerWidget"));
var _EmbedBannerWidget = _interopRequireDefault(require("./specs/EmbedBannerWidget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import native components

const LINKING_ERROR = `The package '@customerglu/react-native-customerglu' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';

// Get the native module
const CustomerGluModule = _reactNative.TurboModuleRegistry.getEnforcing('NativeCustomerGlu');
if (!CustomerGluModule) {
  throw new Error(LINKING_ERROR);
}

// Export native components

// Export types

// Export module methods with proper types
const {
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
  SetCGCurrentClassName
} = CustomerGluModule;
exports.SetCGCurrentClassName = SetCGCurrentClassName;
exports.SetCurrentClassName = SetCurrentClassName;
exports.disableGluSdk = disableGluSdk;
exports.setOpenWalletAsFallback = setOpenWalletAsFallback;
exports.handleDeepLinkUri = handleDeepLinkUri;
exports.setDefaultLanguage = setDefaultLanguage;
exports.getDefaultLanguage = getDefaultLanguage;
exports.GetRefferalId = GetRefferalId;
exports.getUserId = getUserId;
exports.getDeviceId = getDeviceId;
exports.addDelayForPIP = addDelayForPIP;
exports.addMarginsForPIP = addMarginsForPIP;
exports.DisplayCGBackgroundNotification = DisplayCGBackgroundNotification;
exports.DisplayCGNotification = DisplayCGNotification;
exports.allowAnonymousRegistration = allowAnonymousRegistration;
exports.UpdateProfile = UpdateProfile;
exports.UpdateUserAttributes = UpdateUserAttributes;
exports.disableAnalytics = disableAnalytics;
exports.enableAnalytic = enableAnalytic;
exports.enableAnalytics = enableAnalytics;
exports.sendUserData = sendUserData;
exports.sendData = sendData;
exports.sendEventData = sendEventData;
exports.gluSDKDebuggingMode = gluSDKDebuggingMode;
exports.enablePrecaching = enablePrecaching;
exports.enableDarkMode = enableDarkMode;
exports.enableDebugging = enableDebugging;
exports.configureDomainCodeMsg = configureDomainCodeMsg;
exports.configureWhiteListedDomains = configureWhiteListedDomains;
exports.configureLightBackgroundColor = configureLightBackgroundColor;
exports.configureDarkBackgroundColor = configureDarkBackgroundColor;
exports.configureStatusBarColour = configureStatusBarColour;
exports.configureLoadingScreenColor = configureLoadingScreenColor;
exports.configureLoaderColour = configureLoaderColour;
exports.enableEntryPoints = enableEntryPoints;
exports.openEntryPoint = openEntryPoint;
exports.openNotifications = openNotifications;
exports.openWallet = openWallet;
exports.getCampaignStatus = getCampaignStatus;
exports.isCampaignValid = isCampaignValid;
exports.LoadCampaginsByFilter = LoadCampaginsByFilter;
exports.LoadAllCampagins = LoadAllCampagins;
exports.loadCampaignWithUrl = loadCampaignWithUrl;
exports.loadCampaignById = loadCampaignById;
exports.loadCampaign = loadCampaign;
exports.SetDefaultBannerImage = SetDefaultBannerImage;
exports.closeWebView = closeWebView;
exports.closeBanner = closeBanner;
exports.loadEmbedBanner = loadEmbedBanner;
exports.loadBanner = loadBanner;
exports.testIntegration = testIntegration;
exports.dataClear = dataClear;
exports.clearGluData = clearGluData;
exports.logout = logout;
exports.registerDevice = registerDevice;
exports.initCGSDK = initCGSDK;
var _default = exports.default = CustomerGluModule;
//# sourceMappingURL=index.js.map