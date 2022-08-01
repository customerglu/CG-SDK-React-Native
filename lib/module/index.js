import { NativeEventEmitter, NativeModules, Platform // requireNativeComponent,
// UIManager
} from 'react-native'; // import React from 'react';

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

export function RegisterDevice(userdata) {
  return Rncustomerglu.registerDeviceAndroid(userdata);
}
export function dataClearEx() {
  return Rncustomerglu.dataClear();
}
export function sendDataEX(obj) {
  return Rncustomerglu.sendData(obj);
}
export function openWalletEx() {
  return Rncustomerglu.openWallet();
}
export function loadCampaignIdByEx(id) {
  return Rncustomerglu.loadCampaignIdBy(id);
}
export function enableAnalyticEx(b) {
  return Rncustomerglu.enableAnalytic(b);
}
export function sendEventToJsEx(b) {
  console.log("NativeEventEmitter", NativeEventEmitter);
  return Rncustomerglu.sendEventToJs(b);
}
export function disableGluSdkEx(a) {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColourEx(colr) {
  return Rncustomerglu.configureLoaderColour(colr);
}
export function enablePrecachingEx() {
  return Rncustomerglu.enablePrecaching();
}
export function gluSDKDebuggingModeEx(b) {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}
export function enableEntryPointsEx(b) {
  return Rncustomerglu.enableEntryPoints(b);
}
export function closeWebViewEx(b) {
  return Rncustomerglu.closeWebView(b);
}
export function isFcmApnEx(id) {
  return Rncustomerglu.isFcmApn(id);
} // export function configureSafeAreaEx(topH: Number, bottomH: Number, topColor: String, bottomColr: String): Promise<number> {
//   return Rncustomerglu.configureSafeArea(topH, bottomH, topColor, bottomColr);
// }

export function configureSafeAreaEx(obj) {
  return Rncustomerglu.configureSafeArea(obj);
} // --------------other 13 methods-----------------

export function SetDefaultBannerImageEx(url) {
  return Rncustomerglu.SetDefaultBannerImage(url);
}
export function UpdateProfileEx() {
  return Rncustomerglu.UpdateProfile();
}
export function UpdateProfileExAndroid(userdata) {
  return Rncustomerglu.UpdateProfileAndroid(userdata);
}
export function DisplayCustomerGluNotificationEx() {
  return Rncustomerglu.DisplayCustomerGluNotification();
}
export function CGApplicationEx(obj) {
  return Rncustomerglu.CGApplication(obj);
}
export function DisplayBackGroundNotificationEx(obj) {
  return Rncustomerglu.DisplayBackGroundNotification(obj);
}
export function GetRefferalIdEx(url) {
  return Rncustomerglu.GetRefferalId(url);
}
export function LoadAllCampaginsEx() {
  return Rncustomerglu.LoadAllCampagins();
}
export function LoadCampaginsByFilterEx(obj) {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}
export function SetCurrentClassNameEx(clname) {
  return Rncustomerglu.SetCurrentClassName(clname);
}
export function OpenWalletWithUrlEx(url) {
  return Rncustomerglu.OpenWalletWithUrl(url);
}
export function configureWhiteListedDomainsEx() {
  return Rncustomerglu.configureWhiteListedDomains();
}
export function configureDomainCodeMsgEx() {
  return Rncustomerglu.configureDomainCodeMsg();
}
export function setApnFcmTokenEx(a, b) {
  return Rncustomerglu.setApnFcmToken(a, b);
}
//# sourceMappingURL=index.js.map