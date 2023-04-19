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


type CgEmbedBannerProps = {
      bannerId: string;
    };

const EmbedBannerName='EmbedBannerWidget'
export const EmbedBannerWidget =
  UIManager.getViewManagerConfig(EmbedBannerName) != null
    ? requireNativeComponent<CgEmbedBannerProps>(EmbedBannerName)
    : () => {
      throw new Error(LINKING_ERROR);
    };



export function RegisterDevice(userdata: Object): Promise<number> {
  return Rncustomerglu.registerDevice(userdata);
}
export function dataClear(): Promise<number> {
  return Rncustomerglu.dataClear();
}
export function sendData(obj: Object): Promise<number> {
  return Rncustomerglu.sendData(obj);
}
export function openWallet(obj:Object={}): Promise<number> {
  return Rncustomerglu.openWallet(obj)
}

export function loadCampaignById(id: String,obj:Object={}): Promise<number> {
    return Rncustomerglu.loadCampaignById(id, obj);
  
}
export function loadCampaignWithUrl(url: String,obj:Object): Promise<number> {
  return Rncustomerglu.loadCampaignWithUrl(url, obj);

}

export function enableAnalytic(b: Boolean): Promise<number> {
  return Rncustomerglu.enableAnalytic(b);
}

export function allowAnonymousRegistration(b: Boolean): Promise<number> {
  return Rncustomerglu.allowAnonymousRegistration(b);
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

//2jan2023

export function configureDarkBackgroundColor(colr: String): Promise<number> {
  return Rncustomerglu.configureDarkBackgroundColor(colr);
}
export function configureLightBackgroundColor(colr: String): Promise<number> {
  return Rncustomerglu.configureLightBackgroundColor(colr);
}
export function listenToDarkMode(isdarkmode: Boolean): Promise<number> {
  return Rncustomerglu.listenToDarkMode(isdarkmode);
}
export function enableDarkMode(darkmode: Boolean): Promise<number> {
  return Rncustomerglu.enableDarkMode(darkmode);
}
//end
//3jan2023
export function handleDeepLinkUri(url: String): Promise<number> {
  return Rncustomerglu.handleDeepLinkUri(url);
}
//end

//16jan2023
export function configureLightLoaderURL(url: String): Promise<number> {
  return Rncustomerglu.configureLightLoaderURL(url);
}
export function configureDarkLoaderURL(url: String): Promise<number> {
  return Rncustomerglu.configureDarkLoaderURL(url);
}
export function configureLightEmbedLoaderURL(url: String): Promise<number> {
  return Rncustomerglu.configureLightEmbedLoaderURL(url);
}
export function configureDarkEmbedLoaderURL(url: String): Promise<number> {
  return Rncustomerglu.configureDarkEmbedLoaderURL(url);
}
//end
export function configureStatusBarColour(color: String): Promise<number> {
  return Rncustomerglu.configureStatusBarColour(color);
}

export function configureLoadingScreenColor(color: String): Promise<number> {
  return Rncustomerglu.configureLoadingScreenColor(color);
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
export function DisplayCGNotification(obj: Object, autoclosewebview: Boolean = false): Promise<number> {
  return Rncustomerglu.DisplayCGNotification(obj, autoclosewebview);
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

export function openNudge(nudgeid:String,data:object={}): Promise<string> {
  if(nudgeid!=null){
    return Rncustomerglu.OpenNudgeRN(nudgeid,data);
  }else{
    throw new Error("nudgeId can't be empty");
    
  }
}

