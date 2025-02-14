#include "rncustomerglu.h"
#include <fbjni/fbjni.h>
#include <jsi/jsi.h>
#include <ReactCommon/TurboModuleUtils.h>

namespace facebook {
namespace react {

RncustomergluTurboModule::RncustomergluTurboModule(jni::alias_ref<jhybridobject> jThis)
    : javaPart_(jni::make_global(jThis)) {}

void RncustomergluTurboModule::registerNatives() {
    registerHybrid({
        makeNativeMethod("initHybrid", RncustomergluTurboModule::initHybrid),
        makeNativeMethod("registerDevice", RncustomergluTurboModule::registerDevice),
        makeNativeMethod("sendData", RncustomergluTurboModule::sendData),
        makeNativeMethod("dataClear", RncustomergluTurboModule::dataClear),
        makeNativeMethod("testIntegration", RncustomergluTurboModule::testIntegration),
        makeNativeMethod("loadCampaignById", RncustomergluTurboModule::loadCampaignById),
        makeNativeMethod("loadCampaignWithUrl", RncustomergluTurboModule::loadCampaignWithUrl),
        makeNativeMethod("openWallet", RncustomergluTurboModule::openWallet),
        makeNativeMethod("initCGSDK", RncustomergluTurboModule::initCGSDK),
        makeNativeMethod("enableAnalytic", RncustomergluTurboModule::enableAnalytic),
        makeNativeMethod("allowAnonymousRegistration", RncustomergluTurboModule::allowAnonymousRegistration),
        makeNativeMethod("disableGluSdk", RncustomergluTurboModule::disableGluSdk),
    });
}

jsi::Value RncustomergluTurboModule::registerDevice(jsi::Runtime& runtime, const jsi::Object& data) {
    // Implementation will be added in Phase 2
    // This will call the Java method through JNI
    return jsi::Value::undefined();
}

void RncustomergluTurboModule::sendData(jsi::Runtime& runtime, const jsi::Object& data) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::dataClear(jsi::Runtime& runtime) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::testIntegration(jsi::Runtime& runtime) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::loadCampaignById(jsi::Runtime& runtime, const jsi::String& id, const jsi::Object& config) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::loadCampaignWithUrl(jsi::Runtime& runtime, const jsi::String& url, const jsi::Object& config) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::openWallet(jsi::Runtime& runtime, const jsi::Object& config) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::initCGSDK(jsi::Runtime& runtime, const jsi::String& env) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::enableAnalytic(jsi::Runtime& runtime, bool enabled) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::allowAnonymousRegistration(jsi::Runtime& runtime, bool enabled) {
    // Implementation will be added in Phase 2
}

void RncustomergluTurboModule::disableGluSdk(jsi::Runtime& runtime, bool disabled) {
    // Implementation will be added in Phase 2
}

} // namespace react
} // namespace facebook
