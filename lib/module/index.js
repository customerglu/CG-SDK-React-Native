"use strict";

import ReactNativeCustomerglu from "./NativeReactNativeCustomerglu.js";
import { requireNativeComponent } from 'react-native';
export const BannerWidget = requireNativeComponent('BannerView');
export const EmbedBannerWidget = requireNativeComponent('CGEmbedView');
export function RegisterDevice(userdata) {
  return ReactNativeCustomerglu.registerDevice(userdata);
}
export function UpdateUserAttributes(userdata) {
  return ReactNativeCustomerglu.UpdateUserAttributes(userdata);
}
export function dataClear() {
  return ReactNativeCustomerglu.dataClear();
}
export function sendData(obj) {
  return ReactNativeCustomerglu.sendData(obj);
}
export function openWallet(obj = {}) {
  return ReactNativeCustomerglu.openWallet(obj);
}
export function initCGSDK(obj) {
  return ReactNativeCustomerglu.initCGSDK(obj);
}
export function loadCampaignById(campid, obj = {}) {
  return ReactNativeCustomerglu.loadCampaignById(campid, obj);
}
export function loadCampaignWithUrl(url, obj) {
  return ReactNativeCustomerglu.loadCampaignWithUrl(url, obj);
}
export function startSSEOnForeground() {
  return ReactNativeCustomerglu.startSSEOnForeground();
}
export function disconnectSSEOnBackground() {
  return ReactNativeCustomerglu.disconnectSSEOnBackground();
}
export function setSSETimeout(time) {
  return ReactNativeCustomerglu.setSSETimeout(time);
}
export function enableAnalytic(b) {
  return ReactNativeCustomerglu.enableAnalytic(b);
}
export function allowAnonymousRegistration(b) {
  return ReactNativeCustomerglu.allowAnonymousRegistration(b);
}
export function gluSDKDebuggingMode(b) {
  return ReactNativeCustomerglu.gluSDKDebuggingMode(b);
}
export function isFcmApn(value) {
  return ReactNativeCustomerglu.isFcmApn(value);
}
export function UpdateProfile(obj) {
  return ReactNativeCustomerglu.UpdateProfile(obj);
}
export function DisplayCustomerGluNotification() {
  return ReactNativeCustomerglu.DisplayCustomerGluNotification();
}
export function DisplayCGNotification(obj, autoclosewebview = false) {
  return ReactNativeCustomerglu.DisplayCGNotification(obj, autoclosewebview);
}
export function DisplayCGBackgroundNotification(obj, autoclosewebview = false) {
  return ReactNativeCustomerglu.DisplayCGBackgroundNotification(obj, autoclosewebview);
}
export function SetCurrentClassName(clname) {
  return ReactNativeCustomerglu.SetCurrentClassName(clname);
}
export function setApnFcmToken(a, b) {
  return ReactNativeCustomerglu.setApnFcmToken(a, b);
}
export function getBannerHeight() {
  return ReactNativeCustomerglu.getBannerHeight();
}
export function addMarginsForPIP(horizontal, vertical, type) {
  return ReactNativeCustomerglu.addMarginsForPIP(horizontal, vertical, type);
}
export function addDelayForPIP(delay) {
  return ReactNativeCustomerglu.addDelayForPIP(delay);
}
export function setOpenWalletAsFallback(value) {
  return ReactNativeCustomerglu.setOpenWalletAsFallback(value);
}
export function isCampaignValid(campaignId, dataFlag) {
  return ReactNativeCustomerglu.isCampaignValid(campaignId, dataFlag);
}
export function getCampaignStatus(campaignId, dataFlag) {
  return ReactNativeCustomerglu.getCampaignStatus(campaignId, dataFlag);
}
//# sourceMappingURL=index.js.map