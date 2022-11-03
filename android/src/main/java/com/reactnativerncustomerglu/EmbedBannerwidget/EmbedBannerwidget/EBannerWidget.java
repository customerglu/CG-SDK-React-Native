package com.reactnativerncustomerglu.EmbedBannerwidget.EmbedBannerwidget;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;
import android.widget.LinearLayout;

import com.customerglu.sdk.entrypoints.Banner;
import com.customerglu.sdk.entrypoints.CGEmbedView;
import com.facebook.react.uimanager.ThemedReactContext;


public class EBannerWidget extends LinearLayout {
  CGEmbedView cgEmbedbanner;
  ThemedReactContext context;
  public EBannerWidget(ThemedReactContext reactContext, String b_id) {
    super(reactContext);
    this.context = reactContext;
    Log.e("TAG", "banner id---> " + b_id);
    setUpView(reactContext, b_id);
  }

  @SuppressLint("ResourceType")
  private void setUpView(ThemedReactContext context, String id) {

  }

  public void setEBannerId(String id) {
    Context context1 = context.getCurrentActivity();
    cgEmbedbanner = new CGEmbedView(context1, "embedded1");
    addView(cgEmbedbanner);
  }


}
