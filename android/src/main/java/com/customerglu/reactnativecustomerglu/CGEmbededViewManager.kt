package com.customerglu.reactnativecustomerglu

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class CGEmbededViewManager: SimpleViewManager<CGEmbededView>()  {
  override fun getName(): String = "CGEmbedView"

  override fun createViewInstance(reactContext: ThemedReactContext): CGEmbededView {
    return CGEmbededView(reactContext)
  }

  @ReactProp(name = "embedId")
  fun setBannerId(view: CGEmbededView, bannerId: String?) {
    bannerId?.let { view.setBannerId(it) }
  }
}
