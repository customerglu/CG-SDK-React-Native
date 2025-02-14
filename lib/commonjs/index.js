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
exports.testIntegration = exports.setOpenWalletAsFallback = exports.sendData = exports.registerDevice = exports.openWallet = exports.loadCampaignWithUrl = exports.loadCampaignById = exports.isCampaignValid = exports.initCGSDK = exports.handleDeepLinkUri = exports.gluSDKDebuggingMode = exports.getCampaignStatus = exports.enablePrecaching = exports.enableEntryPoints = exports.enableAnalytic = exports.disableGluSdk = exports.default = exports.dataClear = exports.configureWhiteListedDomains = exports.configureStatusBarColour = exports.configureLoadingScreenColor = exports.configureLoaderColour = exports.configureLightBackgroundColor = exports.configureDomainCodeMsg = exports.configureDarkBackgroundColor = exports.closeWebView = exports.allowAnonymousRegistration = exports.addMarginsForPIP = exports.addDelayForPIP = exports.UpdateUserAttributes = exports.UpdateProfile = exports.SetDefaultBannerImage = exports.SetCurrentClassName = exports.SetCGCurrentClassName = exports.LoadCampaginsByFilter = exports.LoadAllCampagins = exports.GetRefferalId = void 0;
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
const CustomerGluModule = _reactNative.TurboModuleRegistry.getEnforcing('Rncustomerglu');
if (!CustomerGluModule) {
  throw new Error(LINKING_ERROR);
}

// Export native components

// Export module methods
const {
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
exports.configureDomainCodeMsg = configureDomainCodeMsg;
exports.configureWhiteListedDomains = configureWhiteListedDomains;
exports.SetCGCurrentClassName = SetCGCurrentClassName;
exports.SetCurrentClassName = SetCurrentClassName;
exports.LoadCampaginsByFilter = LoadCampaginsByFilter;
exports.LoadAllCampagins = LoadAllCampagins;
exports.GetRefferalId = GetRefferalId;
exports.DisplayCGBackgroundNotification = DisplayCGBackgroundNotification;
exports.DisplayCGNotification = DisplayCGNotification;
exports.UpdateProfile = UpdateProfile;
exports.UpdateUserAttributes = UpdateUserAttributes;
exports.SetDefaultBannerImage = SetDefaultBannerImage;
exports.addDelayForPIP = addDelayForPIP;
exports.addMarginsForPIP = addMarginsForPIP;
exports.setOpenWalletAsFallback = setOpenWalletAsFallback;
exports.getCampaignStatus = getCampaignStatus;
exports.isCampaignValid = isCampaignValid;
exports.closeWebView = closeWebView;
exports.handleDeepLinkUri = handleDeepLinkUri;
exports.enableEntryPoints = enableEntryPoints;
exports.gluSDKDebuggingMode = gluSDKDebuggingMode;
exports.enablePrecaching = enablePrecaching;
exports.configureLoadingScreenColor = configureLoadingScreenColor;
exports.configureStatusBarColour = configureStatusBarColour;
exports.configureLightBackgroundColor = configureLightBackgroundColor;
exports.configureDarkBackgroundColor = configureDarkBackgroundColor;
exports.configureLoaderColour = configureLoaderColour;
exports.disableGluSdk = disableGluSdk;
exports.allowAnonymousRegistration = allowAnonymousRegistration;
exports.enableAnalytic = enableAnalytic;
exports.initCGSDK = initCGSDK;
exports.openWallet = openWallet;
exports.loadCampaignWithUrl = loadCampaignWithUrl;
exports.loadCampaignById = loadCampaignById;
exports.testIntegration = testIntegration;
exports.dataClear = dataClear;
exports.sendData = sendData;
exports.registerDevice = registerDevice;
var _default = exports.default = CustomerGluModule;
//# sourceMappingURL=index.js.map