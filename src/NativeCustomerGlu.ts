import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface NudgeConfiguration {
  layout?: string;
  [key: string]: any;
}

export interface Spec extends TurboModule {
  // Required methods
  initCGSDK(environment: string): Promise<boolean>;
  registerDevice(userAttributes: { [key: string]: any }): Promise<boolean>;

  // Optional methods
  logout(): Promise<void>;
  clearGluData(): Promise<void>;
  dataClear(): Promise<void>;
  testIntegration(): Promise<boolean>;

  // Banner methods
  loadBanner(bannerId: string): Promise<boolean>;
  loadEmbedBanner(bannerId: string): Promise<boolean>;
  closeBanner(bannerId: string): Promise<boolean>;
  closeWebView(): Promise<boolean>;
  SetDefaultBannerImage(imageUrl: string): Promise<boolean>;

  // Campaign methods
  loadCampaign(campaignId: string): Promise<boolean>;
  loadCampaignById(
    campaignId: string,
    config?: { nudgeConfiguration: NudgeConfiguration }
  ): Promise<boolean>;
  loadCampaignWithUrl(
    url: string,
    config?: { nudgeConfiguration: NudgeConfiguration }
  ): Promise<boolean>;
  LoadAllCampagins(): Promise<boolean>;
  LoadCampaginsByFilter(filter: string): Promise<boolean>;
  isCampaignValid(campaignId: string): Promise<boolean>;
  getCampaignStatus(campaignId: string): Promise<boolean>;
  openWallet(config?: {
    nudgeConfiguration: NudgeConfiguration;
  }): Promise<boolean>;
  openNotifications(): Promise<boolean>;
  openEntryPoint(entryPointId: string): Promise<boolean>;
  enableEntryPoints(enabled: boolean): Promise<boolean>;

  // Configuration methods
  configureLoaderColour(color: string): Promise<boolean>;
  configureLoadingScreenColor(color: string): Promise<boolean>;
  configureStatusBarColour(color: string): Promise<boolean>;
  configureDarkBackgroundColor(color: string): Promise<boolean>;
  configureLightBackgroundColor(color: string): Promise<boolean>;
  configureWhiteListedDomains(domains: string[]): Promise<boolean>;
  configureDomainCodeMsg(message: string): Promise<boolean>;
  enableDebugging(enabled: boolean): Promise<boolean>;
  enableDarkMode(enabled: boolean): Promise<boolean>;
  enablePrecaching(enabled: boolean): Promise<boolean>;
  gluSDKDebuggingMode(enabled: boolean): Promise<boolean>;

  // Event methods
  sendEventData(
    eventName: string,
    eventProperties: { [key: string]: any }
  ): Promise<boolean>;
  sendData(data: { [key: string]: any }): Promise<boolean>;
  sendUserData(userData: { [key: string]: any }): Promise<boolean>;

  // Analytics methods
  enableAnalytics(enabled: boolean): Promise<boolean>;
  enableAnalytic(enabled: boolean): Promise<boolean>;
  disableAnalytics(disabled: boolean): Promise<boolean>;

  // User methods
  UpdateUserAttributes(attributes: { [key: string]: any }): Promise<boolean>;
  UpdateProfile(profile: { [key: string]: any }): Promise<boolean>;
  allowAnonymousRegistration(allow: boolean): Promise<boolean>;

  // Notification methods
  DisplayCGNotification(notification: { [key: string]: any }): Promise<boolean>;
  DisplayCGBackgroundNotification(notification: {
    [key: string]: any;
  }): Promise<boolean>;

  // PIP (Picture in Picture) methods
  addMarginsForPIP(margins: { [key: string]: number }): Promise<boolean>;
  addDelayForPIP(delay: number): Promise<boolean>;

  // Utility methods
  getDeviceId(): Promise<string>;
  getUserId(): Promise<string>;
  GetRefferalId(): Promise<string>;
  getDefaultLanguage(): Promise<string>;
  setDefaultLanguage(language: string): Promise<boolean>;
  handleDeepLinkUri(uri: string): Promise<boolean>;
  setOpenWalletAsFallback(enabled: boolean): Promise<boolean>;
  disableGluSdk(disabled: boolean): Promise<boolean>;
  SetCurrentClassName(className: string): Promise<boolean>;
  SetCGCurrentClassName(className: string): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
