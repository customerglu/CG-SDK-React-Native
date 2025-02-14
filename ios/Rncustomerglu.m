#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(RNCCustomerGluTurboModule, Rncustomerglu, NSObject)

// Core methods
RCT_EXTERN_METHOD(registerDevice:(NSDictionary *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sendData:(NSDictionary *)data)
RCT_EXTERN_METHOD(dataClear)
RCT_EXTERN_METHOD(testIntegration)

// Campaign methods
RCT_EXTERN_METHOD(loadCampaignById:(NSString *)id
                  nudgeconfigdata:(NSDictionary *)config)

RCT_EXTERN_METHOD(loadCampaignWithUrl:(NSString *)url
                  nudgeconfigdata:(NSDictionary *)config)

RCT_EXTERN_METHOD(openWallet:(NSDictionary *)config)

// Configuration methods
RCT_EXTERN_METHOD(initCGSDK:(NSString *)env)
RCT_EXTERN_METHOD(enableAnalytic:(BOOL)enabled)
RCT_EXTERN_METHOD(allowAnonymousRegistration:(BOOL)enabled)
RCT_EXTERN_METHOD(disableGluSdk:(BOOL)disabled)

// UI Configuration
RCT_EXTERN_METHOD(configureLoaderColour:(NSString *)color)
RCT_EXTERN_METHOD(configureDarkBackgroundColor:(NSString *)color)
RCT_EXTERN_METHOD(configureLightBackgroundColor:(NSString *)color)
RCT_EXTERN_METHOD(configureStatusBarColour:(NSString *)color)
RCT_EXTERN_METHOD(configureLoadingScreenColor:(NSString *)color)

// Feature flags
RCT_EXTERN_METHOD(enablePrecaching)
RCT_EXTERN_METHOD(gluSDKDebuggingMode:(BOOL)enabled)
RCT_EXTERN_METHOD(enableEntryPoints:(BOOL)enabled)

// Event handling
RCT_EXTERN_METHOD(handleDeepLinkUri:(NSString *)url)
RCT_EXTERN_METHOD(closeWebView:(BOOL)enabled)

// Campaign validation
RCT_EXTERN_METHOD(isCampaignValid:(NSString *)campaignId
                  dataFlag:(NSString *)dataFlag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getCampaignStatus:(NSString *)campaignId
                  dataFlag:(NSString *)dataFlag
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Additional methods
RCT_EXTERN_METHOD(setOpenWalletAsFallback:(BOOL)value)
RCT_EXTERN_METHOD(addMarginsForPIP:(NSInteger)horizontal
                  vertical:(NSInteger)vertical
                  pipType:(NSString *)type)
RCT_EXTERN_METHOD(addDelayForPIP:(NSInteger)delay)

@end

// Banner Widget View Manager
@interface RCT_EXTERN_MODULE(BannerWidget, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)
@end

// Embed Banner Widget View Manager
@interface RCT_EXTERN_MODULE(EmbedBannerWidget, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)
@end
