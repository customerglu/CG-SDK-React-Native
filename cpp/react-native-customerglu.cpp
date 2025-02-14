#include "react-native-customerglu.h"

namespace facebook
{
    namespace react
    {

        // BannerWidget Props Implementation
        RNCGBannerWidgetProps::RNCGBannerWidgetProps(
            const PropsParserContext &context,
            const RNCGBannerWidgetProps &sourceProps,
            const RawProps &rawProps) : ViewProps(context, sourceProps, rawProps)
        {

            auto bannerId = rawProps.at("bannerId");
            if (bannerId.hasValue())
            {
                fromRawValue(context, bannerId, this->bannerId);
            }
        }

        // EmbedBannerWidget Props Implementation
        RNCGEmbedBannerWidgetProps::RNCGEmbedBannerWidgetProps(
            const PropsParserContext &context,
            const RNCGEmbedBannerWidgetProps &sourceProps,
            const RawProps &rawProps) : ViewProps(context, sourceProps, rawProps)
        {

            auto bannerId = rawProps.at("bannerId");
            if (bannerId.hasValue())
            {
                fromRawValue(context, bannerId, this->bannerId);
            }
        }

        // BannerWidget Event Emitter Implementation
        void RNCGBannerWidgetEventEmitter::onLoad(OnLoadEvent event) const
        {
            dispatchEvent("onLoad", [&](jsi::Runtime &runtime)
                          {
        auto payload = jsi::Object(runtime);
        payload.setProperty(runtime, "data", jsi::String::createFromUtf8(runtime, event.data));
        payload.setProperty(runtime, "success", jsi::Value(event.success));
        return payload; });
        }

        // EmbedBannerWidget Event Emitter Implementation
        void RNCGEmbedBannerWidgetEventEmitter::onLoad(OnLoadEvent event) const
        {
            dispatchEvent("onLoad", [&](jsi::Runtime &runtime)
                          {
        auto payload = jsi::Object(runtime);
        payload.setProperty(runtime, "data", jsi::String::createFromUtf8(runtime, event.data));
        payload.setProperty(runtime, "success", jsi::Value(event.success));
        return payload; });
        }

    } // namespace react
} // namespace facebook
