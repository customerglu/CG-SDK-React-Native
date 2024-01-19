"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerWidget = void 0;
exports.CGApplication = CGApplication;
exports.DisplayCGBackgroundNotification = DisplayCGBackgroundNotification;
exports.DisplayCGNotification = DisplayCGNotification;
exports.DisplayCustomerGluNotification = DisplayCustomerGluNotification;
exports.EmbedBannerWidget = void 0;
exports.GetRefferalId = GetRefferalId;
exports.LoadAllCampagins = LoadAllCampagins;
exports.LoadCampaginsByFilter = LoadCampaginsByFilter;
exports.RegisterDevice = RegisterDevice;
exports.SetCurrentClassName = SetCurrentClassName;
exports.SetDefaultBannerImage = SetDefaultBannerImage;
exports.UpdateProfile = UpdateProfile;
exports.addDelayForPIP = addDelayForPIP;
exports.addMarginsForPIP = addMarginsForPIP;
exports.allowAnonymousRegistration = allowAnonymousRegistration;
exports.closeWebView = closeWebView;
exports.configureDarkBackgroundColor = configureDarkBackgroundColor;
exports.configureDarkEmbedLoaderURL = configureDarkEmbedLoaderURL;
exports.configureDarkLoaderURL = configureDarkLoaderURL;
exports.configureDomainCodeMsg = configureDomainCodeMsg;
exports.configureLightBackgroundColor = configureLightBackgroundColor;
exports.configureLightEmbedLoaderURL = configureLightEmbedLoaderURL;
exports.configureLightLoaderURL = configureLightLoaderURL;
exports.configureLoaderColour = configureLoaderColour;
exports.configureLoadingScreenColor = configureLoadingScreenColor;
exports.configureSafeArea = configureSafeArea;
exports.configureStatusBarColour = configureStatusBarColour;
exports.configureWhiteListedDomains = configureWhiteListedDomains;
exports.dataClear = dataClear;
exports.disableGluSdk = disableGluSdk;
exports.enableAnalytic = enableAnalytic;
exports.enableDarkMode = enableDarkMode;
exports.enableEntryPoints = enableEntryPoints;
exports.enablePrecaching = enablePrecaching;
exports.getBannerHeight = getBannerHeight;
exports.getCampaignStatus = getCampaignStatus;
exports.gluSDKDebuggingMode = gluSDKDebuggingMode;
exports.handleDeepLinkUri = handleDeepLinkUri;
exports.isCampaignValid = isCampaignValid;
exports.isFcmApn = isFcmApn;
exports.listenToDarkMode = listenToDarkMode;
exports.loadCampaignById = loadCampaignById;
exports.loadCampaignWithUrl = loadCampaignWithUrl;
exports.openNudge = openNudge;
exports.openWallet = openWallet;
exports.sendData = sendData;
exports.sendEventToJs = sendEventToJs;
exports.setApnFcmToken = setApnFcmToken;
exports.setOpenWalletAsFallback = setOpenWalletAsFallback;
exports.testIntegration = testIntegration;
exports.initializeSDK = initializeSDK;
var _reactNative = require("react-native");
// import React from 'react';

