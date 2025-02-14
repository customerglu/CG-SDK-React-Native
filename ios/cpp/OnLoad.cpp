#include "RncustomergluTurboModule.h"

namespace facebook
{
    namespace react
    {

        std::shared_ptr<TurboModule> RncustomergluModuleProvider(const std::string &name, std::shared_ptr<CallInvoker> jsInvoker)
        {
            if (name == "Rncustomerglu")
            {
                return std::make_shared<RncustomergluTurboModule>(jsInvoker);
            }
            return nullptr;
        }

    } // namespace react
} // namespace facebook

extern "C"
{
    void __attribute__((constructor)) initializeRncustomergluTurboModule()
    {
        facebook::react::RncustomergluTurboModule::registerNatives();
    }
}
