import { NativeModules, Platform, requireNativeComponent, UIManager } from 'react-native';
// import React from 'react';

const LINKING_ERROR = `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Rncustomerglu = NativeModules.Rncustomerglu ? NativeModules.Rncustomerglu : new Proxy({}, {
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
export const BannerWidget = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const EmbedBannerName = 'EmbedBannerWidget';
export const EmbedBannerWidget = UIManager.getViewManagerConfig(EmbedBannerName) != null ? requireNativeComponent(EmbedBannerName) : () => {
  throw new Error(LINKING_ERROR);
};
export function RegisterDevice(userdata) {
  return Rncustomerglu.registerDevice(userdata);
}
export function dataClear() {
  return Rncustomerglu.dataClear();
}
export function testIntegration() {
  return Rncustomerglu.testIntegration();
}
export function sendData(obj) {
  return Rncustomerglu.sendData(obj);
}
export function openWallet() {
  let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Rncustomerglu.openWallet(obj);
}
export function loadCampaignById(id) {
  let obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Rncustomerglu.loadCampaignById(id, obj);
}
export function loadCampaignWithUrl(url, obj) {
  return Rncustomerglu.loadCampaignWithUrl(url, obj);
}
export function enableAnalytic(b) {
  return Rncustomerglu.enableAnalytic(b);
}
export function allowAnonymousRegistration(b) {
  return Rncustomerglu.allowAnonymousRegistration(b);
}
export function sendEventToJs(b) {
  return Rncustomerglu.sendEventToJs(b);
}
export function disableGluSdk(a) {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColour(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
}

//2jan2023

export function configureDarkBackgroundColor(colr) {
  return Rncustomerglu.configureDarkBackgroundColor(colr);
}
export function configureLightBackgroundColor(colr) {
  return Rncustomerglu.configureLightBackgroundColor(colr);
}
export function listenToDarkMode(isdarkmode) {
  return Rncustomerglu.listenToDarkMode(isdarkmode);
}
export function enableDarkMode(darkmode) {
  return Rncustomerglu.enableDarkMode(darkmode);
}
//end
//3jan2023
export function handleDeepLinkUri(url) {
  return Rncustomerglu.handleDeepLinkUri(url);
}
//end

//16jan2023
export function configureLightLoaderURL(url) {
  return Rncustomerglu.configureLightLoaderURL(url);
}
export function configureDarkLoaderURL(url) {
  return Rncustomerglu.configureDarkLoaderURL(url);
}
export function configureLightEmbedLoaderURL(url) {
  return Rncustomerglu.configureLightEmbedLoaderURL(url);
}
export function configureDarkEmbedLoaderURL(url) {
  return Rncustomerglu.configureDarkEmbedLoaderURL(url);
}
//end
export function configureStatusBarColour(color) {
  return Rncustomerglu.configureStatusBarColour(color);
}
export function configureLoadingScreenColor(color) {
  return Rncustomerglu.configureLoadingScreenColor(color);
}
export function enablePrecaching() {
  return Rncustomerglu.enablePrecaching();
}
export function gluSDKDebuggingMode(b) {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}
export function enableEntryPoints(b) {
  return Rncustomerglu.enableEntryPoints(b);
}
export function closeWebView(b) {
  return Rncustomerglu.closeWebView(b);
}
export function isFcmApn(id) {
  return Rncustomerglu.isFcmApn(id);
}
export function configureSafeArea(obj) {
  return Rncustomerglu.configureSafeArea(obj);
}

// --------------other 13 methods-----------------

export function SetDefaultBannerImage(url) {
  return Rncustomerglu.SetDefaultBannerImage(url);
}
export function UpdateProfile(obj) {
  return Rncustomerglu.UpdateProfile(obj);
}
export function DisplayCustomerGluNotification() {
  return Rncustomerglu.DisplayCustomerGluNotification();
}
export function CGApplication() {
  return Rncustomerglu.CGApplication();
}
export function DisplayCGNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayCGNotification(obj, autoclosewebview);
}
export function DisplayCGBackgroundNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayCGBackgroundNotification(obj, autoclosewebview);
}
export function GetRefferalId(url) {
  return Rncustomerglu.GetRefferalId(url);
}
export function LoadAllCampagins() {
  return Rncustomerglu.LoadAllCampagins();
}
export function LoadCampaginsByFilter(obj) {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}
export function SetCurrentClassName(clname) {
  return Rncustomerglu.SetCurrentClassName(clname);
}
export function configureWhiteListedDomains(arr) {
  return Rncustomerglu.configureWhiteListedDomains(arr);
}
export function configureDomainCodeMsg(obj) {
  return Rncustomerglu.configureDomainCodeMsg(obj);
}
export function setApnFcmToken(a, b) {
  return Rncustomerglu.setApnFcmToken(a, b);
}
export function getBannerHeight() {
  return Rncustomerglu.getBannerHeight();
}
export function addMarginsForPIP(horizontal, vertical, type) {
  return Rncustomerglu.addMarginsForPIP(horizontal, vertical, type);
}
export function addDelayForPIP(delay) {
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

export function setOpenWalletAsFallback(value) {
  return Rncustomerglu.setOpenWalletAsFallback(value);
}
export function isCampaignValid(campaignId, dataFlag) {
  return Rncustomerglu.isCampaignValid(campaignId, dataFlag);
}
export function getCampaignStatus(campaignId, dataFlag) {
  return Rncustomerglu.getCampaignStatus(campaignId, dataFlag);
}
export function openNudge(nudgeid) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (nudgeid != null) {
    return Rncustomerglu.OpenNudgeRN(nudgeid, data);
  } else {
    throw new Error("nudgeId can't be empty");
  }
}
//# sourceMappingURL=index.js.map