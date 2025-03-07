#import "Rncustomerglu.h"
#import "CustomerGlu/CustomerGlu-Swift.h"

#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>

@implementation Rncustomerglu {
    bool hasListeners;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"CUSTOMERGLU_ANALYTICS_EVENT"];
}

- (void)handleDeeplinkEvent:(NSNotification *)notification {
    if (hasListeners) {
        NSLog(@"[CustomerGlu] Received analytic event with data: %@", notification.userInfo);
        [self sendEventWithName:@"CUSTOMERGLU_ANALYTICS_EVENT"
                         body:notification.userInfo];
        NSLog(@"[CustomerGlu] Successfully sent deeplink event to JavaScript");
    } else {
        NSLog(@"[CustomerGlu] Received deeplink event but no JavaScript listeners are registered");
    }
}

- (void)startObserving {
    hasListeners = YES;
    NSLog(@"[CustomerGlu] Started observing for deeplink events");
    [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleDeeplinkEvent:)
                                               name:@"CUSTOMERGLU_ANALYTICS_EVENT"
                                             object:nil];
}

- (void)stopObserving {
    hasListeners = NO;
    NSLog(@"[CustomerGlu] Stopped observing for deeplink events");
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReactNativeCustomergluSpecJSI>(params);
}

- (void)DisplayCGBackgroundNotification:(nonnull NSDictionary *)obj autoclosewebview:(nonnull NSNumber *)autoclosewebview { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
      
      @try {
          dispatch_async(dispatch_get_main_queue(), ^{
              [sdk displayBackgroundNotificationWithRemoteMessage:obj auto_close_webview:autoclosewebview];

                         });
        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu displayBackgroundNotificationWithRemoteMessage failed: %@", exception.reason);
        }
}

- (void)DisplayCGNotification:(nonnull NSDictionary *)obj autoclosewebview:(nonnull NSNumber *)autoclosewebview { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
      
      @try {
          dispatch_async(dispatch_get_main_queue(), ^{
              [sdk displayBackgroundNotificationWithRemoteMessage:obj auto_close_webview:autoclosewebview];

                });
        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu DisplayCGNotification failed: %@", exception.reason);
        }
}

- (void)DisplayCustomerGluNotification { 
    
}

- (void)SetCurrentClassName:(nonnull NSString *)clname resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
      
      @try {
          dispatch_async(dispatch_get_main_queue(), ^{
                    CustomerGlu *sdk = [CustomerGlu getInstance];
                    [sdk setCurrentClassNameWithClassName:clname];
                    resolve(clname);
                });

        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu clearGluData failed: %@", exception.reason);
        }
    
}

- (void)UpdateProfile:(nonnull NSDictionary *)obj {
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
      
      @try {
          [sdk updateProfileWithUserdata:obj];

        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu updateProfileWithUserdata failed: %@", exception.reason);
        }
    
    
}

- (void)UpdateUserAttributes:(nonnull NSDictionary *)userdata { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
      
      @try {
          [sdk updateUserAttributesWithCustomAttributes:userdata];

        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu UpdateUserAttributes failed: %@", exception.reason);
        }
}

- (void)addDelayForPIP:(double)delay { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk addDelayForPIPWithDelay:delay];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu addDelayForPIPWithDelay failed: %@", exception.reason);
      }
}

- (void)addListener:(nonnull NSString *)eventType { 
    
}

- (void)addMarginsForPIP:(double)horizontal vertical:(double)vertical type:(nonnull NSString *)type { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk addMarginForPIPWithHorizontal:horizontal vertical:vertical];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu clearGluData failed: %@", exception.reason);
      }
}

- (void)allowAnonymousRegistration:(BOOL)b { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk allowAnonymousRegistrationWithEnabled:b];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu allowAnonymousRegistrationWithEnabled failed: %@", exception.reason);
      }
}

- (void)dataClear { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk clearGluData];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu clearGluData failed: %@", exception.reason);
      }
}

- (void)enableAnalytic:(BOOL)b { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
       
       @try {
           [sdk enableAnalyticsEventWithEvent:b];
         } @catch (NSException *exception) {
             NSLog(@"CustomerGlu enableAnalyticsEventWithEvent failed: %@", exception.reason);
         }
}

- (void)enableEntryPoints:(BOOL)b { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk enableEntryPointsWithEnabled:b];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu enableEntryPoints failed: %@", exception.reason);
      }
}

