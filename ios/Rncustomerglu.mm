#import "Rncustomerglu.h"
#import <CustomerGlu/CustomerGlu.h>
#import <React/RCTEventEmitter.h>
#import "RCTFabricSurface.h"
#import "MultiplyFunction.h"
// Import the Swift-generated header
 #import "ReactNativeCustomerglu-Swift.h"

// Import C++ standard library headers
#include <optional>
#include <tuple>
#include <utility>

// Forward declaration of ReactNativeCustomerglu class
@interface ReactNativeCustomerglu : RCTEventEmitter <RCTBridgeModule>
+ (instancetype)shared;
- (void)initCGSDK:(NSString *)flag;
- (void)registerDevice:(NSDictionary *)userdata
              resolver:(RCTPromiseResolveBlock)resolve
              rejecter:(RCTPromiseRejectBlock)reject;
- (void)emitEvent:(NSString *)name body:(id)body;
@end

@implementation Rncustomerglu
RCT_EXPORT_MODULE()


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReactNativeCustomergluSpecJSI>(params);
}

- (void)DisplayCGBackgroundNotification:(nonnull NSDictionary *)obj autoclosewebview:(nonnull NSNumber *)autoclosewebview { 
    
}

- (void)DisplayCGNotification:(nonnull NSDictionary *)obj autoclosewebview:(nonnull NSNumber *)autoclosewebview { 
    
}

- (void)DisplayCustomerGluNotification { 
    
}

- (void)SetCurrentClassName:(nonnull NSString *)clname resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)UpdateProfile:(nonnull NSDictionary *)obj { 
    
}

- (void)UpdateUserAttributes:(nonnull NSDictionary *)userdata { 
    
}

- (void)addDelayForPIP:(double)delay { 
    
}

- (void)addListener:(nonnull NSString *)eventType { 
    
}

- (void)addMarginsForPIP:(double)horizontal vertical:(double)vertical type:(nonnull NSString *)type { 
    
}

- (void)allowAnonymousRegistration:(BOOL)b { 
    
}

- (void)dataClear { 
    
}

- (void)enableAnalytic:(BOOL)b { 
    
}

- (void)enableEntryPoints:(BOOL)b { 
    
}

- (void)getBannerHeight:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)getCampaignStatus:(nonnull NSString *)campaignId dataFlag:(nonnull NSString *)dataFlag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)gluSDKDebuggingMode:(BOOL)b { 
    
}

- (void)initCGSDK:(nonnull NSString *)obj { 
    // Forward to the implementation in ReactNativeCustomerglu
    id instance = [ReactNativeCustomerglu shared];
    if (instance) {
        [instance initCGSDK:obj];
    } else {
        NSLog(@"ReactNativeCustomerglu shared instance is nil");
    }
}

- (void)isCampaignValid:(nonnull NSString *)campaignId dataFlag:(nonnull NSString *)dataFlag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)isFcmApn:(BOOL)value {
    
}

- (void)loadCampaignById:(nonnull NSString *)campid obj:(nonnull NSDictionary *)obj {
    
}

- (void)loadCampaignWithUrl:(nonnull NSString *)url obj:(nonnull NSDictionary *)obj { 
    
}

- (void)openWallet:(nonnull NSDictionary *)obj { 
    
}

- (void)registerDevice:(nonnull NSDictionary *)data resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    // Forward to the implementation in ReactNativeCustomerglu
    id instance = [ReactNativeCustomerglu shared];
    if (instance) {
        [instance registerDevice:data resolver:resolve rejecter:reject];
    } else {
        NSLog(@"ReactNativeCustomerglu shared instance is nil");
        resolve(@(NO));
    }
}

- (void)removeListeners:(double)count { 
    
}

- (void)sendData:(nonnull NSDictionary *)obj { 
    
}

- (void)setApnFcmToken:(nonnull NSString *)a b:(nonnull NSString *)b { 
    
}

- (void)setOpenWalletAsFallback:(BOOL)value { 
    
}

- (void)multiply:(double)a b:(double)b resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    // Call the Objective-C implementation
    double result = [MultiplyFunction multiply:a:b];
    resolve(@(result));
}

@end
