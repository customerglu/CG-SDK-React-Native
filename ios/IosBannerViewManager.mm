#import <React/RCTViewManager.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import "IosBannerView.h"

@interface IosBannerViewManager : RCTViewManager
@end

@implementation IosBannerViewManager

RCT_EXPORT_MODULE(BannerView)

- (UIView *)view {
    return [[IosBannerView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
