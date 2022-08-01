#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridgeMethod.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/NSString.h>
#import <Rncustomerglu-Bridging-Header.h>
#import <React/RCTDefines.h>
#import "React/RCTViewManager.h"
#import <React/RCTUIManager.h>


@interface RCT_EXTERN_MODULE(Rncustomerglu, RCTEventEmitter)
RCT_EXTERN_METHOD(supportedEvents)
RCT_EXTERN_METHOD(registerDevice:(NSDictionary *)userdata resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(dataClear)
RCT_EXTERN_METHOD(sendData:(NSDictionary *)property)
RCT_EXTERN_METHOD(openWallet)
RCT_EXTERN_METHOD(loadCampaignIdBy:(NSString *)id )
RCT_EXTERN_METHOD(enableAnalytic:(BOOL *)bool)
RCT_EXTERN_METHOD(disableGluSdk:(BOOL *)bool)
RCT_EXTERN_METHOD(configureLoaderColour:(NSString *)colr)
RCT_EXTERN_METHOD(enablePrecaching)
RCT_EXTERN_METHOD(gluSDKDebuggingMode:(BOOL *)bool)
RCT_EXTERN_METHOD(enableEntryPoints:(BOOL *)bool)
RCT_EXTERN_METHOD(closeWebView:(BOOL *)bool (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isFcmApn:(NSString *)fcm)
RCT_EXTERN_METHOD(configureSafeArea:(NSDictionary *)safe)
RCT_EXTERN_METHOD(SetDefaultBannerImage:(NSString *)url)
RCT_EXTERN_METHOD(UpdateProfile:(NSDictionary *)userdata resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(DisplayCustomerGluNotification)
RCT_EXTERN_METHOD(CGApplication:(NSDictionary *)userInfo)
RCT_EXTERN_METHOD(DisplayBackGroundNotification:(NSDictionary *)obj)
RCT_EXTERN_METHOD(GetRefferalId:(NSURL *)url)
RCT_EXTERN_METHOD(LoadAllCampagins)
RCT_EXTERN_METHOD(LoadCampaginsByFilter:(NSDictionary *)obj)
RCT_EXTERN_METHOD(SetCurrentClassName:(NSString *)clName)
RCT_EXTERN_METHOD(OpenWalletWithUrl:(NSString *)url)
RCT_EXTERN_METHOD(configureWhiteListedDomains:(NSArray *)domain)
RCT_EXTERN_METHOD(configureDomainCodeMsg:(NSDictionary *)codemsg)
RCT_EXTERN_METHOD(catchAnalyticsNotification:(NSDictionary *)notification (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(setApnFcmToken:(NSString *)apn fcmToken:(NSString *)fcm)
RCT_EXTERN_METHOD(getBannerHeight)

@end


