#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

namespace facebook
{
    namespace react
    {

        class RncustomergluTurboModule : public TurboModule
        {
        public:
            RncustomergluTurboModule(std::shared_ptr<CallInvoker> jsInvoker);

            // Core methods
            jsi::Value registerDevice(jsi::Runtime &runtime, const jsi::Object &data);
            void sendData(jsi::Runtime &runtime, const jsi::Object &data);
            void dataClear(jsi::Runtime &runtime);
            void testIntegration(jsi::Runtime &runtime);

            // Campaign methods
            void loadCampaignById(jsi::Runtime &runtime, const jsi::String &id, const jsi::Object &config);
            void loadCampaignWithUrl(jsi::Runtime &runtime, const jsi::String &url, const jsi::Object &config);
            void openWallet(jsi::Runtime &runtime, const jsi::Object &config);

            // Configuration methods
            void initCGSDK(jsi::Runtime &runtime, const jsi::String &env);
            void enableAnalytic(jsi::Runtime &runtime, bool enabled);
            void allowAnonymousRegistration(jsi::Runtime &runtime, bool enabled);
            void disableGluSdk(jsi::Runtime &runtime, bool disabled);

            // UI Configuration
            void configureLoaderColour(jsi::Runtime &runtime, const jsi::String &color);
            void configureDarkBackgroundColor(jsi::Runtime &runtime, const jsi::String &color);
            void configureLightBackgroundColor(jsi::Runtime &runtime, const jsi::String &color);
            void configureStatusBarColour(jsi::Runtime &runtime, const jsi::String &color);
            void configureLoadingScreenColor(jsi::Runtime &runtime, const jsi::String &color);

            // Feature flags
            void enablePrecaching(jsi::Runtime &runtime);
            void gluSDKDebuggingMode(jsi::Runtime &runtime, bool enabled);
            void enableEntryPoints(jsi::Runtime &runtime, bool enabled);

            // Event handling
            void handleDeepLinkUri(jsi::Runtime &runtime, const jsi::String &url);
            void closeWebView(jsi::Runtime &runtime, bool enabled);

            // Campaign validation
            jsi::Value isCampaignValid(jsi::Runtime &runtime, const jsi::String &campaignId, const jsi::String &dataFlag);
            jsi::Value getCampaignStatus(jsi::Runtime &runtime, const jsi::String &campaignId, const jsi::String &dataFlag);

            // Additional methods
            void setOpenWalletAsFallback(jsi::Runtime &runtime, bool value);
            void addMarginsForPIP(jsi::Runtime &runtime, double horizontal, double vertical, const jsi::String &type);
            void addDelayForPIP(jsi::Runtime &runtime, double delay);

            static std::function<std::shared_ptr<TurboModule>(std::shared_ptr<CallInvoker>)>
            bind(std::shared_ptr<CallInvoker> jsInvoker);
        };

    } // namespace react
} // namespace facebook
