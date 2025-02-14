package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.EmbedBannerWidgetManagerInterface;
import com.facebook.react.viewmanagers.EmbedBannerWidgetManagerDelegate;
import com.facebook.soloader.SoLoader;

import com.customerglu.sdk.CustomerGlu;
import com.customerglu.sdk.Modal.CGEmbedView;

@ReactModule(name = EmbedBannerWidgetManager.NAME)
public class EmbedBannerWidgetManager extends SimpleViewManager<CGEmbedView>
        implements EmbedBannerWidgetManagerInterface<CGEmbedView> {
    
    public static final String NAME = "EmbedBannerWidget";
    private final ViewManagerDelegate<CGEmbedView> mDelegate;

    static {
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            SoLoader.loadLibrary("customerglu");
        }
    }

    public EmbedBannerWidgetManager(ReactApplicationContext context) {
        mDelegate = new EmbedBannerWidgetManagerDelegate<>(this);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    @NonNull
    protected CGEmbedView createViewInstance(@NonNull ThemedReactContext context) {
        return new CGEmbedView(context);
    }

    @Override
    @ReactProp(name = "bannerId")
    public void setBannerId(CGEmbedView view, @Nullable String bannerId) {
        if (bannerId != null) {
            view.setEmbedId(bannerId);
        }
    }

    @Override
    protected ViewManagerDelegate<CGEmbedView> getDelegate() {
        return mDelegate;
    }
}
