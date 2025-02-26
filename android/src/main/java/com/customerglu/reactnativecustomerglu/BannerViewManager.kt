package com.customerglu.reactnativecustomerglu

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class BannerViewManager : SimpleViewManager<BannerView>() {
  override fun getName(): String = "BannerView"

  override fun createViewInstance(reactContext: ThemedReactContext): BannerView {
    return BannerView(reactContext)
  }

  @ReactProp(name = "bannerId")
  fun setBannerId(view: BannerView, bannerId: String?) {
    bannerId?.let { view.setBannerId(it) }
  }
}

