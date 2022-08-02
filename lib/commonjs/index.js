"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerWidget = void 0;
exports.CGApplication = CGApplication;
exports.DisplayBackGroundNotification = DisplayBackGroundNotification;
exports.DisplayCustomerGluNotification = DisplayCustomerGluNotification;
exports.GetRefferalId = GetRefferalId;
exports.LoadAllCampagins = LoadAllCampagins;
exports.LoadCampaginsByFilter = LoadCampaginsByFilter;
exports.OpenWalletWithUrl = OpenWalletWithUrl;
exports.RegisterDevice = RegisterDevice;
exports.SetCurrentClassName = SetCurrentClassName;
exports.SetDefaultBannerImage = SetDefaultBannerImage;
exports.UpdateProfile = UpdateProfile;
exports.closeWebView = closeWebView;
exports.configureDomainCodeMsg = configureDomainCodeMsg;
exports.configureLoaderColour = configureLoaderColour;
exports.configureSafeArea = configureSafeArea;
exports.configureWhiteListedDomains = configureWhiteListedDomains;
exports.dataClear = dataClear;
exports.disableGluSdk = disableGluSdk;
exports.enableAnalytic = enableAnalytic;
exports.enableEntryPoints = enableEntryPoints;
exports.enablePrecaching = enablePrecaching;
exports.getBannerHeight = getBannerHeight;
exports.gluSDKDebuggingMode = gluSDKDebuggingMode;
exports.isFcmApn = isFcmApn;
exports.loadCampaignIdBy = loadCampaignIdBy;
exports.openWallet = openWallet;
exports.sendData = sendData;
exports.sendEventToJs = sendEventToJs;
exports.setApnFcmToken = setApnFcmToken;

var _reactNative = require("react-native");

// import React from 'react';
const LINKING_ERROR = `The package '@customerglu/react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
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

const ComponentName = 'BannerWidget';
const BannerWidget = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
}; // console.log("BannerWidget", requireNativeComponent('BannerWidget'));

exports.BannerWidget = BannerWidget;
console.log("BannerWidget", _reactNative.UIManager.getViewManagerConfig('BannerWidget'));

function RegisterDevice(userdata) {
  return Rncustomerglu.registerDevice(userdata);
}

function dataClear() {
  return Rncustomerglu.dataClear();
}

function sendData(obj) {
  return Rncustomerglu.sendData(obj);
}

function openWallet() {
  let autoclosewebview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return Rncustomerglu.openWallet(autoclosewebview);
}

function loadCampaignIdBy(id) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.loadCampaignIdBy(id, autoclosewebview);
}

function enableAnalytic(b) {
  return Rncustomerglu.enableAnalytic(b);
}

function sendEventToJs(b) {
  console.log("NativeEventEmitter", _reactNative.NativeEventEmitter);
  return Rncustomerglu.sendEventToJs(b);
}

function disableGluSdk(a) {
  return Rncustomerglu.disableGluSdk(a);
}

function configureLoaderColour(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
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
} // --------------other 13 methods-----------------


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

function DisplayBackGroundNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayBackGroundNotification(obj, autoclosewebview);
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

function OpenWalletWithUrl(url) {
  return Rncustomerglu.OpenWalletWithUrl(url);
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
//# sourceMappingURL=index.js.map