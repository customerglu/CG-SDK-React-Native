#import "Rncustomerglu.h"

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
    
}

- (void)isCampaignValid:(nonnull NSString *)campaignId dataFlag:(nonnull NSString *)dataFlag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)isFcmApn:(BOOL)id { 
    
}

- (void)loadCampaignById:(nonnull NSString *)id obj:(nonnull NSDictionary *)obj { 
    
}

- (void)loadCampaignWithUrl:(nonnull NSString *)url obj:(nonnull NSDictionary *)obj { 
    
}

- (void)openWallet:(nonnull NSDictionary *)obj { 
    
}

- (void)registerDevice:(nonnull NSDictionary *)data resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
}

- (void)removeListeners:(double)count { 
    
}

- (void)sendData:(nonnull NSDictionary *)obj { 
    
}

- (void)setApnFcmToken:(nonnull NSString *)a b:(nonnull NSString *)b { 
    
}

- (void)setOpenWalletAsFallback:(BOOL)value { 
    
}

@end
