import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Rncustomerglu = NativeModules.Rncustomerglu ? NativeModules.Rncustomerglu : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
console.log("NativeModules1231", NativeModules);
console.log("Rncustomerglu123123123", Rncustomerglu); // export function multiply(a:number,b:number): Promise<number> {
//   return Rncustomerglu.multiply(a,b);
// }

export function registerEx() {
  return Rncustomerglu.registerDevice();
}
export function dataClearEx() {
  return Rncustomerglu.dataClear();
}
export function sendDataEX() {
  return Rncustomerglu.sendData();
}
export function webEventEx(a) {
  return Rncustomerglu.webEvent(a);
}
export function enableAnalyticEx(b) {
  return Rncustomerglu.enableAnalytic(b);
}
export function loadCampaignIdByEx(id) {
  return Rncustomerglu.loadCampaignIdBy(id);
}
export function openWalletEx() {
  return Rncustomerglu.openWallet();
}
export function disableGluSdkEx(a) {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColourEx(color) {
  return Rncustomerglu.configureLoaderColour(color);
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
//# sourceMappingURL=index.js.map