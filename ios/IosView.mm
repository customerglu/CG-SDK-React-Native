#import "IosView.h"
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <CustomerGlu/CustomerGlu-Swift.h>

@implementation IosView {
    UIView *_bannerView;
    NSString *_bannerId;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // Initialize view
    }
    return self;
}

- (void)setBannerId:(NSString *)bannerId {
    if (_bannerId != bannerId) {
        _bannerId = bannerId;
        
        // Remove existing banner if any
        if (_bannerView) {
            [_bannerView removeFromSuperview];
            _bannerView = nil;
        }
        
        if (_bannerId) {
            // Create banner using CustomerGlu SDK
//            dispatch_async(dispatch_get_main_queue(), ^{
//                Class customerGluClass = NSClassFromString(@"CustomerGlu");
//                if (customerGluClass && [customerGluClass respondsToSelector:@selector(sharedInstance)]) {
//                    id sharedInstance = [customerGluClass ge];
//                    if ([sharedInstance respondsToSelector:@selector(getBannerView:)]) {
//                        self->_bannerView = [sharedInstance getBannerView:_bannerId];
//                        if (self->_bannerView) {
//                            [self addSubview:self->_bannerView];
//                            self->_bannerView.frame = self.bounds;
//                        } else {
//                            [self showError:@"Failed to create banner view"];
//                        }
//                    } else {
//                        [self showError:@"SDK method not found"];
//                    }
//                } else {
//                    [self showError:@"CustomerGlu SDK not found"];
//                }
//            });
        }
    }
}

- (void)showError:(NSString *)message {
    UILabel *errorLabel = [[UILabel alloc] init];
    errorLabel.text = message;
    errorLabel.textColor = [UIColor redColor];
    errorLabel.textAlignment = NSTextAlignmentCenter;
    errorLabel.numberOfLines = 0;
    [self addSubview:errorLabel];
    errorLabel.frame = self.bounds;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (_bannerView) {
        _bannerView.frame = self.bounds;
    }
}

@end
