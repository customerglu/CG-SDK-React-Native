import ReactNativeCustomerglu from './NativeReactNativeCustomerglu';

import { requireNativeComponent } from 'react-native';
import type { ViewProps } from 'react-native';

interface CustomViewProps extends ViewProps {
  bannerId?: string;
}

interface EmbedViewProps extends ViewProps {
  embedId?: string;
}

export const BannerWidget = requireNativeComponent<CustomViewProps>('BannerView');
export const EmbedBannerWidget = requireNativeComponent<EmbedViewProps>('CGEmbedView');

export function RegisterDevice(userdata: Object): Promise<Boolean> {
  return ReactNativeCustomerglu.registerDevice(userdata);
}
export function UpdateUserAttributes(userdata: Object): void {
  return ReactNativeCustomerglu.UpdateUserAttributes(userdata);
}

export function dataClear(): void {
  return ReactNativeCustomerglu.dataClear();
}

export function sendData(obj: Object): void {
  return ReactNativeCustomerglu.sendData(obj);
}
export function openWallet(obj: Object = {}): void {
  return ReactNativeCustomerglu.openWallet(obj);
}
export function initCGSDK(obj: string): void {
  return ReactNativeCustomerglu.initCGSDK(obj);
}
export function setAdPopupFont(obj: string): void {
  return ReactNativeCustomerglu.setAdPopupFont(obj);
}

export function loadCampaignById(campid: string, obj: Object = {}): void {
  return ReactNativeCustomerglu.loadCampaignById(campid, obj);
}

export function loadCampaignWithUrl(url: string, obj: Object): void {
  return ReactNativeCustomerglu.loadCampaignWithUrl(url, obj);
}

export function startSSEOnForeground(): void {
  return ReactNativeCustomerglu.startSSEOnForeground();
}
export function disconnectSSEOnBackground(): void {
  return ReactNativeCustomerglu.disconnectSSEOnBackground();
}
export function setSSETimeout(time: number): void {
  return ReactNativeCustomerglu.setSSETimeout(time);
}

export function enableAnalytic(b: boolean): void {
  return ReactNativeCustomerglu.enableAnalytic(b);
}

export function allowAnonymousRegistration(b: boolean): void {
  return ReactNativeCustomerglu.allowAnonymousRegistration(b);
}

export function gluSDKDebuggingMode(b: boolean): void {
  return ReactNativeCustomerglu.gluSDKDebuggingMode(b);
}

export function UpdateProfile(obj: Object): void {
  return ReactNativeCustomerglu.UpdateProfile(obj);
}
export function DisplayCustomerGluNotification(): void {
  return ReactNativeCustomerglu.DisplayCustomerGluNotification();
}
export function DisplayCGNotification(
  obj: Object,
  autoclosewebview: boolean = false
): void {
  return ReactNativeCustomerglu.DisplayCGNotification(obj, autoclosewebview);
}

export function DisplayCGBackgroundNotification(
  obj: Object,
  autoclosewebview: boolean = false
): void {
  return ReactNativeCustomerglu.DisplayCGBackgroundNotification(obj, autoclosewebview);
}
export function SetCurrentClassName(clname: string): Promise<string> {
  return ReactNativeCustomerglu.SetCurrentClassName(clname);
}

export function getBannerHeight(): Promise<number> {
  return ReactNativeCustomerglu.getBannerHeight();
}
export function addMarginsForPIP(
  horizontal: number,
  vertical: number,
  type: string
): void {
  return ReactNativeCustomerglu.addMarginsForPIP(horizontal, vertical, type);
}
export function addDelayForPIP(delay: number): void {
  return ReactNativeCustomerglu.addDelayForPIP(delay);
}

export function setOpenWalletAsFallback(value: boolean): void {
  return ReactNativeCustomerglu.setOpenWalletAsFallback(value);
}




export function isCampaignValid(
  campaignId: string,
  dataFlag: string
): Promise<Boolean> {
  return ReactNativeCustomerglu.isCampaignValid(campaignId, dataFlag);
}
export function getCampaignStatus(
  campaignId: string,
  dataFlag: string
): Promise<string> {
  return ReactNativeCustomerglu.getCampaignStatus(campaignId, dataFlag);
}

