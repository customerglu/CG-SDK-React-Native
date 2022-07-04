"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerWidget = void 0;
exports.CGApplicationEx = CGApplicationEx;
exports.DisplayBackGroundNotificationEx = DisplayBackGroundNotificationEx;
exports.DisplayCustomerGluNotificationEx = DisplayCustomerGluNotificationEx;
exports.GetRefferalIdEx = GetRefferalIdEx;
exports.LoadAllCampaginsEx = LoadAllCampaginsEx;
exports.LoadCampaginsByFilterEx = LoadCampaginsByFilterEx;
exports.OpenWalletWithUrlEx = OpenWalletWithUrlEx;
exports.RegisterDevice = RegisterDevice;
exports.SetCurrentClassNameEx = SetCurrentClassNameEx;
exports.SetDefaultBannerImageEx = SetDefaultBannerImageEx;
exports.UpdateProfileEx = UpdateProfileEx;
exports.UpdateProfileExAndroid = UpdateProfileExAndroid;
exports.closeWebViewEx = closeWebViewEx;
exports.configureDomainCodeMsgEx = configureDomainCodeMsgEx;
exports.configureLoaderColourEx = configureLoaderColourEx;
exports.configureSafeAreaEx = configureSafeAreaEx;
exports.configureWhiteListedDomainsEx = configureWhiteListedDomainsEx;
exports.dataClearEx = dataClearEx;
exports.disableGluSdkEx = disableGluSdkEx;
exports.enableAnalyticEx = enableAnalyticEx;
exports.enableEntryPointsEx = enableEntryPointsEx;
exports.enablePrecachingEx = enablePrecachingEx;
exports.gluSDKDebuggingModeEx = gluSDKDebuggingModeEx;
exports.isFcmApnEx = isFcmApnEx;
exports.loadCampaignIdByEx = loadCampaignIdByEx;
exports.openWalletEx = openWalletEx;
exports.registerEx = registerEx;
exports.sendDataEX = sendDataEX;
exports.sendEventToJsEx = sendEventToJsEx;

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

}); // const BannerWidgetNativeComponent = requireNativeComponent('BannerWidget');
// export default function BannerWidget(props: Props) {
//   return <BannerWidgetNativeComponent {...props} />;
// }

const ComponentName = 'BannerWidget';
const BannerWidget = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
}; // const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
// console.log("eventEmitter", eventEmitter);
// console.log("hello event", eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
//   console.log("pppkgkfjhg", event) // "someValue"
// }))

exports.BannerWidget = BannerWidget;

function registerEx() {
  return Rncustomerglu.registerDevice();
}

function RegisterDevice(userdata) {
  return Rncustomerglu.registerDeviceAndroid(userdata);
}

function dataClearEx() {
  return Rncustomerglu.dataClear();
}

function sendDataEX(obj) {
  return Rncustomerglu.sendData(obj);
}

function openWalletEx() {
  return Rncustomerglu.openWallet();
}

function loadCampaignIdByEx(id) {
  return Rncustomerglu.loadCampaignIdBy(id);
}

function enableAnalyticEx(b) {
  return Rncustomerglu.enableAnalytic(b);
}

function sendEventToJsEx(b) {
  console.log("NativeEventEmitter", _reactNative.NativeEventEmitter);
  return Rncustomerglu.sendEventToJs(b);
}

function disableGluSdkEx(a) {
  return Rncustomerglu.disableGluSdk(a);
}

function configureLoaderColourEx(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
}

function enablePrecachingEx() {
  return Rncustomerglu.enablePrecaching();
}

function gluSDKDebuggingModeEx(b) {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}

function enableEntryPointsEx(b) {
  return Rncustomerglu.enableEntryPoints(b);
}

function closeWebViewEx(b) {
  return Rncustomerglu.closeWebView(b);
}

function isFcmApnEx(id) {
  return Rncustomerglu.isFcmApn(id);
} // export function configureSafeAreaEx(topH: Number, bottomH: Number, topColor: String, bottomColr: String): Promise<number> {
//   return Rncustomerglu.configureSafeArea(topH, bottomH, topColor, bottomColr);
// }


function configureSafeAreaEx(obj) {
  return Rncustomerglu.configureSafeArea(obj);
} // --------------other 13 methods-----------------


function SetDefaultBannerImageEx(url) {
  return Rncustomerglu.SetDefaultBannerImage(url);
}

function UpdateProfileEx() {
  return Rncustomerglu.UpdateProfile();
}

function UpdateProfileExAndroid(userdata) {
  return Rncustomerglu.UpdateProfileAndroid(userdata);
}

function DisplayCustomerGluNotificationEx() {
  return Rncustomerglu.DisplayCustomerGluNotification();
}

function CGApplicationEx() {
  return Rncustomerglu.CGApplication();
}

function DisplayBackGroundNotificationEx() {
  return Rncustomerglu.DisplayBackGroundNotification();
}

function GetRefferalIdEx(url) {
  return Rncustomerglu.GetRefferalId(url);
}

function LoadAllCampaginsEx() {
  return Rncustomerglu.LoadAllCampagins();
}

function LoadCampaginsByFilterEx(obj) {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}

function SetCurrentClassNameEx(clName) {
  return Rncustomerglu.SetCurrentClassName(clName);
}

function OpenWalletWithUrlEx(url) {
  return Rncustomerglu.OpenWalletWithUrl(url);
}

function configureWhiteListedDomainsEx() {
  return Rncustomerglu.configureWhiteListedDomains();
}

function configureDomainCodeMsgEx() {
  return Rncustomerglu.configureDomainCodeMsg();
}
//# sourceMappingURL=index.js.map