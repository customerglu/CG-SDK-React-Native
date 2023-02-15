import { NativeEventEmitter } from 'react-native';
type CgnativeuiProps = {
    bannerId: string;
};
export declare const BannerWidget: import("react-native").HostComponent<CgnativeuiProps> | (() => never);
type CgEmbedBannerProps = {
    bannerId: string;
};
export declare const EmbedBannerWidget: import("react-native").HostComponent<CgEmbedBannerProps> | (() => never);
export declare function RegisterDevice(userdata: Object): Promise<number>;
export declare function dataClear(): Promise<number>;
export declare function sendData(obj: Object): Promise<number>;
export declare function openWallet(obj?: Object): Promise<number>;
export declare function loadCampaignById(id: String, obj?: Object): Promise<number>;
export declare function enableAnalytic(b: Boolean): Promise<number>;
export declare function sendEventToJs(b: NativeEventEmitter): Promise<number>;
export declare function disableGluSdk(a: Boolean): Promise<number>;
export declare function configureLoaderColour(colr: String): Promise<number>;
export declare function configureDarkBackgroundColor(colr: String): Promise<number>;
export declare function configureLightBackgroundColor(colr: String): Promise<number>;
export declare function listenToDarkMode(isdarkmode: Boolean): Promise<number>;
export declare function enableDarkMode(darkmode: Boolean): Promise<number>;
export declare function handleDeepLinkUri(url: String): Promise<number>;
export declare function configureLightLoaderURL(url: String): Promise<number>;
export declare function configureDarkLoaderURL(url: String): Promise<number>;
export declare function configureLightEmbedLoaderURL(url: String): Promise<number>;
export declare function configureDarkEmbedLoaderURL(url: String): Promise<number>;
export declare function configureStatusBarColour(color: String): Promise<number>;
export declare function configureLoadingScreenColor(color: String): Promise<number>;
export declare function enablePrecaching(): Promise<number>;
export declare function gluSDKDebuggingMode(b: Boolean): Promise<number>;
export declare function enableEntryPoints(b: boolean): Promise<number>;
export declare function closeWebView(b: Boolean): Promise<number>;
export declare function isFcmApn(id: Boolean): Promise<number>;
export declare function configureSafeArea(obj: Object): Promise<number>;
export declare function SetDefaultBannerImage(url: String): Promise<number>;
export declare function UpdateProfile(obj: Object): Promise<number>;
export declare function DisplayCustomerGluNotification(): Promise<number>;
export declare function CGApplication(): Promise<number>;
export declare function DisplayCGNotification(obj: Object, autoclosewebview?: Boolean): Promise<number>;
export declare function DisplayCGBackgroundNotification(obj: Object, autoclosewebview?: Boolean): Promise<number>;
export declare function GetRefferalId(url: String): Promise<number>;
export declare function LoadAllCampagins(): Promise<number>;
export declare function LoadCampaginsByFilter(obj: Object): Promise<number>;
export declare function SetCurrentClassName(clname: String): Promise<number>;
export declare function configureWhiteListedDomains(arr: Array<String>): Promise<number>;
export declare function configureDomainCodeMsg(obj: Object): Promise<number>;
export declare function setApnFcmToken(a: string, b: String): Promise<number>;
export declare function getBannerHeight(): Promise<number>;
export declare function openNudge(nudgeid: String, data?: object): Promise<string>;
export {};
