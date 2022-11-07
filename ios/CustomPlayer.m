//
//  CustomPlayer.m
//  CustomerRN_App
//
//  Created by kapil on 01/07/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"
#import "UIView+React.h"

@interface RCT_EXTERN_MODULE(BannerWidget, RCTViewManager)
     RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)
@end

@interface RCT_EXTERN_MODULE(EmbedBannerWidget, RCTViewManager)
     RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)

//       RCT_CUSTOM_VIEW_PROPERTY(name, NSString, BannerWidget)
//          {
//           NSLog(@"%@", json);
//          }
//RCT_CUSTOM_VIEW_PROPERTY(src, NSString, NSObject) {
////    [self performSelector:@selector(setSrc:) withObject:@{@"view":view, @"json":json}];
//    [self setValue:@"testets" forKey:@"setSrc"];
//}

//RCT_EXPORT_VIEW_PROPERTY(bannerId, NSString)

@end
