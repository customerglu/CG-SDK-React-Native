package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;
import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

@DoNotStrip
public abstract class NativeRncustomergluSpec extends ReactContextBaseJavaModule implements TurboModule {
    public NativeRncustomergluSpec(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public abstract String getName();

    // Core methods
    public abstract void registerDevice(ReadableMap data, Promise promise);
    public abstract void sendData(ReadableMap data);
    public abstract void dataClear();
    public abstract void testIntegration();

    // Campaign methods
    public abstract void loadCampaignById(String id, ReadableMap config);
    public abstract void loadCampaignWithUrl(String url, ReadableMap config);
    public abstract void openWallet(ReadableMap config);

    // Configuration methods
    public abstract void initCGSDK(String env);
    public abstract void enableAnalytic(boolean enabled);
    public abstract void allowAnonymousRegistration(boolean enabled);
    public abstract void disableGluSdk(boolean disabled);

    // UI Configuration
    public abstract void configureLoaderColour(String color);
    public abstract void configureDarkBackgroundColor(String color);
    public abstract void configureLightBackgroundColor(String color);
    public abstract void configureStatusBarColour(String color);
    public abstract void configureLoadingScreenColor(String color);

    // Feature flags
    public abstract void enablePrecaching();
    public abstract void gluSDKDebuggingMode(boolean enabled);
    public abstract void enableEntryPoints(boolean enabled);

    // Event handling
    public abstract void handleDeepLinkUri(String url);
    public abstract void closeWebView(boolean enabled);

    // Campaign validation
    public abstract void isCampaignValid(String campaignId, String dataFlag, Promise promise);
    public abstract void getCampaignStatus(String campaignId, String dataFlag, Promise promise);

    // Additional methods
    public abstract void setOpenWalletAsFallback(boolean value);
    public abstract void addMarginsForPIP(int horizontal, int vertical, String type);
    public abstract void addDelayForPIP(int delay);
}
