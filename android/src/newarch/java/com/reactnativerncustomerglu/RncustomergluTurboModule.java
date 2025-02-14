package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.CallInvokerHolder;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.bridge.ReactApplicationContext;

import com.customerglu.sdk.CustomerGlu;
import com.customerglu.sdk.Interface.DataListner;
import com.customerglu.sdk.Modal.RegisterModal;
import com.customerglu.sdk.Modal.NudgeConfiguration;
import com.customerglu.sdk.Interface.CGDeepLinkListener;
import com.customerglu.sdk.Interface.CampaignStatusListener;
import com.customerglu.sdk.Interface.CampaignValidListener;
import com.customerglu.sdk.Modal.DeepLinkWormholeModel;
import com.customerglu.sdk.Utils.CGConstants;
import com.google.gson.Gson;

import java.util.HashMap;

@ReactModule(name = RncustomergluTurboModule.NAME)
public class RncustomergluTurboModule extends NativeRncustomergluSpec {
    public static final String NAME = "Rncustomerglu";

    public RncustomergluTurboModule(ReactApplicationContext reactContext) {
        super(reactContext);
        setPlatformAndSdkVersion();
    }

    private void setPlatformAndSdkVersion() {
        if (CustomerGlu.getInstance() != null) {
            CustomerGlu.cg_sdk_version = "2.1.1";
            CustomerGlu.cg_app_platform = "REACT_NATIVE";
        }
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void registerDevice(ReadableMap data, Promise promise) {
        if (data != null) {
            HashMap<String, Object> userData = new Gson().fromJson(data.toString(), HashMap.class);
            CustomerGlu.getInstance().registerDevice(getReactApplicationContext(), userData, new DataListner() {
                @Override
                public void onSuccess(Boolean success) {
                    promise.resolve(success);
                }

                @Override
                public void onFail(String message) {
                    promise.resolve(false);
                }
            });
        }
    }

    @ReactMethod
    public void sendData(ReadableMap data) {
        if (data != null) {
            String eventName = data.getString("eventName");
            ReadableMap eventProperties = data.hasKey("eventProperties") ? data.getMap("eventProperties") : null;
            
            HashMap<String, Object> properties = eventProperties != null 
                ? new Gson().fromJson(eventProperties.toString(), HashMap.class)
                : new HashMap<>();
                
            CustomerGlu.getInstance().sendEvent(getReactApplicationContext(), eventName, properties);
        }
    }

    @ReactMethod
    public void dataClear() {
        CustomerGlu.getInstance().clearGluData(getCurrentActivity());
    }

    @ReactMethod
    public void testIntegration() {
        CustomerGlu.getInstance().testIntegration();
    }

    @ReactMethod
    public void loadCampaignById(String id, ReadableMap config) {
        NudgeConfiguration nudgeConfig = createNudgeConfig(config);
        CustomerGlu.getInstance().loadCampaignById(getReactApplicationContext(), id, nudgeConfig);
    }

    @ReactMethod
    public void loadCampaignWithUrl(String url, ReadableMap config) {
        NudgeConfiguration nudgeConfig = createNudgeConfig(config);
        CustomerGlu.getInstance().displayCGNudge(getReactApplicationContext(), url, "", nudgeConfig);
    }

    @ReactMethod
    public void openWallet(ReadableMap config) {
        NudgeConfiguration nudgeConfig = createNudgeConfig(config);
        CustomerGlu.getInstance().openWallet(getReactApplicationContext(), nudgeConfig);
    }

    @ReactMethod
    public void initCGSDK(String env) {
        CustomerGlu.getInstance().initializeSdk(getReactApplicationContext(), env);
    }

    private NudgeConfiguration createNudgeConfig(ReadableMap config) {
        NudgeConfiguration nudgeConfig = new NudgeConfiguration();
        if (config != null && config.hasKey("nudgeConfiguration")) {
            ReadableMap nudgeData = config.getMap("nudgeConfiguration");
            if (nudgeData != null) {
                if (nudgeData.hasKey("layout")) {
                    nudgeConfig.setLayout(nudgeData.getString("layout"));
                }
                if (nudgeData.hasKey("opacity")) {
                    nudgeConfig.setOpacity(nudgeData.getDouble("opacity"));
                }
                if (nudgeData.hasKey("closeOnDeepLink")) {
                    nudgeConfig.setCloseOnDeepLink(nudgeData.getBoolean("closeOnDeepLink"));
                }
                if (nudgeData.hasKey("absoluteHeight")) {
                    nudgeConfig.setAbsoluteHeight(nudgeData.getDouble("absoluteHeight"));
                }
                if (nudgeData.hasKey("relativeHeight")) {
                    nudgeConfig.setRelativeHeight(nudgeData.getDouble("relativeHeight"));
                }
            }
        }
        return nudgeConfig;
    }
}
