package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.BannerWidgetManagerInterface;
import com.facebook.react.viewmanagers.BannerWidgetManagerDelegate;
import com.facebook.soloader.SoLoader;

import com.customerglu.sdk.CustomerGlu;
import com.customerglu.sdk.Modal.BannerView;

@ReactModule(name = BannerWidgetManager.NAME)
public class BannerWidgetManager extends SimpleViewManager<BannerView>
        implements BannerWidgetManagerInterface<BannerView> {
    
    public static final String NAME = "BannerWidget";
    private final ViewManagerDelegate<BannerView> mDelegate;

    static {
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            SoLoader.loadLibrary("customerglu");
        }
    }

    public BannerWidgetManager(ReactApplicationContext context) {
        mDelegate = new BannerWidgetManagerDelegate<>(this);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    @NonNull
    protected BannerView createViewInstance(@NonNull ThemedReactContext context) {
        return new BannerView(context);
    }

    @Override
    @ReactProp(name = "bannerId")
    public void setBannerId(BannerView view, @Nullable String bannerId) {
        if (bannerId != null) {
            view.setBannerId(bannerId);
        }
    }

    @Override
    protected ViewManagerDelegate<BannerView> getDelegate() {
        return mDelegate;
    }
}
