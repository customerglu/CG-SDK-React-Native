#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>
#import <ReactCommon/RCTTurboModule.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTComponent.h>
#import <React/RCTBridgeDelegate.h>
#import <React/RCTJSIExecutorRuntimeInstaller.h>
#import <ReactCommon/CallInvoker.h>
#import <jsi/jsi.h>

// CustomerGlu SDK headers
#import <CustomerGlu/CustomerGlu-Swift.h>

// Turbo Module specific headers
#import <ReactCommon/TurboModuleManagerDelegate.h>
#import <ReactCommon/TurboModule.h>

using namespace facebook;

// Forward declarations
@class RNCCustomerGluTurboModuleHostObject;

// Declare the TurboModule class
@interface RNCCustomerGluTurboModule : NSObject <RCTTurboModule>
@end

// Declare the module provider function
namespace facebook
{
    namespace react
    {
        std::shared_ptr<TurboModule> RncustomergluModuleProvider(const std::string &name, std::shared_ptr<CallInvoker> jsInvoker);
    }
}
