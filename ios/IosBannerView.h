#import <React/RCTView.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface IosBannerView : RCTView

@property (nonatomic, strong) NSString *bannerId;
- (void)setBannerId:(NSString *)bannerId;

@end

NS_ASSUME_NONNULL_END
