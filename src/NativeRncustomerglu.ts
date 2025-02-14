import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface NudgeConfiguration {
  layout?: string;
  opacity?: number;
  closeOnDeepLink?: boolean;
  absoluteHeight?: number;
  relativeHeight?: number;
}

export interface Spec extends TurboModule {
  // Core methods
  registerDevice(data: Object): Promise<boolean>;
  sendData(data: { eventName: string; eventProperties?: Object }): void;
  dataClear(): void;
  testIntegration(): void;
  
  // Campaign methods
  loadCampaignById(id: string, config: { nudgeConfiguration?: NudgeConfiguration }): void;
  loadCampaignWithUrl(url: string, config: { nudgeConfiguration?: NudgeConfiguration }): void;
  openWallet(config: { nudgeConfiguration?: NudgeConfiguration }): void;
  
  // Configuration methods
  initCGSDK(env: string): void;
  enableAnalytic(enabled: boolean): void;
  allowAnonymousRegistration(enabled: boolean): void;
  disableGluSdk(disabled: boolean): void;
  
  // UI Configuration
  configureLoaderColour(color: string): void;
  configureDarkBackgroundColor(color: string): void;
  configureLightBackgroundColor(color: string): void;
  configureStatusBarColour(color: string): void;
  configureLoadingScreenColor(color: string): void;
  
  // Feature flags
  enablePrecaching(): void;
  gluSDKDebuggingMode(enabled: boolean): void;
  enableEntryPoints(enabled: boolean): void;
  
  // Event handling
  handleDeepLinkUri(url: string): void;
  closeWebView(enabled: boolean): void;
  
  // Campaign validation
  isCampaignValid(campaignId: string, dataFlag: string): Promise<boolean>;
  getCampaignStatus(campaignId: string, dataFlag: string): Promise<string>;
  
  // Additional methods
  setOpenWalletAsFallback(value: boolean): void;
  addMarginsForPIP(horizontal: number, vertical: number, type: string): void;
  addDelayForPIP(delay: number): void;
  
  // Banner methods
  SetDefaultBannerImage(url: string): void;
  UpdateUserAttributes(data: Object): void;
  UpdateProfile(data: Object): void;
  DisplayCGNotification(data: Object, autoclosewebview: boolean): void;
  DisplayCGBackgroundNotification(data: Object, autoclosewebview: boolean): void;
  GetRefferalId(url: string): Promise<string>;
  LoadAllCampagins(): void;
  LoadCampaginsByFilter(data: Object): void;
  SetCurrentClassName(className: string): void;
  SetCGCurrentClassName(className: string, epochTimeStamp: string): Promise<string>;
  configureWhiteListedDomains(domains: string[]): void;
  configureDomainCodeMsg(data: { code: number; msg: string }): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Rncustomerglu');
