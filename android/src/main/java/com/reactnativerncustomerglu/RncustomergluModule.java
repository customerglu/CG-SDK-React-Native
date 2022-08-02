package com.reactnativerncustomerglu;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

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

import com.customerglu.sdk.Banners.Banner;
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
import java.util.ArrayList;
import java.util.EventListener;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


@ReactModule(name = RncustomergluModule.NAME)
public class RncustomergluModule extends ReactContextBaseJavaModule implements LifecycleEventListener
{
  public static final String TAG = RncustomergluModule.class.getName();
  public static String Myclassname = "";
  public static final String NAME = "Rncustomerglu";
  private static ReactApplicationContext mContext;


  public RncustomergluModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
    reactContext.addLifecycleEventListener(this);
    CustomerGlu.initializeSdk(getReactApplicationContext());


  }


  private final BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      Log.d(TAG,"on Received....");
      try {
        if (intent.getAction().equalsIgnoreCase("CUSTOMERGLU_ANALYTICS_EVENT")) {
          /* If you want to listen CUSTOMERGLU_ANALYTICS_EVENT */
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CUSTOMERGLU_ANALYTICS_EVENT", map);
          }
        }

        /* If you want to listen CUSTOMERGLU_DEEPLINK_EVENT */

        if (intent.getAction().equalsIgnoreCase("CUSTOMERGLU_DEEPLINK_EVENT")) {
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CUSTOMERGLU_DEEPLINK_EVENT", map);
          }
        }




        if (intent.getAction().equalsIgnoreCase("CUSTOMERGLU_BANNER_LOADED")) {
          /* If you want to listen CUSTOMERGLU_BANNER_LOADED */
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CUSTOMERGLU_BANNER_LOADED", map);
          }
        }



      } catch (Exception e) {
        System.out.println(e);
      }
    }

  };

  private void registerBroadcastReceiver() {
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_ANALYTICS_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_DEEPLINK_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_BANNER_LOADED"));

  }


  private void sendEventToJs(String eventName, WritableMap map) {
    try {
      getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, map);
    } catch (Exception e) {
    }

  }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void onHostResume() {
    Log.e(TAG,"On Host Resume....");
    CustomerGlu.getInstance().showEntryPoint(getReactApplicationContext().getCurrentActivity());
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_ANALYTICS_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_DEEPLINK_EVENT"));
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_BANNER_LOADED"));

  }

  @Override
  public void onHostPause() {
//    mContext.unregisterReceiver(mMessageReceiver);
  }

  @Override
  public void onHostDestroy() {
//    mContext.unregisterReceiver(mMessageReceiver);

  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android



  @ReactMethod
  public void registerDevice(ReadableMap map, Promise promise) {
    JSONObject jsonObject = convertMapToJson(map);
    HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);
    Log.d(TAG, "userdata----> " + userData.toString());

    CustomerGlu.getInstance().registerDevice(getReactApplicationContext(), userData, true, new DataListner() {
      //this method registers the user
      @Override
      public void onSuccess(RegisterModal registerModal) {
        Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();
        RegisterModal remodal = registerModal;
        promise.resolve(true);


      }

      @Override
      public void onFail(String message) {
        Toast.makeText(getReactApplicationContext(), "" + message, Toast.LENGTH_SHORT).show();
        promise.resolve(false);

      }
    });

  }

  @ReactMethod
  public void dataClear() {
    CustomerGlu.getInstance().clearGluData(getCurrentActivity());
  }

  @ReactMethod



  public void sendData(ReadableMap readableMap) {
    try {
      JSONObject obj= convertMapToJson(readableMap);
      HashMap<String,Object> eventProperties = new HashMap<>();
      eventProperties.put("eventName",obj.get("eventName"));
      eventProperties.put("eventProperties",obj.get("eventProperties"));
      String evnt = (String) obj.get("eventName");
      CustomerGlu.getInstance().sendEvent(getReactApplicationContext(),evnt,eventProperties);

    } catch (JSONException e) {
      e.printStackTrace();
    }

  }

  @ReactMethod
  public void openWallet(Boolean autoclosewebview) {
    CustomerGlu.getInstance().openWallet(getReactApplicationContext(),autoclosewebview);
  }

  @ReactMethod
  public void loadCampaignIdBy(String id, Boolean autoclosewebview) {
    CustomerGlu.getInstance().loadCampaignById(getReactApplicationContext(), id, autoclosewebview);
  }

  @ReactMethod
  public void enableAnalytic(Boolean bool) {
    CustomerGlu.getInstance().enableAnalyticsEvent(bool);

  }


  @ReactMethod
  public void disableGluSdk(Boolean bool) {
    CustomerGlu.getInstance().disableGluSdk(bool);

  }

  @ReactMethod
  public void configureLoaderColour(String color) {
    CustomerGlu.getInstance().configureLoaderColour(getReactApplicationContext(), color);
  }

  @ReactMethod
  public void enablePrecaching() {
    CustomerGlu.getInstance().enablePrecaching(getReactApplicationContext());
  }

  @ReactMethod
  public void gluSDKDebuggingMode(Boolean bol) {
    CustomerGlu.getInstance().gluSDKDebuggingMode(getCurrentActivity(), bol);
  }

  @ReactMethod
  public void enableEntryPoints(Boolean bol) {
    CustomerGlu.getInstance().enableEntryPoints(getCurrentActivity(), bol);
  }

  @ReactMethod
  public void closeWebView(Boolean bol) {
    CustomerGlu.getInstance().closeWebviewOnDeeplinkEvent(bol);
  }

  @ReactMethod
  public void SetDefaultBannerImage(String url) {
    CustomerGlu.getInstance().setDefaultBannerImage(getCurrentActivity(), url);
  }



  @ReactMethod
  public void UpdateProfile(ReadableMap map, Promise promise) {
    JSONObject jsonObject = convertMapToJson(map);
    HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);
    CustomerGlu.getInstance().updateProfile(getReactApplicationContext(), userData, new DataListner() {
      @Override
      public void onSuccess(RegisterModal registerModal) {
        Toast.makeText(getReactApplicationContext(), "Profile Updated", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onFail(String message) {

      }
    });
  }

  @ReactMethod
  public void DisplayBackGroundNotification(ReadableMap data,Boolean autoclosewebview) {
    JSONObject jsonObject=convertMapToJson(data);
    CustomerGlu.getInstance().displayCustomerGluNotification(getReactApplicationContext(),jsonObject,R.drawable.notification,0.5, autoclosewebview);

  }

  @ReactMethod
  public void CGApplication() {
  }

  @ReactMethod
  public void DisplayCustomerGluNotification() {
    registerBroadcastReceiver();
  }

  @ReactMethod
  public void GetRefferalId(String url, Promise promise) throws MalformedURLException {
    Uri myURL = Uri.parse(url);
    String referID = CustomerGlu.getInstance().getReferralId(myURL);
    promise.resolve(referID);
  }

  @ReactMethod
  public void LoadAllCampagins() {
    CustomerGlu.getInstance().loadAllCampaigns(getReactApplicationContext());
  }

  @ReactMethod
  public void LoadCampaginsByFilter(ReadableMap readableMap) {
    try {
      JSONObject obj = convertMapToJson(readableMap);
      HashMap<String, Object> campaignData = new HashMap<>();
      campaignData.put("campaignId", obj.get("campaignId"));
      campaignData.put("status", obj.get("status"));
      campaignData.put("type", obj.get("type"));
      CustomerGlu.getInstance().loadCampaignsByFilter(getReactApplicationContext(), campaignData);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void SetCurrentClassName(String classname) {
    this.Myclassname = classname;
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        CustomerGlu.getInstance().setScreenName(getReactApplicationContext(),classname);

      }
    });
  }

  @ReactMethod
  public void OpenWalletWithUrl(String url) {
  }

  @ReactMethod
  public void configureWhiteListedDomains(ReadableArray readableArray) {
    try {
      JSONArray obj = convertArrayToJson(readableArray);
      ArrayList<String> listdata = new ArrayList<String>();
      for (int i=0;i<obj.length();i++){
        listdata.add((String) obj.get(i));

      }
      CustomerGlu.getInstance().configureWhiteListedDomains(listdata);
    } catch (JSONException e) {
      e.printStackTrace();
    }

  }


  @ReactMethod
  public void configureDomainCodeMsg(ReadableMap readableMap) {
    try {
      JSONObject obj = convertMapToJson(readableMap);
      int code = (int) obj.get("code");
      String msg = (String) obj.get("msg");
      CustomerGlu.getInstance().configureDomainCodeMsg(code,msg);
    } catch (JSONException e) {
      e.printStackTrace();
    }

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