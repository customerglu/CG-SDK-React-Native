#import "IosView.h"
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <CustomerGlu/CustomerGlu-Swift.h>
#import <objc/runtime.h>

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
        NSLog(@"[IosView] Initialized with frame: %@, userInteractionEnabled: %d", NSStringFromCGRect(frame), self.userInteractionEnabled);
    }
    return self;
}

- (void)setBannerId:(NSString *)bannerId {
    NSLog(@"[IosView] setBannerId called with: %@", bannerId);
    _bannerId = bannerId;
    
    if (!_bannerInitialized || ![_bannerId isEqualToString:bannerId]) {
        // Remove existing banner if any
        if (_bannerView) {
            [_bannerView removeFromSuperview];
            _bannerView = nil;
            NSLog(@"[IosView] Removed existing banner view");
        }
        
        if (bannerId) {
            [self createBannerView];
        }
    }
}

- (void)createBannerView {
    NSLog(@"[IosView] Creating banner view");
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_bannerView = [[BannerView alloc] initWithFrame:self.bounds bannerId:self->_bannerId];
        
        if (self->_bannerView) {
            self.userInteractionEnabled = YES;
            self->_bannerView.userInteractionEnabled = YES;
            NSLog(@"[IosView] Banner view created, userInteractionEnabled: %d", self->_bannerView.userInteractionEnabled);
            
            [self addSubview:self->_bannerView];
            self->_bannerView.frame = self.bounds;
            self->_bannerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            self->_bannerInitialized = YES;
            [self setNeedsLayout];
            
            // Log the subviews and ensure they're interactive
            NSLog(@"[IosView] Banner view has %lu subviews", (unsigned long)self->_bannerView.subviews.count);
            for (UIView *subview in self->_bannerView.subviews) {
                NSLog(@"[IosView] Subview: %@, userInteractionEnabled: %d", [subview class], subview.userInteractionEnabled);
                subview.userInteractionEnabled = YES;
                
                // If this is a UIScrollView (which the BannerView uses), check its subviews too
                if ([subview isKindOfClass:[UIScrollView class]]) {
                    UIScrollView *scrollView = (UIScrollView *)subview;
                    NSLog(@"[IosView] ScrollView has %lu subviews", (unsigned long)scrollView.subviews.count);
                    
                    for (UIView *scrollSubview in scrollView.subviews) {
                        NSLog(@"[IosView] ScrollView subview: %@, userInteractionEnabled: %d", [scrollSubview class], scrollSubview.userInteractionEnabled);
                        scrollSubview.userInteractionEnabled = YES;
                    }
                }
            }
        } else {
            [self showError:@"Failed to create banner view"];
            NSLog(@"[IosView] Failed to create banner view");
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
    
    if (_bannerView) {
        _bannerView.frame = self.bounds;
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    
    if (_bannerId && !_bannerView) {
        NSLog(@"[IosView] didMoveToSuperview - recreating banner view");
        [self createBannerView];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    
    if (self.window && _bannerId && !_bannerView) {
        NSLog(@"[IosView] didMoveToWindow - recreating banner view");
        [self createBannerView];
    }
}

// Direct touch handling to manually forward touches to BannerView
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"[IosView] touchesBegan detected in IosView");
       
       if (_bannerView) {
           UITouch *touch = [touches anyObject];
           CGPoint point = [touch locationInView:self];
           
           // Check if the touch is within the banner view
           if (CGRectContainsPoint(_bannerView.frame, point)) {
               NSLog(@"[IosView] Touch is within banner view bounds");
               
               // Option 1: Try calling handleTap: with nil since we can't create a properly configured gesture recognizer
               NSLog(@"[IosView] Directly calling handleTap: on BannerView");
               [_bannerView performSelector:@selector(handleTap:) withObject:nil];
               
               // Don't call super so we consume the event
               return;
           }
       }
       
       [super touchesBegan:touches withEvent:event];
}

@end
