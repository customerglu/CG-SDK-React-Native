import { NativeEventEmitter, NativeModules, Platform, requireNativeComponent, UIManager } from 'react-native';
// import React from 'react';

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


// const BannerWidgetNativeComponent = requireNativeComponent('BannerWidget');


// export default function BannerWidget(props: Props) {
//   return <BannerWidgetNativeComponent {...props} />;
// }


type CgnativeuiProps = {
  bannerId: string;
};

const ComponentName = 'BannerWidget';
export const BannerWidget =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<CgnativeuiProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };


// const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
// console.log("eventEmitter", eventEmitter);
// console.log("hello event", eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
//   console.log("pppkgkfjhg", event) // "someValue"
// }))


export function registerEx(): Promise<number> {
  return Rncustomerglu.registerDevice();
}

export function RegisterDevice(userdata: Object): Promise<number> {
  return Rncustomerglu.registerDeviceAndroid(userdata);
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

export function sendEventToJsEx(b: NativeEventEmitter): Promise<number> {
  console.log("NativeEventEmitter", NativeEventEmitter);
  return Rncustomerglu.sendEventToJs(b);
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
// export function configureSafeAreaEx(topH: Number, bottomH: Number, topColor: String, bottomColr: String): Promise<number> {
//   return Rncustomerglu.configureSafeArea(topH, bottomH, topColor, bottomColr);
// }

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
export function UpdateProfileExAndroid(userdata: Object): Promise<number> {
  return Rncustomerglu.UpdateProfileAndroid(userdata);
}
export function DisplayCustomerGluNotificationEx(userdata: Object): Promise<number> {
  return Rncustomerglu.DisplayCustomerGluNotification(userdata);
}
export function CGApplicationEx(): Promise<number> {
  return Rncustomerglu.CGApplication();
}
export function DisplayBackGroundNotificationEx(): Promise<number> {
  return Rncustomerglu.DisplayBackGroundNotification();
}
export function GetRefferalIdEx(url: String): Promise<number> {
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


