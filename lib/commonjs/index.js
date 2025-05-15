"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerWidget = void 0;
exports.DisplayCGBackgroundNotification = DisplayCGBackgroundNotification;
exports.DisplayCGNotification = DisplayCGNotification;
exports.DisplayCustomerGluNotification = DisplayCustomerGluNotification;
exports.EmbedBannerWidget = void 0;
exports.RegisterDevice = RegisterDevice;
exports.SetCurrentClassName = SetCurrentClassName;
exports.UpdateProfile = UpdateProfile;
exports.UpdateUserAttributes = UpdateUserAttributes;
exports.addDelayForPIP = addDelayForPIP;
exports.addMarginsForPIP = addMarginsForPIP;
exports.allowAnonymousRegistration = allowAnonymousRegistration;
exports.dataClear = dataClear;
exports.disconnectSSEOnBackground = disconnectSSEOnBackground;
exports.enableAnalytic = enableAnalytic;
exports.getBannerHeight = getBannerHeight;
exports.getCampaignStatus = getCampaignStatus;
exports.gluSDKDebuggingMode = gluSDKDebuggingMode;
exports.initCGSDK = initCGSDK;
exports.setAdPopupFont = setAdPopupFont;
exports.isCampaignValid = isCampaignValid;
exports.isFcmApn = isFcmApn;
exports.loadCampaignById = loadCampaignById;
exports.loadCampaignWithUrl = loadCampaignWithUrl;
exports.openWallet = openWallet;
exports.sendData = sendData;
exports.setApnFcmToken = setApnFcmToken;
exports.setOpenWalletAsFallback = setOpenWalletAsFallback;
exports.setSSETimeout = setSSETimeout;
exports.startSSEOnForeground = startSSEOnForeground;
var _NativeReactNativeCustomerglu = _interopRequireDefault(require("./NativeReactNativeCustomerglu.js"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BannerWidget = exports.BannerWidget = (0, _reactNative.requireNativeComponent)('BannerView');
const EmbedBannerWidget = exports.EmbedBannerWidget = (0, _reactNative.requireNativeComponent)('CGEmbedView');
function RegisterDevice(userdata) {
  return _NativeReactNativeCustomerglu.default.registerDevice(userdata);
}
function UpdateUserAttributes(userdata) {
  return _NativeReactNativeCustomerglu.default.UpdateUserAttributes(userdata);
}
function dataClear() {
  return _NativeReactNativeCustomerglu.default.dataClear();
}
function sendData(obj) {
  return _NativeReactNativeCustomerglu.default.sendData(obj);
}
function openWallet(obj = {}) {
  return _NativeReactNativeCustomerglu.default.openWallet(obj);
}
function initCGSDK(obj) {
  return _NativeReactNativeCustomerglu.default.initCGSDK(obj);
}
function loadCampaignById(campid, obj = {}) {
  return _NativeReactNativeCustomerglu.default.loadCampaignById(campid, obj);
}
function loadCampaignWithUrl(url, obj) {
  return _NativeReactNativeCustomerglu.default.loadCampaignWithUrl(url, obj);
}
function startSSEOnForeground() {
  return _NativeReactNativeCustomerglu.default.startSSEOnForeground();
}
function disconnectSSEOnBackground() {
  return _NativeReactNativeCustomerglu.default.disconnectSSEOnBackground();
}
function setSSETimeout(time) {
  return _NativeReactNativeCustomerglu.default.setSSETimeout(time);
}
function enableAnalytic(b) {
  return _NativeReactNativeCustomerglu.default.enableAnalytic(b);
}
function allowAnonymousRegistration(b) {
  return _NativeReactNativeCustomerglu.default.allowAnonymousRegistration(b);
}
function gluSDKDebuggingMode(b) {
  return _NativeReactNativeCustomerglu.default.gluSDKDebuggingMode(b);
}
function isFcmApn(value) {
  return _NativeReactNativeCustomerglu.default.isFcmApn(value);
}
function UpdateProfile(obj) {
  return _NativeReactNativeCustomerglu.default.UpdateProfile(obj);
}
function DisplayCustomerGluNotification() {
  return _NativeReactNativeCustomerglu.default.DisplayCustomerGluNotification();
}
function DisplayCGNotification(obj, autoclosewebview = false) {
  return _NativeReactNativeCustomerglu.default.DisplayCGNotification(obj, autoclosewebview);
}
function DisplayCGBackgroundNotification(obj, autoclosewebview = false) {
  return _NativeReactNativeCustomerglu.default.DisplayCGBackgroundNotification(obj, autoclosewebview);
}
function SetCurrentClassName(clname) {
  return _NativeReactNativeCustomerglu.default.SetCurrentClassName(clname);
}
function setApnFcmToken(a, b) {
  return _NativeReactNativeCustomerglu.default.setApnFcmToken(a, b);
}
function getBannerHeight() {
  return _NativeReactNativeCustomerglu.default.getBannerHeight();
}
function addMarginsForPIP(horizontal, vertical, type) {
  return _NativeReactNativeCustomerglu.default.addMarginsForPIP(horizontal, vertical, type);
}
function addDelayForPIP(delay) {
  return _NativeReactNativeCustomerglu.default.addDelayForPIP(delay);
}
function setOpenWalletAsFallback(value) {
  return _NativeReactNativeCustomerglu.default.setOpenWalletAsFallback(value);
}
function isCampaignValid(campaignId, dataFlag) {
  return _NativeReactNativeCustomerglu.default.isCampaignValid(campaignId, dataFlag);
}
function getCampaignStatus(campaignId, dataFlag) {
  return _NativeReactNativeCustomerglu.default.getCampaignStatus(campaignId, dataFlag);
}
//# sourceMappingURL=index.js.map