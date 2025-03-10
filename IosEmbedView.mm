//
//  IosEmbedView.mm
//  Pods
//
//  Created by Himanshu Trehan on 11/03/25.
//

#import "IosEmbedView.h"
#import <WebKit/WebKit.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNNotification.h>
#import <CustomerGlu/CustomerGlu-Swift.h>
#import <objc/runtime.h>

@implementation IosEmbedView {
    CGEmbedView *_embedView;
    NSString *_embedId;
    BOOL _bannerInitialized;
    BOOL _isHeightUpdated;
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

- (void)setEmbedId:(NSString *)embedId {
    NSLog(@"[IosView] set_embedId called with: %@", embedId);
    _embedId = embedId;
    
    if (!_bannerInitialized || ![_embedId isEqualToString:embedId]) {
        // Remove existing banner if any
        if (_embedView) {
            [_embedView removeFromSuperview];
            _embedView = nil;
            NSLog(@"[IosView] Removed existing banner view");
        }
        
        if (embedId) {
            [self createBannerView];
        }
    }
}

- (void)createBannerView {
    NSLog(@"[IosView] Creating banner view");
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_embedView = [[CGEmbedView alloc] initWithFrame:self.bounds embedId:self->_embedId];
        
        if (self->_embedView) {
            self.userInteractionEnabled = YES;
            self->_embedView.userInteractionEnabled = YES;
            NSLog(@"[IosView] Banner view created, userInteractionEnabled: %d", self->_embedView.userInteractionEnabled);
            
            [self addSubview:self->_embedView];
            self->_embedView.frame = self.bounds;
            self->_embedView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            self->_bannerInitialized = YES;
            [self setNeedsLayout];
        
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

//- (void)layoutSubviews {
//    [super layoutSubviews];
//
//    if (_embedView) {
//        _embedView.frame = self.bounds;
//    }
//}

//- (void)didMoveToSuperview {
//    [super didMoveToSuperview];
//
//    if (_bannerId && !_embedView) {
//        NSLog(@"[IosView] didMoveToSuperview - recreating banner view");
//        [self createBannerView];
//    }
//}
//
//- (void)didMoveToWindow {
//    [super didMoveToWindow];
//
//    if (self.window && _bannerId && !_embedView) {
//        NSLog(@"[IosView] didMoveToWindow - recreating banner view");
//        [self createBannerView];
//    }
//}

// Direct touch handling to manually forward touches to BannerView
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    NSLog(@"[IosView] touchesBegan detected in IosView");
       
       if (_embedView) {
           UITouch *touch = [touches anyObject];
           CGPoint point = [touch locationInView:self];
           
           // Check if the touch is within the banner view
           if (CGRectContainsPoint(_embedView.frame, point)) {
               NSLog(@"[IosView] Touch is within banner view bounds");
               
               // Option 1: Try calling handleTap: with nil since we can't create a properly configured gesture recognizer
               NSLog(@"[IosView] Directly calling handleTap: on BannerView");
               [_embedView performSelector:@selector(handleTap:) withObject:nil];
               
               // Don't call super so we consume the event
               return;
           }
       }
       
       [super touchesBegan:touches withEvent:event];
}

@end
