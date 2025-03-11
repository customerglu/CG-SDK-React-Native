import type { ViewProps } from 'react-native';
interface CustomViewProps extends ViewProps {
    bannerId?: string;
}
interface EmbedViewProps extends ViewProps {
    embedId?: string;
}
export declare const BannerWidget: import("react-native").HostComponent<CustomViewProps>;
export declare const EmbedBannerWidget: import("react-native").HostComponent<EmbedViewProps>;
export declare function RegisterDevice(userdata: Object): Promise<Boolean>;
export declare function UpdateUserAttributes(userdata: Object): void;
export declare function dataClear(): void;
export declare function sendData(obj: Object): void;
export declare function openWallet(obj?: Object): void;
export declare function initCGSDK(obj: string): void;
export declare function loadCampaignById(campid: string, obj?: Object): void;
export declare function loadCampaignWithUrl(url: string, obj: Object): void;
export declare function enableAnalytic(b: boolean): void;
export declare function allowAnonymousRegistration(b: boolean): void;
export declare function gluSDKDebuggingMode(b: boolean): void;
export declare function isFcmApn(value: string): void;
export declare function UpdateProfile(obj: Object): void;
export declare function DisplayCustomerGluNotification(): void;
export declare function DisplayCGNotification(obj: Object, autoclosewebview?: boolean): void;
export declare function DisplayCGBackgroundNotification(obj: Object, autoclosewebview?: boolean): void;
export declare function SetCurrentClassName(clname: string): Promise<string>;
export declare function setApnFcmToken(a: string, b: string): void;
export declare function getBannerHeight(): Promise<number>;
export declare function addMarginsForPIP(horizontal: number, vertical: number, type: string): void;
export declare function addDelayForPIP(delay: number): void;
export declare function setOpenWalletAsFallback(value: boolean): void;
export declare function isCampaignValid(campaignId: string, dataFlag: string): Promise<Boolean>;
export declare function getCampaignStatus(campaignId: string, dataFlag: string): Promise<string>;
export {};
//# sourceMappingURL=index.d.ts.map