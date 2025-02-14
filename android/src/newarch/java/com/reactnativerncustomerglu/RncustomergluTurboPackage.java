package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

import java.util.HashMap;
import java.util.Map;

public class RncustomergluTurboPackage extends TurboReactPackage {
    @Override
    @NonNull
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
        if (name.equals(RncustomergluTurboModule.NAME)) {
            return new RncustomergluTurboModule(reactContext);
        }
        return null;
    }

    @Override
    @NonNull
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfo = new HashMap<>();
            boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;

            moduleInfo.put(
                RncustomergluTurboModule.NAME,
                new ReactModuleInfo(
                    RncustomergluTurboModule.NAME,
                    RncustomergluTurboModule.NAME,
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true,  // hasConstants
                    false, // isCxxModule
                    isTurboModule // isTurboModule
                )
            );
            return moduleInfo;
        };
    }
}
