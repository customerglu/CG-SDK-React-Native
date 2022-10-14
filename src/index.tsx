import {
  NativeEventEmitter, NativeModules, Platform,
  requireNativeComponent,
  UIManager
} from 'react-native';
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

// const CustomPlayer = requireNativeComponent('CustomPlayer', null)               


// const BannerWidgetNativeComponent = requireNativeComponent('BannerWidget');
// module.exports = requireNativeComponent('RNTMap');

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
// console.log("BannerWidget", requireNativeComponent('BannerWidget'));
// console.log("BannerWidget", UIManager.getViewManagerConfig('BannerWidget'));

export function RegisterDevice(userdata: Object): Promise<number> {
  return Rncustomerglu.registerDevice(userdata);
}
export function dataClear(): Promise<number> {
  return Rncustomerglu.dataClear();
}
export function sendData(obj: Object): Promise<number> {
  return Rncustomerglu.sendData(obj);
}
export function openWallet(autoclosewebview: Boolean = false,obj:Object={}): Promise<number> {
  console.log(autoclosewebview,obj,typeof autoclosewebview)

  if(typeof autoclosewebview==='boolean'){
    obj['autoclosewebview']=autoclosewebview
    return Rncustomerglu.openWallet(obj);
  }else if(typeof autoclosewebview==='object'){
    return Rncustomerglu.openWallet(autoclosewebview);
  }
}

export function loadCampaignById(id: String,autoclosewebview: Boolean = false,obj:Object={}): Promise<number> {
  console.log(autoclosewebview,obj,typeof autoclosewebview)

  if(typeof autoclosewebview==='boolean'){
    obj['autoclosewebview']=autoclosewebview
    return Rncustomerglu.loadCampaignById(id, obj);
  }else if(typeof autoclosewebview==='object'){
    return Rncustomerglu.loadCampaignById(id, autoclosewebview);
  }
}

export function enableAnalytic(b: Boolean): Promise<number> {
  return Rncustomerglu.enableAnalytic(b);
}

export function sendEventToJs(b: NativeEventEmitter): Promise<number> {
  return Rncustomerglu.sendEventToJs(b);
}

export function disableGluSdk(a: Boolean): Promise<number> {
  return Rncustomerglu.disableGluSdk(a);
}
export function configureLoaderColour(colr: String): Promise<number> {
  return Rncustomerglu.configureLoaderColour(colr);
}
export function enablePrecaching(): Promise<number> {
  return Rncustomerglu.enablePrecaching();
}
export function gluSDKDebuggingMode(b: Boolean): Promise<number> {
  return Rncustomerglu.gluSDKDebuggingMode(b);
}
export function enableEntryPoints(b: boolean): Promise<number> {
  return Rncustomerglu.enableEntryPoints(b);
}
export function closeWebView(b: Boolean): Promise<number> {
  return Rncustomerglu.closeWebView(b);
}
export function isFcmApn(id: Boolean): Promise<number> {
  return Rncustomerglu.isFcmApn(id);
}

export function configureSafeArea(obj: Object): Promise<number> {
  return Rncustomerglu.configureSafeArea(obj);
}

// --------------other 13 methods-----------------

export function SetDefaultBannerImage(url: String): Promise<number> {
  return Rncustomerglu.SetDefaultBannerImage(url);
}
export function UpdateProfile(obj: Object): Promise<number> {
  return Rncustomerglu.UpdateProfile(obj);
}
export function DisplayCustomerGluNotification(): Promise<number> {
  return Rncustomerglu.DisplayCustomerGluNotification();
}
export function CGApplication(): Promise<number> {
  return Rncustomerglu.CGApplication();
}
export function DisplayCGNotification(obj: Object, autoclosewebview: Boolean = false, opacity=0.5): Promise<number> {
  return Rncustomerglu.DisplayCGNotification(obj, autoclosewebview,opacity);
}

export function DisplayCGBackgroundNotification(obj: Object, autoclosewebview: Boolean = false): Promise<number> {
  return Rncustomerglu.DisplayCGBackgroundNotification(obj, autoclosewebview);
}

export function GetRefferalId(url: String): Promise<number> {
  return Rncustomerglu.GetRefferalId(url);
}
export function LoadAllCampagins(): Promise<number> {
  return Rncustomerglu.LoadAllCampagins();
}
export function LoadCampaginsByFilter(obj: Object): Promise<number> {
  return Rncustomerglu.LoadCampaginsByFilter(obj);
}
export function SetCurrentClassName(clname: String): Promise<number> {
  return Rncustomerglu.SetCurrentClassName(clname);
}

export function configureWhiteListedDomains(arr: Array<String>): Promise<number> {
  return Rncustomerglu.configureWhiteListedDomains(arr);
}
export function configureDomainCodeMsg(obj: Object): Promise<number> {
  return Rncustomerglu.configureDomainCodeMsg(obj);
}

export function setApnFcmToken(a: string, b: String): Promise<number> {
  return Rncustomerglu.setApnFcmToken(a, b);
}
export function getBannerHeight(): Promise<number> {
  return Rncustomerglu.getBannerHeight();
}

export function openNudge(data:object): Promise<string> {
  return Rncustomerglu.OpenNudgeRN(data);
}

