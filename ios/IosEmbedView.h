#import <React/RCTView.h>
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface IosEmbedView : RCTView

@property (nonatomic, strong) NSString *embedId;
- (void)setEmbedId:(NSString *)embedId;

@end

NS_ASSUME_NONNULL_END
