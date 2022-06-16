"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeWebViewEx = closeWebViewEx;
exports.configureLoaderColourEx = configureLoaderColourEx;
exports.dataClearEx = dataClearEx;
exports.disableGluSdkEx = disableGluSdkEx;
exports.enableAnalyticEx = enableAnalyticEx;
exports.enableEntryPointsEx = enableEntryPointsEx;
exports.enablePrecachingEx = enablePrecachingEx;
exports.gluSDKDebuggingModeEx = gluSDKDebuggingModeEx;
exports.loadCampaignIdByEx = loadCampaignIdByEx;
exports.openWalletEx = openWalletEx;
exports.registerEx = registerEx;
exports.sendDataEX = sendDataEX;
exports.webEventEx = webEventEx;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Rncustomerglu = _reactNative.NativeModules.Rncustomerglu ? _reactNative.NativeModules.Rncustomerglu : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
console.log("NativeModules1231", _reactNative.NativeModules);
console.log("Rncustomerglu123123123", Rncustomerglu); // export function multiply(a:number,b:number): Promise<number> {
//   return Rncustomerglu.multiply(a,b);
// }

function registerEx() {
  return Rncustomerglu.registerDevice();
}

function dataClearEx() {
  return Rncustomerglu.dataClear();
}

function sendDataEX() {
  return Rncustomerglu.sendData();
}

function webEventEx(a) {
  return Rncustomerglu.webEvent(a);
}

function enableAnalyticEx(b) {
  return Rncustomerglu.enableAnalytic(b);
}

function loadCampaignIdByEx(id) {
  return Rncustomerglu.loadCampaignIdBy(id);
}

function openWalletEx() {
  return Rncustomerglu.openWallet();
}

function disableGluSdkEx(a) {
  return Rncustomerglu.disableGluSdk(a);
}

function configureLoaderColourEx(color) {
  return Rncustomerglu.configureLoaderColour(color);
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
//# sourceMappingURL=index.js.map