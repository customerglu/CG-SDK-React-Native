package com.reactnativerncustomerglu.EmbedBannerwidget.EWrapperview;

import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Timer;
import java.util.TimerTask;

import static com.reactnativerncustomerglu.Bannerwidget.Bannerwidget.BannerWidgetViewGroupManager.TAG;

public class EWrapperView extends FrameLayout {
    private View contentView;
    int width=0,height=0;
    public EWrapperView(Context context) {
        super(context);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
//        initializeSizeChecker();

    }

    private final Runnable measureAndLayout = () -> {
        measure(
                MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
        layout(getLeft(), getTop(), getRight(), getBottom());
    };

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int maxWidth = 0;
        int maxHeight = 0;

        for (int i = 0; i < getChildCount(); i++) {
            View child = getChildAt(i);
            if (child.getVisibility() != GONE) {
                child.measure(widthMeasureSpec, MeasureSpec.UNSPECIFIED);

                maxWidth = Math.max(maxWidth, child.getMeasuredWidth());
                maxHeight = Math.max(maxHeight, child.getMeasuredHeight());
            }
        }

        int finalWidth = Math.max(maxWidth, getSuggestedMinimumWidth());
        int finalHeight = Math.max(maxHeight, getSuggestedMinimumHeight());

        setMeasuredDimension(finalWidth, finalHeight);


        onSizeChange((int) PixelUtil.toDIPFromPixel(finalWidth), (int) PixelUtil.toDIPFromPixel(finalHeight));

        getViewTreeObserver().dispatchOnGlobalLayout();
//        new Timer().scheduleAtFixedRate(new TimerTask(){
//            @Override
//            public void run(){
//                width=width+100;
//                height=height+100;
//
//                ((ThemedReactContext) getContext()).runOnNativeModulesQueueThread(() -> (
//                        (ThemedReactContext) getContext()).getNativeModule(UIManagerModule.class).updateNodeSize(getId(), finalWidth,height));
//
//            }
//        },1000,1000);

       }
    public void initializeSizeChecker() {
        Log.e(TAG,"initializeSizeChecker");
        Choreographer.getInstance().postFrameCallback(new
                                                              Choreographer.FrameCallback() {
                                                                  @Override
                                                                  public void doFrame(long frameTimeNanos) {
                                                                      for (int i = 0; i < getChildCount(); i++) {

                                                                          View childView = getChildAt(i);
                                                                          int width = childView.getWidth();
                                                                          int height = childView.getHeight();

                                                                          if (width != getWidth() || height != getHeight()) {
                                                                              measure(View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY), View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

                                                                              int left = getLeft();
                                                                              int top = getTop();
                                                                              layout(left, top, left + width, top + height);

                                                                              onSizeChange((int) PixelUtil.toDIPFromPixel(width), (int) PixelUtil.toDIPFromPixel(height));

                                                                              getViewTreeObserver().dispatchOnGlobalLayout();
                                                                          }
                                                                      }
                                                                      Choreographer.getInstance().postFrameCallback(this);
                                                                  }
                                                              });
    }
    private void onSizeChange(int width, int height) {
        WritableMap event = Arguments.createMap();
        event.putInt("width", width);
        event.putInt("height", height);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(getId(), "onSizeChange", event);
    }

    public void setContentView(View view) {
        contentView = view;
        addView(contentView);

    }

    public View getContentView() {
        return contentView;
    }
}
