package com.reactnativerncustomerglu.Bannerwidget.Bannerwidget;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;

import com.customerglu.sdk.Banners.Banner;

import com.facebook.react.uimanager.ThemedReactContext;


public class bannerWidget extends LinearLayout {
  Banner banner;
  ThemedReactContext context;
//    public bannerWidget(ThemedReactContext context) {
//        super(context);
//        setUpView(context,);
////        setUpAction();
//    }

  public bannerWidget(ThemedReactContext reactContext, String b_id) {
    super(reactContext);
    this.context = reactContext;
    Log.e("TAG", "banner id---> " + b_id);
    setUpView(reactContext, b_id);
  }

  @SuppressLint("ResourceType")
  private void setUpView(ThemedReactContext context, String id) {

  }

  public void setBannerId(String id) {
    Context context1 = context.getCurrentActivity();
    banner = new Banner(context1, id);

    addView(banner);

  }


}
