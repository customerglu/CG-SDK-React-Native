#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Rncustomerglu, NSObject)

RCT_EXTERN_METHOD(registerDevice)
RCT_EXTERN_METHOD(dataClear)
RCT_EXTERN_METHOD(sendData:(NSDictionary *)property)
RCT_EXTERN_METHOD(openWallet)

@end
