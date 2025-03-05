import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Required event emitter methods
  addListener(eventType: string): void;
  removeListeners(count: number): void;

  // New multiply function
  multiply(a: number, b: number): Promise<number>;
  
  registerDevice(data:Object): Promise<Boolean>;
  UpdateUserAttributes(userdata: Object): void;
  dataClear(): void;
  sendData(obj: Object): void;
  openWallet(obj?: Object): void;
  initCGSDK(obj: string): void;
  loadCampaignById(campid: string, obj?: Object): void;
  loadCampaignWithUrl(url: string, obj: Object): void;
  enableAnalytic(b: boolean): void;
  allowAnonymousRegistration(b: boolean): void;
  gluSDKDebuggingMode(b: boolean): void;
  enableEntryPoints(b: boolean): void;
  isFcmApn(value: boolean): void;
  UpdateProfile(obj: Object): void;
  DisplayCustomerGluNotification(): void;
  DisplayCGNotification(obj: Object, autoclosewebview?: boolean): void;
  DisplayCGBackgroundNotification(obj: Object, autoclosewebview?: boolean): void;
  SetCurrentClassName(clname: string): Promise<string>;
  setApnFcmToken(a: string, b: string): void;
  getBannerHeight(): Promise<number>;
  addMarginsForPIP(horizontal: number, vertical: number, type: string): void;
  addDelayForPIP(delay: number): void;
  setOpenWalletAsFallback(value: boolean): void;
  isCampaignValid(campaignId: string, dataFlag: string): Promise<Boolean>;
  getCampaignStatus(campaignId: string, dataFlag: string): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Rncustomerglu');
