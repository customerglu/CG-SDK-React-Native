#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#else
#import <React/RCTBridgeDelegate.h>
#endif

@interface AppDelegate : UIResponder <UIApplicationDelegate, UNUserNotificationCenterDelegate
#ifdef RCT_NEW_ARCH_ENABLED
                                  , RCTCxxBridgeDelegate
#else
                                  , RCTBridgeDelegate
#endif
                                  >

@property (nonatomic, strong) UIWindow *window;
@end
