package com.customerglu.reactnativecustomerglu

import android.widget.FrameLayout
import android.view.MotionEvent
import android.webkit.WebView
import com.customerglu.sdk.entrypoints.CGEmbedView
import com.facebook.react.uimanager.ThemedReactContext


class CGEmbededView(private val context: ThemedReactContext) : FrameLayout(context) {
  private var banner: CGEmbedView? = null

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

//  override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
//    return false // Allow WebView to handle touch events properly
//  }
//  override fun onTouchEvent(event: MotionEvent?): Boolean {
//    return banner?.dispatchTouchEvent(event) ?: super.onTouchEvent(event)
//  }
  fun setBannerId(id: String) {
    try {
      context.currentActivity?.let { activity ->
        removeAllViews()

        try {
          banner = CGEmbedView(activity, id)
          banner?.let { addView(it) }
//          banner?.let { embedView ->
//            (embedView.getChildAt(0) as? WebView)?.apply {
//              settings.domStorageEnabled = true
//              settings.javaScriptEnabled = true
//              settings.setSupportZoom(true)
//              settings.builtInZoomControls = true
//              settings.displayZoomControls = false
//
//              setOnTouchListener(null) // Ensure WebView handles its own touch events
//
//              isClickable = true
//              isFocusable = true
//              isVerticalScrollBarEnabled = true
//              isHorizontalScrollBarEnabled = true
//              overScrollMode = OVER_SCROLL_NEVER
//            }
//            addView(embedView)
//          }
        } catch (e: Exception) {
          android.util.Log.e("CGEmbedView", "Error creating Banner: ${e.message}")
          e.printStackTrace()

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
      android.util.Log.e("CGEmbedView", "Error in setBannerId: ${e.message}")
      e.printStackTrace()
    }
  }
}


