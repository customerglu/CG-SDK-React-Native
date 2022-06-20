import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Rncustomerglu = NativeModules.Rncustomerglu

  ? NativeModules.Rncustomerglu
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
console.log("NativeModules1231", NativeModules);
console.log("Rncustomerglu123123123", Rncustomerglu)

// export function multiply(a:number,b:number): Promise<number> {
//   return Rncustomerglu.multiply(a,b);
// }
export function registerEx(): Promise<number> {
  return Rncustomerglu.registerDevice();
}

export function dataClearEx(): Promise<number> {
  return Rncustomerglu.dataClear();
}
export function sendDataEX(obj: Object): Promise<number> {
  return Rncustomerglu.sendData(obj);
}
export function openWalletEx(): Promise<number> {
  return Rncustomerglu.openWallet();
}
export function loadCampaignIdByEx(id: String): Promise<number> {
  return Rncustomerglu.loadCampaignIdBy(id);
}
export function enableAnalyticEx(b: Boolean): Promise<number> {
  return Rncustomerglu.enableAnalytic(b);
}

export function disableGluSdkEx(a: Boolean): Promise<number> {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColourEx(colr: String): Promise<number> {
  return Rncustomerglu.configureLoaderColour(colr);
}
export function enablePrecachingEx(): Promise<number> {
  return Rncustomerglu.enablePrecaching();
}
export function gluSDKDebuggingModeEx(b: Boolean): Promise<number> {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}
export function enableEntryPointsEx(b: boolean): Promise<number> {
  return Rncustomerglu.enableEntryPoints(b);
}
export function closeWebViewEx(b: Boolean): Promise<number> {
  return Rncustomerglu.closeWebView(b);
}
export function isFcmApnEx(id: Boolean): Promise<number> {
  return Rncustomerglu.isFcmApn(id);
}


export function configureSafeAreaEx(obj: Object): Promise<number> {
  return Rncustomerglu.configureSafeArea(obj);
}

// --------------other 13 methods-----------------

export function SetDefaultBannerImageEx(url: String): Promise<number> {
  return Rncustomerglu.SetDefaultBannerImage(url);
}
export function UpdateProfileEx(): Promise<number> {
  return Rncustomerglu.UpdateProfile();
}
export function DisplayCustomerGluNotificationEx(): Promise<number> {
  return Rncustomerglu.DisplayCustomerGluNotification();
}
export function CGApplicationEx(): Promise<number> {
  return Rncustomerglu.CGApplication();
}
export function DisplayBackGroundNotificationEx(): Promise<number> {
  return Rncustomerglu.DisplayBackGroundNotification();
}
export function GetRefferalIdEx(url: URL): Promise<number> {
  return Rncustomerglu.GetRefferalId(url);
}
export function LoadAllCampaginsEx(): Promise<number> {
  return Rncustomerglu.LoadAllCampagins();
}
export function LoadCampaginsByFilterEx(obj: Object): Promise<number> {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}
export function SetCurrentClassNameEx(clName: String): Promise<number> {
  return Rncustomerglu.SetCurrentClassName(clName);
}
export function OpenWalletWithUrlEx(url: String): Promise<number> {
  return Rncustomerglu.OpenWalletWithUrl(url);
}
export function configureWhiteListedDomainsEx(): Promise<number> {
  return Rncustomerglu.configureWhiteListedDomains();
}
export function configureDomainCodeMsgEx(): Promise<number> {
  return Rncustomerglu.configureDomainCodeMsg();
}

