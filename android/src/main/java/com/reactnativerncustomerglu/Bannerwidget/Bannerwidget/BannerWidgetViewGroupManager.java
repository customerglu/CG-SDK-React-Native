package com.reactnativerncustomerglu.Bannerwidget.Bannerwidget;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativerncustomerglu.Bannerwidget.wrapperview.WrapperView;

public class BannerWidgetViewGroupManager extends ViewGroupManager<WrapperView> {
    String b_id = "";
    public static final String TAG = BannerWidgetViewGroupManager.class.getName();

    @NonNull
    @Override
    public String getName() {
        return "BannerWidget";
    }

    @ReactProp(name = "bannerId")
    public void setBannerId(WrapperView view, String BannerId) {
        bannerWidget bannerWidget = (bannerWidget) view.getContentView();
        bannerWidget.setBannerId(BannerId);
        this.b_id=BannerId;
    }

    @NonNull
    @Override
    protected WrapperView createViewInstance(@NonNull ThemedReactContext reactContext) {
        WrapperView wrapperView = new WrapperView(reactContext);
        Log.d(TAG, "BannerId--> " + b_id);
        bannerWidget bannerWidget = new bannerWidget(reactContext, b_id);
        wrapperView.setContentView(bannerWidget);
        return wrapperView;
    }


}
