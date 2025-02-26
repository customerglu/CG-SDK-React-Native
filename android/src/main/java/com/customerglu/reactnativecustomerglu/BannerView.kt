package com.customerglu.reactnativecustomerglu

import android.widget.FrameLayout
import com.customerglu.sdk.entrypoints.Banner
import com.facebook.react.uimanager.ThemedReactContext

class BannerView(private val context: ThemedReactContext) : FrameLayout(context) {
  private var banner: Banner? = null

  override fun requestLayout() {
    super.requestLayout()
    post(measureAndLayout)
  }

  private val measureAndLayout = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
    )
    layout(left, top, right, bottom)
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    var maxWidth = 0
    var maxHeight = 0

    for (i in 0 until childCount) {
      getChildAt(i)?.let { child ->
        if (child.visibility != GONE) {
          measureChild(child, widthMeasureSpec, MeasureSpec.UNSPECIFIED)
          maxWidth = maxWidth.coerceAtLeast(child.measuredWidth)
          maxHeight = maxHeight.coerceAtLeast(child.measuredHeight)
        }
      }
    }

    setMeasuredDimension(
      maxWidth.coerceAtLeast(suggestedMinimumWidth),
      maxHeight.coerceAtLeast(suggestedMinimumHeight)
    )
  }

  fun setBannerId(id: String) {
    try {
      context.currentActivity?.let { activity ->
        // Remove existing banner if any
        removeAllViews()

        try {
          banner = Banner(activity, id)
          banner?.let { addView(it) }
        } catch (e: Exception) {
          // Log the error for debugging
          android.util.Log.e("BannerView", "Error creating Banner: ${e.message}")
          e.printStackTrace()

          // Create an error view to display
          val errorView = android.widget.TextView(context).apply {
            text = "Banner initialization failed. Please ensure SDK is initialized."
            layoutParams = android.widget.FrameLayout.LayoutParams(
              android.widget.FrameLayout.LayoutParams.WRAP_CONTENT,
              android.widget.FrameLayout.LayoutParams.WRAP_CONTENT
            ).apply {
              gravity = android.view.Gravity.CENTER
            }
            setTextColor(android.graphics.Color.RED)
          }
          addView(errorView)
        }
      }
    } catch (e: Exception) {
      android.util.Log.e("CustomView", "Error in setBannerId: ${e.message}")
      e.printStackTrace()
    }
  }
}
