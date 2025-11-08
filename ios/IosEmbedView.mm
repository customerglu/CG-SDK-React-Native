#import "IosEmbedView.h"
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <CustomerGlu/CustomerGlu-Swift.h>
#import <objc/runtime.h>

@implementation IosEmbedView {
    CGEmbedView *_embedView;
    NSString *_embedId;
    BOOL _embedInitialized;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // Initialize view
        self.userInteractionEnabled = YES;
        _embedInitialized = NO;
        NSLog(@"[IosEmbedView] Initialized with frame: %@, userInteractionEnabled: %d", NSStringFromCGRect(frame), self.userInteractionEnabled);
    }
    return self;
}

- (void)setEmbedId:(NSString *)embedId {
    NSLog(@"[IosEmbedView] setEmbedId called with: %@", embedId);
    _embedId = embedId;

    if (!_embedInitialized || ![_embedId isEqualToString:embedId]) {
        // Remove existing embed view if any
        if (_embedView) {
            [_embedView removeFromSuperview];
            _embedView = nil;
            NSLog(@"[IosEmbedView] Removed existing embed view");
        }

        if (embedId) {
            [self createEmbedView];
        }
    }
}

- (void)createEmbedView {
    NSLog(@"[IosEmbedView] Creating embed view");
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_embedView = [[CGEmbedView alloc] initWithFrame:self.bounds embedId:self->_embedId];

        if (self->_embedView) {
            self.userInteractionEnabled = YES;
            self->_embedView.userInteractionEnabled = YES;
            NSLog(@"[IosEmbedView] Embed view created, userInteractionEnabled: %d", self->_embedView.userInteractionEnabled);

            [self addSubview:self->_embedView];
            self->_embedView.frame = self.bounds;
            self->_embedView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            self->_embedInitialized = YES;
            [self setNeedsLayout];

        } else {
            [self showError:@"Failed to create embed view"];
            NSLog(@"[IosEmbedView] Failed to create embed view");
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

    if (_embedView) {
        _embedView.frame = self.bounds;
    }
}

@end
