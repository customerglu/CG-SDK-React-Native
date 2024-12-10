package com.reactnativerncustomerglu.EmbedBannerwidget.EmbedBannerwidget;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativerncustomerglu.EmbedBannerwidget.EWrapperview.EWrapperView;

public class EBannerWidgetVGManager extends ViewGroupManager<EWrapperView> {
    String b_id = "";
    public static final String TAG = EBannerWidgetVGManager.class.getName();

    @NonNull
    @Override
    public String getName() {
        return "EmbedBannerWidget";
    }

    @ReactProp(name = "bannerId")
    public void setEBannerId(EWrapperView view, String BannerId) {
        EBannerWidget bannerWidget = (EBannerWidget) view.getContentView();
        bannerWidget.setEBannerId(BannerId);
        this.b_id=BannerId;
    }

    @NonNull
    @Override
    protected EWrapperView createViewInstance(@NonNull ThemedReactContext reactContext) {
        EWrapperView wrapperView = new EWrapperView(reactContext);
        Log.d(TAG, "BannerId--> " + b_id);
        EBannerWidget bannerWidget = new EBannerWidget(reactContext, b_id);
        wrapperView.setContentView(bannerWidget);
        return wrapperView;
    }


}