const LINKING_ERROR = `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Rncustomerglu = _reactNative.NativeModules.Rncustomerglu ? _reactNative.NativeModules.Rncustomerglu : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});

// const CustomPlayer = requireNativeComponent('CustomPlayer', null)               

// const BannerWidgetNativeComponent = requireNativeComponent('BannerWidget');
// module.exports = requireNativeComponent('RNTMap');

// export default function BannerWidget(props: Props) {
//   return <BannerWidgetNativeComponent {...props} />;
// }

const ComponentName = 'BannerWidget';
const BannerWidget = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
exports.BannerWidget = BannerWidget;
const EmbedBannerName = 'EmbedBannerWidget';
const EmbedBannerWidget = _reactNative.UIManager.getViewManagerConfig(EmbedBannerName) != null ? (0, _reactNative.requireNativeComponent)(EmbedBannerName) : () => {
  throw new Error(LINKING_ERROR);
};
exports.EmbedBannerWidget = EmbedBannerWidget;
function RegisterDevice(userdata) {
  return Rncustomerglu.registerDevice(userdata);
}
function dataClear() {
  return Rncustomerglu.dataClear();
}
function testIntegration() {
  return Rncustomerglu.testIntegration();
}
function sendData(obj) {
  return Rncustomerglu.sendData(obj);
}
function initializeSDK() {
  return Rncustomerglu.initializeSDK();
}

function openWallet() {
  let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Rncustomerglu.openWallet(obj);
}
function loadCampaignById(id) {
  let obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Rncustomerglu.loadCampaignById(id, obj);
}
function loadCampaignWithUrl(url, obj) {
  return Rncustomerglu.loadCampaignWithUrl(url, obj);
}
function enableAnalytic(b) {
  return Rncustomerglu.enableAnalytic(b);
}
function allowAnonymousRegistration(b) {
  return Rncustomerglu.allowAnonymousRegistration(b);
}
function sendEventToJs(b) {
  return Rncustomerglu.sendEventToJs(b);
}
function disableGluSdk(a) {
  return Rncustomerglu.disableGluSdk(a);
}
function configureLoaderColour(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
}

//2jan2023

function configureDarkBackgroundColor(colr) {
  return Rncustomerglu.configureDarkBackgroundColor(colr);
}
function configureLightBackgroundColor(colr) {
  return Rncustomerglu.configureLightBackgroundColor(colr);
}
function listenToDarkMode(isdarkmode) {
  return Rncustomerglu.listenToDarkMode(isdarkmode);
}
function enableDarkMode(darkmode) {
  return Rncustomerglu.enableDarkMode(darkmode);
}
//end
//3jan2023
function handleDeepLinkUri(url) {
  return Rncustomerglu.handleDeepLinkUri(url);
}
//end

//16jan2023
function configureLightLoaderURL(url) {
  return Rncustomerglu.configureLightLoaderURL(url);
}
function configureDarkLoaderURL(url) {
  return Rncustomerglu.configureDarkLoaderURL(url);
}
function configureLightEmbedLoaderURL(url) {
  return Rncustomerglu.configureLightEmbedLoaderURL(url);
}
function configureDarkEmbedLoaderURL(url) {
  return Rncustomerglu.configureDarkEmbedLoaderURL(url);
}
//end
function configureStatusBarColour(color) {
  return Rncustomerglu.configureStatusBarColour(color);
}
function configureLoadingScreenColor(color) {
  return Rncustomerglu.configureLoadingScreenColor(color);
}
function enablePrecaching() {
  return Rncustomerglu.enablePrecaching();
}
function gluSDKDebuggingMode(b) {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}
function enableEntryPoints(b) {
  return Rncustomerglu.enableEntryPoints(b);
}
function closeWebView(b) {
  return Rncustomerglu.closeWebView(b);
}
function isFcmApn(id) {
  return Rncustomerglu.isFcmApn(id);
}
function configureSafeArea(obj) {
  return Rncustomerglu.configureSafeArea(obj);
}

// --------------other 13 methods-----------------

function SetDefaultBannerImage(url) {
  return Rncustomerglu.SetDefaultBannerImage(url);
}
function UpdateProfile(obj) {
  return Rncustomerglu.UpdateProfile(obj);
}
function DisplayCustomerGluNotification() {
  return Rncustomerglu.DisplayCustomerGluNotification();
}
function CGApplication() {
  return Rncustomerglu.CGApplication();
}
function DisplayCGNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayCGNotification(obj, autoclosewebview);
}
function DisplayCGBackgroundNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayCGBackgroundNotification(obj, autoclosewebview);
}
function GetRefferalId(url) {
  return Rncustomerglu.GetRefferalId(url);
}
function LoadAllCampagins() {
  return Rncustomerglu.LoadAllCampagins();
}
function LoadCampaginsByFilter(obj) {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}
function SetCurrentClassName(clname) {
  return Rncustomerglu.SetCurrentClassName(clname);
}
function configureWhiteListedDomains(arr) {
  return Rncustomerglu.configureWhiteListedDomains(arr);
}
function configureDomainCodeMsg(obj) {
  return Rncustomerglu.configureDomainCodeMsg(obj);
}
function setApnFcmToken(a, b) {
  return Rncustomerglu.setApnFcmToken(a, b);
}
function getBannerHeight() {
  return Rncustomerglu.getBannerHeight();
}
function addMarginsForPIP(horizontal, vertical, type) {
  return Rncustomerglu.addMarginsForPIP(horizontal, vertical, type);
}
function addDelayForPIP(delay) {
  return Rncustomerglu.addDelayForPIP(delay);
}
// export function setPIPEnabled(enabled:Boolean): Promise<Boolean> {
//   return Rncustomerglu.setPIPEnabled(enabled);
// }
// export function isPIPEnabled(): Promise<Boolean> {
//   return Rncustomerglu.isPIPEnabled();
// }
// export function dismissPIP(): Promise<Boolean> {
//   return Rncustomerglu.dismissPIP();
// }

function setOpenWalletAsFallback(value) {
  return Rncustomerglu.setOpenWalletAsFallback(value);
}
function isCampaignValid(campaignId, dataFlag) {
  return Rncustomerglu.isCampaignValid(campaignId, dataFlag);
}
function getCampaignStatus(campaignId, dataFlag) {
  return Rncustomerglu.getCampaignStatus(campaignId, dataFlag);
}
function openNudge(nudgeid) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (nudgeid != null) {
    return Rncustomerglu.OpenNudgeRN(nudgeid, data);
  } else {
    throw new Error("nudgeId can't be empty");
  }
}
//# sourceMappingURL=index.js.map