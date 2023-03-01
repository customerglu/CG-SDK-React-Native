package com.example.reactnativerncustomerglu;

import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;

import androidx.lifecycle.LifecycleObserver;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.LifecycleEventListener;
import com.reactnativerncustomerglu.CGUtils;

public class MainActivity extends ReactActivity implements LifecycleObserver
{
public static final String TAG=MainActivity.class.getSimpleName();
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {

    return "RncustomergluExample";
  }
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
  }

  @Override
  protected void onResume() {
    super.onResume();
  
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    CGUtils.handleConfigurationChanges(this);

  }
}
