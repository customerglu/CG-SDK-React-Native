#import "IosView.h"
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <CustomerGlu/CustomerGlu-Swift.h>

@implementation IosView {
    BannerView *_bannerView;
    NSString *_bannerId;
    BOOL _bannerInitialized;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // Initialize view
        self.userInteractionEnabled = YES;
        _bannerInitialized = NO;
    }
    return self;
}

- (void)setBannerId:(NSString *)bannerId {
    _bannerId = bannerId;
    
    // Since we're changing our approach, don't remove the existing banner if the ID is the same
    // Only create a new one if we haven't already or if the ID changed
    if (!_bannerInitialized || ![_bannerId isEqualToString:bannerId]) {
        // Remove existing banner if any
        if (_bannerView) {
            [_bannerView removeFromSuperview];
            _bannerView = nil;
        }
        
        if (bannerId) {
            [self createBannerView];
        }
    }
}

- (void)createBannerView {
    // Use main thread for UI operations
    dispatch_async(dispatch_get_main_queue(), ^{
        // Create banner view
        self->_bannerView = [[BannerView alloc] initWithFrame:self.bounds bannerId:self->_bannerId];
        
        if (self->_bannerView) {
            // Enable user interaction
            self->_bannerView.userInteractionEnabled = YES;
            
            // Add to view hierarchy
            [self addSubview:self->_bannerView];
            
            // Set proper frame and autoresizing
            self->_bannerView.frame = self.bounds;
            self->_bannerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            
            // Mark as initialized
            self->_bannerInitialized = YES;
            
            // Force layout
            [self setNeedsLayout];
        } else {
            [self showError:@"Failed to create banner view"];
        }
    });
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
    
    // Ensure banner view maintains proper dimensions
    if (_bannerView) {
        _bannerView.frame = self.bounds;
    }
}

// To prevent the banner from disappearing during layout changes
- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    
    // If we have a bannerId but no banner view, recreate it
    if (_bannerId && !_bannerView) {
        [self createBannerView];
    }
}

// To prevent the banner from disappearing when the window changes
- (void)didMoveToWindow {
    [super didMoveToWindow];
    
    // If we're moving to a window and have a bannerId but no banner view, recreate it
    if (self.window && _bannerId && !_bannerView) {
        [self createBannerView];
    }
}

@end
