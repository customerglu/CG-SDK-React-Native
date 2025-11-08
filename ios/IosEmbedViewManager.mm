#import <React/RCTViewManager.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import "IosEmbedView.h"

@interface IosEmbedViewManager : RCTViewManager
@end

@implementation IosEmbedViewManager

RCT_EXPORT_MODULE(CGEmbedView)

- (UIView *)view {
    return [[IosEmbedView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(embedId, NSString)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
