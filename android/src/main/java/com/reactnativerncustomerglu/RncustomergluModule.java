package com.reactnativerncustomerglu;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.customerglu.sdk.CustomerGlu;
import com.customerglu.sdk.Interface.DataListner;
import com.customerglu.sdk.Modal.RegisterModal;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.HashMap;
import java.util.Map;


@ReactModule(name = RncustomergluModule.NAME)
public class RncustomergluModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Rncustomerglu";
  public CustomerGlu customerGlu;

    public RncustomergluModule(ReactApplicationContext reactContext) {
        super(reactContext);
      customerGlu = CustomerGlu.getInstance();
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }
    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void registerDevice(Promise promise) {
      Map<String,Object> userData = new HashMap<>();
      String user_id="testUser_1";
      userData.put("userId",user_id);
      customerGlu.registerDevice(getReactApplicationContext(),userData,true,new DataListner() {
        //this method registers the user
        @Override
        public void onSuccess(RegisterModal registerModal) {
          Log.d("registerModal", "hello");
          Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();
          RegisterModal remodal=registerModal;

          Log.d("registerModal", String.valueOf(remodal.getData().getUser()));

        }
        @Override
        public void onFail(String message) {
          Toast.makeText(getReactApplicationContext(), ""+message, Toast.LENGTH_SHORT).show();
          Log.d("registerModal123",String.valueOf("fail"));
        }
      });

    }
    
//  public static native int nativeMultiply(int a, int b);
}
