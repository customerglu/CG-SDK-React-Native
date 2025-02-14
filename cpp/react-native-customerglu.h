#pragma once

#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>
#include <ReactCommon/TurboModule.h>
#include <ReactCommon/TurboModuleUtils.h>
#include <react/renderer/components/view/ViewComponentDescriptor.h>
#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/core/EventEmitter.h>
#include <react/renderer/core/LayoutMetrics.h>
#include <react/renderer/core/Props.h>
#include <react/renderer/core/PropsParserContext.h>
#include <react/renderer/core/RawProps.h>
#include <react/renderer/core/ShadowNode.h>
#include <react/renderer/core/State.h>

namespace facebook
{
    namespace react
    {

        // Common types used across the module
        struct RNCGBannerWidgetEventEmitter
        {
            struct OnLoadEvent
            {
                std::string data;
                bool success;
            };

            void onLoad(OnLoadEvent event) const;
        };

        struct RNCGEmbedBannerWidgetEventEmitter
        {
            struct OnLoadEvent
            {
                std::string data;
                bool success;
            };

            void onLoad(OnLoadEvent event) const;
        };

        // Props for Banner Widget
        struct RNCGBannerWidgetProps : public ViewProps
        {
            RNCGBannerWidgetProps() = default;
            RNCGBannerWidgetProps(const PropsParserContext &context, const RNCGBannerWidgetProps &sourceProps, const RawProps &rawProps);

            std::string bannerId;
        };

        // Props for Embed Banner Widget
        struct RNCGEmbedBannerWidgetProps : public ViewProps
        {
            RNCGEmbedBannerWidgetProps() = default;
            RNCGEmbedBannerWidgetProps(const PropsParserContext &context, const RNCGEmbedBannerWidgetProps &sourceProps, const RawProps &rawProps);

            std::string bannerId;
        };

        // Common utility functions
        template <typename T>
        static inline void fromRawValue(const PropsParserContext &context, const RawValue &value, T &result)
        {
            if (value.hasValue())
            {
                result = (T)value;
            }
        }

    } // namespace react
} // namespace facebook
