#import <React/RCTViewManager.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import "IosView.h"

@interface IosViewManager : RCTViewManager
@end

@implementation IosViewManager

RCT_EXPORT_MODULE(BannerView)

- (UIView *)view {
    return [[IosView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
