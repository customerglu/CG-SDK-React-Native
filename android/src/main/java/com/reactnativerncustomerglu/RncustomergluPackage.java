package com.reactnativerncustomerglu;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactnativerncustomerglu.Bannerwidget.Bannerwidget.BannerWidgetViewGroupManager;
import com.reactnativerncustomerglu.EmbedBannerwidget.EmbedBannerwidget.EBannerWidgetVGManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RncustomergluPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RncustomergluModule(reactContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
      return Arrays.asList(
        new EBannerWidgetVGManager(),
        new BannerWidgetViewGroupManager()
      );
    }
}
