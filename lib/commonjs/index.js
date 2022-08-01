"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.sendDataEX = sendDataEX;
exports.sendEventToJsEx = sendEventToJsEx;
exports.setApnFcmTokenEx = setApnFcmTokenEx;

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

}); // const CustomPlayer = requireNativeComponent('CustomPlayer', null)               
// const BannerWidgetNativeComponent = requireNativeComponent('BannerWidget');
// module.exports = requireNativeComponent('RNTMap');
// export default function BannerWidget(props: Props) {
//   return <BannerWidgetNativeComponent {...props} />;
// }
// type CgnativeuiProps = {
//   bannerId: string;
// };
// const ComponentName = 'BannerWidget';
// export const BannerWidget =
//   UIManager.getViewManagerConfig(ComponentName) != null
//     ? requireNativeComponent<CgnativeuiProps>(ComponentName)
//     : () => {
//       throw new Error(LINKING_ERROR);
//     };
// const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
// console.log("eventEmitter", eventEmitter);
// console.log("hello event", eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
//   console.log("pppkgkfjhg", event) // "someValue"
// }))
// export function registerEx(): Promise<number> {
//   return Rncustomerglu.registerDevice();
// }

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

function CGApplicationEx(obj) {
  return Rncustomerglu.CGApplication(obj);
}

function DisplayBackGroundNotificationEx(obj) {
  return Rncustomerglu.DisplayBackGroundNotification(obj);
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

function SetCurrentClassNameEx(clname) {
  return Rncustomerglu.SetCurrentClassName(clname);
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

function setApnFcmTokenEx(a, b) {
  return Rncustomerglu.setApnFcmToken(a, b);
}
//# sourceMappingURL=index.js.map