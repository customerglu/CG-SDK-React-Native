package com.reactnativerncustomerglu;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.customerglu.sdk.CustomerGlu;
import com.customerglu.sdk.Interface.DataListner;
import com.customerglu.sdk.Modal.RegisterModal;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


@ReactModule(name = RncustomergluModule.NAME)
public class RncustomergluModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
  public static final String TAG = RncustomergluModule.class.getName();

  public static final String NAME = "Rncustomerglu";
  public CustomerGlu customerGlu;
  private static ReactApplicationContext mContext;


  public RncustomergluModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
    reactContext.addLifecycleEventListener(this);
    customerGlu = CustomerGlu.getInstance();
  }


  private final BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      try {
        if (intent.getAction().equalsIgnoreCase("CUSTOMERGLU_ANALYTICS_EVENT")) {
          /* If you want to listen CUSTOMERGLU_ANALYTICS_EVENT */
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CUSTOMERGLU_ANALYTICS_EVENT", map);
            Toast.makeText(context, "CUSTOMERGLU_ANALYTICS_EVENT " + jsonObject.toString(), Toast.LENGTH_SHORT).show();
          }
        }

        /* If you want to listen CUSTOMERGLU_DEEPLINK_EVENT */

        if (intent.getAction().equalsIgnoreCase("CUSTOMERGLU_DEEPLINK_EVENT")) {
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
//          String message = jsonObject.getString("deepLink");
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CUSTOMERGLU_DEEPLINK_EVENT", map);
            Toast.makeText(context, "CUSTOMERGLU_DEEPLINK_EVENT " + jsonObject.toString(), Toast.LENGTH_LONG).show();
          }
        }
      } catch (Exception e) {
        System.out.println(e);
      }
    }

  };

  private void registerBroadcastReceiver() {
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_DEEPLINK_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_ANALYTICS_EVENT"));
  }

  //doubt
  private void callNotification() {
    Intent intent = new Intent();
    intent.setAction("CUSTOMERGLU_ANALYTICS_EVENT");
    mContext.sendBroadcast(intent);
  }

  private void callDeeplink() {
    Intent intent = new Intent();
    intent.setAction("CUSTOMERGLU_DEEPLINK_EVENT");
    mContext.sendBroadcast(intent);
  }


  private void sendEventToJs(String eventName, WritableMap eventId) {
    try {
      ReactContext reactContext = RncustomergluModule.mContext;
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, eventId);
    } catch (Exception e) {
      Log.d("ReactNativeJS", "Exception in sendEvent in EventReminderBroadcastReceiver is:" + e.toString());
    }

  }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void onHostResume() {
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_DEEPLINK_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_ANALYTICS_EVENT"));
  }

  @Override
  public void onHostPause() {
//    mContext.unregisterReceiver(mMessageReceiver);
  }

  @Override
  public void onHostDestroy() {
    mContext.unregisterReceiver(mMessageReceiver);
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android

  @ReactMethod
  public void registerDevice(Promise promise) {
    Map<String, Object> userData = new HashMap<>();
    String user_id = "testUser_1";
    userData.put("user_id", user_id);
    customerGlu.registerDevice(getReactApplicationContext(), userData, true, new DataListner() {
      //this method registers the user
      @Override
      public void onSuccess(RegisterModal registerModal) {
        Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();
        RegisterModal remodal = registerModal;
        Log.d("registerModal", String.valueOf(remodal.getData().getUser()));

      }

      @Override
      public void onFail(String message) {
        Toast.makeText(getReactApplicationContext(), "" + message, Toast.LENGTH_SHORT).show();
        Log.d("registerModal123", String.valueOf("fail"));
      }
    });

  }

  @ReactMethod
  public void registerDeviceAndroid(ReadableMap map, Promise promise) {
    JSONObject jsonObject = convertMapToJson(map);
    HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);
    Log.d(TAG, "userdata----> " + userData.toString());

    customerGlu.registerDevice(getReactApplicationContext(), userData, true, new DataListner() {
      //this method registers the user
      @Override
      public void onSuccess(RegisterModal registerModal) {
        Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();
        RegisterModal remodal = registerModal;
        Log.d("registerModal", String.valueOf(remodal.getData()));
        promise.resolve("Register Successfully");

      }

      @Override
      public void onFail(String message) {
        Toast.makeText(getReactApplicationContext(), "" + message, Toast.LENGTH_SHORT).show();
        Log.d("registerModal123", message);
        promise.reject(message);

      }
    });

  }

  @ReactMethod
  public void dataClear() {
    customerGlu.clearGluData(getReactApplicationContext());
  }

  @ReactMethod


  public void sendData(ReadableMap readableMap) {
    try {
      JSONObject obj = convertMapToJson(readableMap);
      HashMap<String, Object> eventProperties = new HashMap<>();
      eventProperties.put("eventName", obj.get("eventName"));
      eventProperties.put("eventProperties", obj.get("eventProperties"));
      String evnt = (String) obj.get("eventName");
      customerGlu.sendEvent(getReactApplicationContext(), evnt, eventProperties);

    } catch (JSONException e) {
      e.printStackTrace();
    }
  }


  @ReactMethod
  public void openWallet() {
    customerGlu.openWallet(getReactApplicationContext());
    Log.d("Open Wallet", String.valueOf("Open Wallet called"));
  }

  @ReactMethod
  public void loadCampaignIdBy(String id) {
    customerGlu.loadCampaignById(getReactApplicationContext(), id);
    Log.d("id", String.valueOf(id));
  }

  @ReactMethod
  public void enableAnalytic(Boolean bool) {
    customerGlu.enableAnalyticsEvent(bool);
    Log.d("enableAnalytic", String.valueOf(bool));
    registerBroadcastReceiver();
  }


  @ReactMethod
  public void disableGluSdk(Boolean bool) {
    customerGlu.disableGluSdk(bool);
    Log.d("disableGluSdk", String.valueOf(bool));
  }

  @ReactMethod
  public void configureLoaderColour(String color) {
    customerGlu.configureLoaderColour(getReactApplicationContext(), color);
    Log.d("configureLoaderColour", String.valueOf(color));
  }

  @ReactMethod
  public void enablePrecaching() {
    customerGlu.enablePrecaching(getReactApplicationContext());
    Log.d("enablePrecaching", String.valueOf("enablePrecaching"));
  }

  @ReactMethod
  public void gluSDKDebuggingMode(Boolean bol) {
    customerGlu.gluSDKDebuggingMode(getReactApplicationContext(), bol);
    Log.d("gluSDKDebuggingMode", String.valueOf(bol));
  }

  @ReactMethod
  public void enableEntryPoints(Boolean bol) {
    customerGlu.enableEntryPoints(getReactApplicationContext(), bol);
    Log.d("enableEntryPoints", String.valueOf(bol));
  }

  @ReactMethod
  public void closeWebView(Boolean bol) {
    customerGlu.closeWebviewOnDeeplinkEvent(bol);
    //sendbroadcast
    Log.d("closeWEbView", String.valueOf(bol));

  }

  @ReactMethod
  public void SetDefaultBannerImage(String url) {
    customerGlu.setDefaultBannerImage(getReactApplicationContext(), url);
    Log.d("closeWEbView", String.valueOf(url));
  }

  @ReactMethod
  public void UpdateProfile() {
    Map<String, Object> userData = new HashMap<>();
    String user_id = "testUser_1";
    userData.put("userId", user_id);
    customerGlu.updateProfile(getReactApplicationContext(), userData, new DataListner() {
      @Override
      public void onSuccess(RegisterModal registerModal) {

      }

      @Override
      public void onFail(String message) {

      }
    });
    Log.d("updateProfile", String.valueOf(userData));
  }


  @ReactMethod
  public void UpdateProfileAndroid(ReadableMap map, Promise promise) {
    JSONObject jsonObject = convertMapToJson(map);
    HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);

    customerGlu.updateProfile(getReactApplicationContext(), userData, new DataListner() {
      @Override
      public void onSuccess(RegisterModal registerModal) {
        Log.d("Success", "Profile Update Successfully..");
      }

      @Override
      public void onFail(String message) {

      }
    });
    Log.d("updateProfile", String.valueOf(userData));
  }

  @ReactMethod
  public void DisplayCustomerGluNotification() {
    callNotification();
    callDeeplink();
    Log.d("displayCgNotification", String.valueOf("cg Notification"));
  }

  @ReactMethod
  public void CGApplication() {
//    helloMyEvent("myAndroidEvent",String.valueOf("gdfhjggj"));
    Log.d("CGApplication", String.valueOf("CGApplication method not found in android"));
  }

  @ReactMethod
  public void DisplayBackGroundNotification() {
    Log.d("displaybgNotification", String.valueOf("DisplayBackGroundNotification"));
  }

  @ReactMethod
  public void GetRefferalId(String url) throws MalformedURLException {
    Uri myURL = Uri.parse(url);
    String referID = customerGlu.getReferralId(myURL);
    Log.d("getReferralId", String.valueOf(referID));
  }

  @ReactMethod
  public void LoadAllCampagins() {
    customerGlu.loadAllCampaigns(getReactApplicationContext());
    Log.d("loadAllCampaigns", String.valueOf("loadAllCampaigns"));
  }

  @ReactMethod
  public void LoadCampaginsByFilter(ReadableMap readableMap) {
    try {
      JSONObject obj = convertMapToJson(readableMap);
      HashMap<String, Object> campaignData = new HashMap<>();
      campaignData.put("campaignId", obj.get("campaignId"));
      campaignData.put("status", obj.get("status"));
      campaignData.put("type", obj.get("type"));
      customerGlu.loadCampaignsByFilter(getReactApplicationContext(), campaignData);
    } catch (JSONException e) {
      e.printStackTrace();
    }
//    Map<String,Object> userData = new HashMap<>();
//    String user_id="testUser_1";
//    userData.put("userId",user_id);
//    customerGlu.loadCampaignsByFilter(getReactApplicationContext(),userData);
//    Log.d("loadCampaignsByFilter", String.valueOf(userData));
  }

  @ReactMethod
  public void SetCurrentClassName(String classname) {
    Log.d("SetCurrentClassName", String.valueOf("function not in android"));
  }

  @ReactMethod
  public void OpenWalletWithUrl() {
    Log.d("OpenWalletWithUrl", String.valueOf("method not found in android"));
  }

  @ReactMethod
  public void configureWhiteListedDomains() {
    Log.d("connfigureWhiteListed", String.valueOf("method not found in android"));
  }


  @ReactMethod
  public void configureDomainCodeMsg() {
    Log.d("configureDomainCodeMsg", String.valueOf("method not found in android"));
  }

  private JSONObject convertMapToJson(ReadableMap readableMap) {
    JSONObject jsonObject = new JSONObject();
    if (readableMap == null) {
      return null;
    }
    ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
    if (!iterator.hasNextKey()) {
      return null;
    }
    while (iterator.hasNextKey()) {
      String key = iterator.nextKey();
      ReadableType readableType = readableMap.getType(key);
      try {
        switch (readableType) {
          case Null:
            jsonObject.put(key, null);
            break;
          case Boolean:
            jsonObject.put(key, readableMap.getBoolean(key));
            break;
          case Number:
            // Can be int or double.
            jsonObject.put(key, readableMap.getInt(key));
            break;
          case String:
            jsonObject.put(key, readableMap.getString(key));

            break;
          case Array:
            jsonObject.put(key, convertArrayToJson(readableMap.getArray(key)));
          default:
            // Do nothing and fail silently
        }
      } catch (JSONException ex) {
      }
    }
    return jsonObject;
  }

  private static JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
    JSONArray array = new JSONArray();
    for (int i = 0; i < readableArray.size(); i++) {
      switch (readableArray.getType(i)) {
        case Null:
          break;
        case Boolean:
          array.put(readableArray.getBoolean(i));
          break;
        case Number:
          array.put(readableArray.getDouble(i));
          break;
        case String:
          array.put(readableArray.getString(i));
          break;
//        case Map:
//          array.put(readableMapToJson(readableArray.getMap(i)));
//          break;
        case Array:
          array.put(convertArrayToJson(readableArray.getArray(i)));
          break;
      }
    }
    return array;
  }


  public static WritableMap jsonToWritableMap(JSONObject jsonObject) {
    WritableMap writableMap = new WritableNativeMap();
    if (jsonObject == null) {
      return null;
    }
    Iterator<String> iterator = jsonObject.keys();
    if (!iterator.hasNext()) {
      return null;
    }
    while (iterator.hasNext()) {
      String key = iterator.next();
      try {
        Object value = jsonObject.get(key);
        if (value == null) {
          writableMap.putNull(key);
        } else if (value instanceof Boolean) {
          writableMap.putBoolean(key, (Boolean) value);
        } else if (value instanceof Integer) {
          writableMap.putInt(key, (Integer) value);
        } else if (value instanceof Double) {
          writableMap.putDouble(key, (Double) value);
        } else if (value instanceof String) {
          writableMap.putString(key, (String) value);
        } else if (value instanceof JSONObject) {
          writableMap.putMap(key, jsonToWritableMap((JSONObject) value));
        } else if (value instanceof JSONArray) {
          writableMap.putArray(key, jsonArrayToWritableArray((JSONArray) value));
        }
      } catch (JSONException ex) {
        // Do nothing and fail silently
      }
    }

    return writableMap;
  }

  public static WritableArray jsonArrayToWritableArray(JSONArray jsonArray) {
    WritableArray writableArray = new WritableNativeArray();

    if (jsonArray == null) {
      return null;
    }

    if (jsonArray.length() <= 0) {
      return null;
    }

    for (int i = 0; i < jsonArray.length(); i++) {
      try {
        Object value = jsonArray.get(i);
        if (value == null) {
          writableArray.pushNull();
        } else if (value instanceof Boolean) {
          writableArray.pushBoolean((Boolean) value);
        } else if (value instanceof Integer) {
          writableArray.pushInt((Integer) value);
        } else if (value instanceof Double) {
          writableArray.pushDouble((Double) value);
        } else if (value instanceof String) {
          writableArray.pushString((String) value);
        } else if (value instanceof JSONObject) {
          writableArray.pushMap(jsonToWritableMap((JSONObject) value));
        } else if (value instanceof JSONArray) {
          writableArray.pushArray(jsonArrayToWritableArray((JSONArray) value));
        }
      } catch (JSONException e) {
        // Do nothing and fail silently
      }
    }

    return writableArray;
  }
//  public static native int nativeMultiply(int a, int b);
}
