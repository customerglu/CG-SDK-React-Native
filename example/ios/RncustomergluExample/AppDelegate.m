/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//#import "RNNotifications.h"

#import "AppDelegate.h"
#import <React/RCTDevLoadingView.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <RNCPushNotificationIOS.h>
@import CustomerGlu;

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif


RCTBridge *rnBridge;

//@implementation PublicBridgeHelper
//-(RCTBridge*)getBridge{
//  NSLog(@"rnBridge = @%@",rnBridge);
//  return rnBridge;
//}
//@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
  [FIRApp configure];
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif
  
  
  [application registerForRemoteNotifications];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"RncustomergluExample"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
//
//   UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
//       UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//   [[UNUserNotificationCenter currentNotificationCenter]
//       requestAuthorizationWithOptions:authOptions
//       completionHandler:^(BOOL granted, NSError * _Nullable error) {
//         // ...
//       }];
//  ;
//
////  [[CustomerGlu getInstance] isFcmApnWithFcmApn:@"fcm"];
//
//
////  [FIRMessaging messaging].delegate = self;
//
////  customerGlu.isFcmApn(fcmApn:"fcm")
//
//  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//
//  center.delegate = self;
//
//  [center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert) completionHandler:^(BOOL granted, NSError * _Nullable error) {
//
//    if (!error) {
//
//           NSLog(@"request authorization succeeded!");
//
//    } }];
//
//
//
//  if ([application respondsToSelector:@selector(isRegisteredForRemoteNotifications)])
//
//  {
//
//      [application registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound |UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
//
//  }
//
//
//
//[application registerForRemoteNotifications];

  return YES;
}


//////Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{

  NSLog(@"cgUserNotificationCenter");
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);

}

//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
//{
//
//
////  [CustomerGlu getInstance].apnToken = [self stringWithDeviceToken:deviceToken];
////  NSLog(@"deviceToken = @%@",deviceToken);
//
//// [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//}
//- (NSString *)stringWithDeviceToken:(NSData *)deviceToken {
//    const char *data = [deviceToken bytes];
//    NSMutableString *token = [NSMutableString string];
//
//    for (NSUInteger i = 0; i < [deviceToken length]; i++) {
//        [token appendFormat:@"%02.2hhX", data[i]];
//    }
//
//    return [token copy];
//}
//// Required for the notification event. You must call the completion handler after handling the remote notification.
//
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
//{
//  NSLog(@"cgapplication");
////  [[CustomerGlu getInstance] cgapplication:application didReceiveRemoteNotification:userInfo backgroundAlpha:0.5f auto_close_webview:TRUE fetchCompletionHandler:completionHandler];
//  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//// Required for the registrationError event.
//- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
//}
//// Required for localNotification event
//
//
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//         withCompletionHandler:(void (^)(void))completionHandler
//{
//  NSLog(@"displayBackgroundNotificationWithRemoteMessage");
  //
//  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
//}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" ];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


#pragma mark -


// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

#pragma mark -

  
@end

