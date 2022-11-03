package com.reactnativerncustomerglu.Bannerwidget.wrapperview;

import android.content.Context;
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

import static com.reactnativerncustomerglu.Bannerwidget.Bannerwidget.BannerWidgetViewGroupManager.TAG;

public class WrapperView extends FrameLayout {
    private View contentView;

    public WrapperView(Context context) {
        super(context);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }

    private final Runnable measureAndLayout = () -> {
        measure(
                MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
        layout(getLeft(), getTop(), getRight(), getBottom());
    };

//    @Override
//    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        int maxWidth = 0;
//        int maxHeight = 0;
//
//        for (int i = 0; i < getChildCount(); i++) {
//            View child = getChildAt(i);
//            if (child.getVisibility() != GONE) {
//                child.measure(widthMeasureSpec, MeasureSpec.UNSPECIFIED);
//
//                maxWidth = Math.max(maxWidth, child.getMeasuredWidth());
//                maxHeight = Math.max(maxHeight, child.getMeasuredHeight());
//            }
//        }
//
//        int finalWidth = Math.max(maxWidth, getSuggestedMinimumWidth());
//        int finalHeight = Math.max(maxHeight, getSuggestedMinimumHeight());
//
//        setMeasuredDimension(finalWidth, finalHeight);
//        ((ThemedReactContext) getContext()).runOnNativeModulesQueueThread(() -> ((ThemedReactContext) getContext()).getNativeModule(UIManagerModule.class).updateNodeSize(getId(), finalWidth, finalHeight));
//    }

    public void setContentView(View view) {
        contentView = view;
        addView(contentView);

    }

    public View getContentView() {
        return contentView;
    }
}