- (void)getBannerHeight:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
 
}

- (void)getCampaignStatus:(nonnull NSString *)campaignId dataFlag:(nonnull NSString *)dataFlag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    CustomerGlu *sdk = [CustomerGlu getInstance];
        
        @try {
            // Convert NSString to CAMPAIGNDATA enum value
            CAMPAIGNDATA dataFlagEnum;
            
            if ([dataFlag caseInsensitiveCompare:@"API"] == NSOrderedSame) {
                dataFlagEnum = CAMPAIGNDATAAPI;
            } else if ([dataFlag caseInsensitiveCompare:@"CACHE"] == NSOrderedSame) {
                dataFlagEnum = CAMPAIGNDATACACHE;
            } else {
                // Default to API if unknown value is provided
                dataFlagEnum = CAMPAIGNDATAAPI;
            }
            
            [sdk getCampaignStatusWithCampaignId:campaignId dataType:dataFlagEnum completion:^(CAMPAIGN_STATE campaignStatus) {
                NSString *statusString;
                
                // Convert enum value to string based on the typedef
                switch (campaignStatus) {
                    case CAMPAIGN_STATEIN_PROGRESS:
                        statusString = @"IN_PROGRESS";
                        break;
                    case CAMPAIGN_STATEPRISTINE:
                        statusString = @"PRISTINE";
                        break;
                    case CAMPAIGN_STATECOMPLETED:
                        statusString = @"COMPLETED";
                        break;
                    case CAMPAIGN_STATENOT_ELIGIBLE:
                        statusString = @"NOT_ELIGIBLE";
                        break;
                    default:
                        statusString = @"UNKNOWN";
                        break;
                }
                
              
                
                resolve(statusString);
            }];
        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu getCampaignStatus failed: %@", exception.reason);
            reject(@"campaign_status_error", exception.reason, nil);
        }
    
}

- (void)gluSDKDebuggingMode:(BOOL)b { 
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [sdk gluSDKDebuggingModeWithEnabled:YES];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu initialization failed: %@", exception.reason);
      }
}

- (void)initCGSDK:(nonnull NSString *)obj {
    NSLog(@"[CustomerGlu] start init sdk");
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    @try {
        [self startObserving];
        [sdk initializeSdkWithMyenv:obj];
      } @catch (NSException *exception) {
          NSLog(@"CustomerGlu initialization failed: %@", exception.reason);
      }
    
}

- (void)isCampaignValid:(nonnull NSString *)campaignId dataFlag:(nonnull NSString *)dataFlag resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
        
        @try {
            // Convert NSString to CAMPAIGNDATA enum value
            CAMPAIGNDATA dataFlagEnum;
            
            if ([dataFlag caseInsensitiveCompare:@"API"] == NSOrderedSame) {
                dataFlagEnum = CAMPAIGNDATAAPI;
            } else if ([dataFlag caseInsensitiveCompare:@"CACHE"] == NSOrderedSame) {
                dataFlagEnum = CAMPAIGNDATACACHE;
            } else {
                // Default to API if unknown value is provided
                dataFlagEnum = CAMPAIGNDATAAPI;
            }
            
            [sdk isCampaignValidWithCampaignId:campaignId dataType:dataFlagEnum completion:^(BOOL success) {
                if (success) {
                    resolve(@(YES));
                } else {
                    resolve(@(NO));
                }
            }];
        } @catch (NSException *exception) {
            NSLog(@"CustomerGlu getCampaignValid failed: %@", exception.reason);
            reject(@"campaign_status_error", exception.reason, nil);
        }
}

- (void)isFcmApn:(NSString *) value {
    CustomerGlu *sdk = [CustomerGlu getInstance];
         
         @try {
             [sdk isFcmApnWithFcmApn:value];
             
           
         } @catch (NSException *exception) {
             NSLog(@"CustomerGlu isFcm failed: %@", exception.reason);
         }
}

