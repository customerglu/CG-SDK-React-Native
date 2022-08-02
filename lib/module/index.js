import { NativeEventEmitter, NativeModules, Platform, requireNativeComponent, UIManager } from 'react-native'; // import React from 'react';

const LINKING_ERROR = `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Rncustomerglu = NativeModules.Rncustomerglu ? NativeModules.Rncustomerglu : new Proxy({}, {
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
export const BannerWidget = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
}; // console.log("BannerWidget", requireNativeComponent('BannerWidget'));

console.log("BannerWidget", UIManager.getViewManagerConfig('BannerWidget'));
export function RegisterDevice(userdata) {
  return Rncustomerglu.registerDevice(userdata);
}
export function dataClear() {
  return Rncustomerglu.dataClear();
}
export function sendData(obj) {
  return Rncustomerglu.sendData(obj);
}
export function openWallet() {
  let autoclosewebview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return Rncustomerglu.openWallet(autoclosewebview);
}
export function loadCampaignIdBy(id) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.loadCampaignIdBy(id, autoclosewebview);
}
export function enableAnalytic(b) {
  return Rncustomerglu.enableAnalytic(b);
}
export function sendEventToJs(b) {
  console.log("NativeEventEmitter", NativeEventEmitter);
  return Rncustomerglu.sendEventToJs(b);
}
export function disableGluSdk(a) {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColour(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
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
} // --------------other 13 methods-----------------

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
export function DisplayBackGroundNotification(obj) {
  let autoclosewebview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Rncustomerglu.DisplayBackGroundNotification(obj, autoclosewebview);
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
export function OpenWalletWithUrl(url) {
  return Rncustomerglu.OpenWalletWithUrl(url);
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
//# sourceMappingURL=index.js.map