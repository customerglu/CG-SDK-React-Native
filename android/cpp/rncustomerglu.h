#pragma once

#include <fbjni/fbjni.h>
#include <jsi/jsi.h>
#include <ReactCommon/CallInvokerHolder.h>
#include <ReactCommon/TurboModule.h>

namespace facebook {
namespace react {

class RncustomergluTurboModule : public jni::HybridClass<RncustomergluTurboModule> {
public:
    static auto constexpr kJavaDescriptor = "Lcom/reactnativerncustomerglu/RncustomergluModule;";

    static void registerNatives();
    
    RncustomergluTurboModule(jni::alias_ref<jhybridobject> jThis);

    // Core methods
    jsi::Value registerDevice(jsi::Runtime& runtime, const jsi::Object& data);
    void sendData(jsi::Runtime& runtime, const jsi::Object& data);
    void dataClear(jsi::Runtime& runtime);
    void testIntegration(jsi::Runtime& runtime);
    
    // Campaign methods
    void loadCampaignById(jsi::Runtime& runtime, const jsi::String& id, const jsi::Object& config);
    void loadCampaignWithUrl(jsi::Runtime& runtime, const jsi::String& url, const jsi::Object& config);
    void openWallet(jsi::Runtime& runtime, const jsi::Object& config);
    
    // Configuration methods
    void initCGSDK(jsi::Runtime& runtime, const jsi::String& env);
    void enableAnalytic(jsi::Runtime& runtime, bool enabled);
    void allowAnonymousRegistration(jsi::Runtime& runtime, bool enabled);
    void disableGluSdk(jsi::Runtime& runtime, bool disabled);

private:
    friend HybridBase;
    jni::global_ref<jhybridobject> javaPart_;
};

} // namespace react
} // namespace facebook