- (void)loadCampaignById:(nonnull NSString *)campid obj:(nonnull NSDictionary *)obj {
    CustomerGlu *sdk = [CustomerGlu getInstance];
         
    @try {
        // Extract values from the dictionary with appropriate defaults
        CGNudgeConfiguration *config = [[CGNudgeConfiguration alloc] init];
        
        if (obj.count == 0) {
                   // If the dictionary is empty, just call the method without a configuration
            dispatch_async(dispatch_get_main_queue(), ^{
                [sdk loadCampaignByIdWithCampaign_id:campid nudgeConfiguration:config auto_close_webview:YES];

                  });
                   return;
               }
               
               // Set values using KVC (Key-Value Coding)
               for (NSString *key in obj) {
                   @try {
                       [config setValue:obj[key] forKey:key];
                   } @catch (NSException *exception) {
                       NSLog(@"Failed to set %@ on CGNudgeConfiguration: %@", key, exception.reason);
                   }
               }
        
        
        // Call the method with the created configuration
        dispatch_async(dispatch_get_main_queue(), ^{
            [sdk loadCampaignByIdWithCampaign_id:campid nudgeConfiguration:config auto_close_webview:YES];

              });
    } @catch (NSException *exception) {
        NSLog(@"CustomerGlu loadCampaignById failed: %@", exception.reason);
    }
    
}


- (void)loadCampaignWithUrl:(nonnull NSString *)url obj:(nonnull NSDictionary *)obj { 
    
}

- (void)openWallet:(nonnull NSDictionary *)obj {
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
         
    @try {
        // Extract values from the dictionary with appropriate defaults
        CGNudgeConfiguration *config = [[CGNudgeConfiguration alloc] init];
        
        if (obj.count == 0) {
            // If the dictionary is empty, just call the method without a configuration
            dispatch_async(dispatch_get_main_queue(), ^{
                [sdk openWalletWithNudgeConfiguration:config];

                  });
            return;
            
        }
               // Set values using KVC (Key-Value Coding)
               for (NSString *key in obj) {
                   @try {
                       [config setValue:obj[key] forKey:key];
                   } @catch (NSException *exception) {
                       NSLog(@"Failed to set %@ on CGNudgeConfiguration: %@", key, exception.reason);
                   }
               }
        
        
        // Call the method with the created configuration
        dispatch_async(dispatch_get_main_queue(), ^{
            [sdk openWalletWithNudgeConfiguration:config];

              });
    } @catch (NSException *exception) {
        NSLog(@"CustomerGlu openWallet failed: %@", exception.reason);
    }
    
}

- (void)registerDevice:(nonnull NSDictionary *)data resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
    
    
    @try {
        [sdk registerDeviceWithUserdata:data completion:^(BOOL success) {
            if (success) {
                resolve(@(YES));
            } else {
                resolve(@(NO));
            }
        }];
    } @catch (NSException *exception) {
        NSLog(@"CustomerGlu registration failed: %@", exception.reason);
        reject(@"registration_error", exception.reason, nil);
    }
    
}

- (void)removeListeners:(double)count { 
    
}

- (void)sendData:(nonnull NSDictionary *)obj { 
    
    CustomerGlu *sdk = [CustomerGlu getInstance];
             
       @try {
           // Extract event name from the dictionary - required parameter
           NSString *eventName = obj[@"eventName"];
           
           // Make sure eventName is present
           if (!eventName || ![eventName isKindOfClass:[NSString class]]) {
               NSLog(@"CustomerGlu sendData failed: eventName is required and must be a string");
               return;
           }
           
           // Extract event properties if present, otherwise use empty dictionary
           NSDictionary *eventProperties = obj[@"eventProperties"];
           if (!eventProperties || ![eventProperties isKindOfClass:[NSDictionary class]]) {
               eventProperties = @{};
           }
           
           // Call the method with extracted values
           [sdk sendEventDataWithEventName:eventName eventProperties:eventProperties];
       } @catch (NSException *exception) {
           NSLog(@"CustomerGlu sendEvent failed: %@", exception.reason);
       }
}

- (void)setApnFcmToken:(nonnull NSString *)a b:(nonnull NSString *)b { 
    CustomerGlu *sdk = [CustomerGlu getInstance];

    @try {
           sdk.apnToken = a;
           sdk.fcmToken = b;
       } @catch (NSException *exception) {
           NSLog(@"CustomerGlu setApnFcmToken failed: %@", exception.reason);
       }
}

- (void)setOpenWalletAsFallback:(BOOL)value {
    CustomerGlu *sdk = [CustomerGlu getInstance];
         
         @try {
             [sdk setOpenWalletAsFallback:value];
           
         } @catch (NSException *exception) {
             NSLog(@"CustomerGlu isFcm failed: %@", exception.reason);
         }
    
}

@end
