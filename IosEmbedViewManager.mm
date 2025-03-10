#import <React/RCTViewManager.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import "IosEmbedView.h"

@interface IosEmbedViewViewManager : RCTViewManager
@end

@implementation IosEmbedViewViewManager

RCT_EXPORT_MODULE(CGEmbedView)

- (UIView *)view {
    return [[IosEmbedView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
