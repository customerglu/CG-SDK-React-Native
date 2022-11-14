package com.reactnativerncustomerglu;

import static com.customerglu.sdk.Utils.Comman.printDebugLogs;
import static com.facebook.react.bridge.UiThreadUtil.isOnUiThread;
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.customerglu.sdk.Modal.NudgeConfiguration;
import com.customerglu.sdk.Utils.Comman;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
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

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
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
    setPlatformAndSdkVersion();
  }
  @ReactMethod
  public void addListener(String eventName) {
  }
  @ReactMethod
  public void removeListeners(Integer count) {
  }

  private void setPlatformAndSdkVersion() {
    if(CustomerGlu.getInstance()!=null){

      CustomerGlu.cg_sdk_version="1.1.0";
      CustomerGlu.cg_app_platform="REACT_NATIVE";
    }
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

      if (intent.getAction().equalsIgnoreCase("CG_INVALID_CAMPAIGN_ID")) {
          /* If you want to listen CG_INVALID_CAMPAIGN_ID */
          if (intent.getStringExtra("data") != null) {
            String data = intent.getStringExtra("data");
            JSONObject jsonObject = new JSONObject(data);
            WritableMap map = jsonToWritableMap(jsonObject);
            sendEventToJs("CG_INVALID_CAMPAIGN_ID", map);
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
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CG_INVALID_CAMPAIGN_ID"));

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
    mContext.registerReceiver(mMessageReceiver, new IntentFilter("CG_INVALID_CAMPAIGN_ID"));

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
    Log.d(TAG, "userdata----> " + userData.toString()+" "+new Date().getTime());

    CustomerGlu.getInstance().registerDevice(getReactApplicationContext(), userData, new DataListner() {
      //this method registers the user
      @Override
      public void onSuccess(RegisterModal registerModal) {
//        Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();

        RegisterModal remodal = registerModal;
        Log.d(TAG,"Registered!..."+" "+new Date().getTime());
        promise.resolve(true);


      }

      @Override
      public void onFail(String message) {
//        Toast.makeText(getReactApplicationContext(), "" + message, Toast.LENGTH_SHORT).show();
        Log.d(TAG,"Registeration Failed!..."+message.toString());

        promise.resolve(false);

      }
    });

  }

  @ReactMethod
  public void dataClear()
  {
    CustomerGlu.getInstance().clearGluData(getCurrentActivity());
  }

  @ReactMethod
  public void sendData(ReadableMap readableMap) {
    try {
      String evnt="";
      JSONObject obj= convertMapToJson(readableMap);
      if(obj.has("eventName")){
        evnt = (String) obj.get("eventName");}
      Log.e(TAG,"eventProperties"+evnt);
      CustomerGlu.getInstance().sendEvent(getReactApplicationContext(),evnt, jsonToMap(obj.getJSONObject("eventProperties")));

    } catch (JSONException e) {
      e.printStackTrace();
    }

  }
  public static Map<String, Object> jsonToMap(JSONObject json) throws JSONException {
    Map<String, Object> retMap = new HashMap<String, Object>();    if(json != JSONObject.NULL) {
      retMap = toMap(json);
    }
    return retMap;
  }
  public static Map<String, Object> toMap(JSONObject object) throws JSONException {
    Map<String, Object> map = new HashMap<String, Object>();
    Iterator<String> keysItr = object.keys();
    while(keysItr.hasNext()) {
      String key = keysItr.next();
      Object value = object.get(key);

      if(value instanceof JSONArray) {
        value = toList((JSONArray) value);
      }

      else if(value instanceof JSONObject) {
        value = toMap((JSONObject) value);
      }
      map.put(key, value);
    }
    return map;
  }
  public static List<Object> toList(JSONArray array) throws JSONException {
    List<Object> list = new ArrayList<Object>();
    for(int i = 0; i < array.length(); i++) {
      Object value = array.get(i);
      if(value instanceof JSONArray) {
        value = toList((JSONArray) value);
      }
      else if(value instanceof JSONObject) {
        value = toMap((JSONObject) value);
      }
      list.add(value);
    }
    return list;
  }

  @ReactMethod
  public void openWallet(ReadableMap readableMap) {
    try {
      if(readableMap.hasKey("nudgeConfiguration")) {
      Log.e(TAG, "openwallet-----" + readableMap.toString());

        JSONObject nudgeConfigurationdata;
        NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
        JSONObject obj = convertMapToJson(readableMap);
          nudgeConfigurationdata = obj.getJSONObject("nudgeConfiguration");
          if (nudgeConfigurationdata.has("layout")) {
            nudgeConfiguration.setLayout(nudgeConfigurationdata.getString("layout"));
          }
          if (nudgeConfigurationdata.has("opacity")) {
            nudgeConfiguration.setOpacity(Double.parseDouble(nudgeConfigurationdata.getString("opacity")));
          }
          if (nudgeConfigurationdata.has("closeOnDeepLink")) {
            nudgeConfiguration.setCloseOnDeepLink(nudgeConfigurationdata.getBoolean("closeOnDeepLink"));
          }
          if (nudgeConfigurationdata.has("absoluteHeight")) {
            nudgeConfiguration.setAbsoluteHeight(Double.parseDouble(nudgeConfigurationdata.getString("absoluteHeight")));
          }
          if (nudgeConfigurationdata.has("relativeHeight")) {
            nudgeConfiguration.setRelativeHeight(Double.parseDouble(nudgeConfigurationdata.getString("relativeHeight")));
          }
          CustomerGlu.getInstance().openWallet(getReactApplicationContext(), nudgeConfiguration);



    }else{
      CustomerGlu.getInstance().openWallet(getReactApplicationContext());
    }
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }


  @ReactMethod
  public void loadCampaignById(String id, ReadableMap readableMap) {
    Log.e(TAG,"loadCampaignById-----"+readableMap.toString());
    try {
      JSONObject nudgeConfigurationdata;
      NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
      if(readableMap.hasKey("nudgeConfiguration")) {
        JSONObject obj = convertMapToJson(readableMap);
        nudgeConfigurationdata = obj.getJSONObject("nudgeConfiguration");
        if (nudgeConfigurationdata.has("layout")) {
          nudgeConfiguration.setLayout(nudgeConfigurationdata.getString("layout"));
        }
        if (nudgeConfigurationdata.has("opacity")) {
          nudgeConfiguration.setOpacity(Double.parseDouble(nudgeConfigurationdata.getString("opacity")));
        }
        if (nudgeConfigurationdata.has("closeOnDeepLink")) {
          nudgeConfiguration.setCloseOnDeepLink(nudgeConfigurationdata.getBoolean("closeOnDeepLink"));
        }
        if (nudgeConfigurationdata.has("absoluteHeight")) {
          nudgeConfiguration.setAbsoluteHeight(Double.parseDouble(nudgeConfigurationdata.getString("absoluteHeight")));
        }
        if (nudgeConfigurationdata.has("relativeHeight")) {
          nudgeConfiguration.setRelativeHeight(Double.parseDouble(nudgeConfigurationdata.getString("relativeHeight")));
        }
        CustomerGlu.getInstance().loadCampaignById(getReactApplicationContext(), id, nudgeConfiguration);
      } else {
        CustomerGlu.getInstance().loadCampaignById(getReactApplicationContext(),id);
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }


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
  public void configureStatusBarColour(String color) {
    CustomerGlu.getInstance().configureStatusBarColour(color);
  }

 @ReactMethod
  public void configureSafeArea(ReadableMap map) {
  }

  @ReactMethod
  public void configureLoadingScreenColor(String clr) {
    Log.e(TAG, "color->>>>>>"+clr);
    if(clr!=null && clr.length()==9) {
      int red = Integer.valueOf(clr.substring(1, 3), 16);
      int green = Integer.valueOf(clr.substring(3, 5), 16);
      int blue = Integer.valueOf(clr.substring(5, 7), 16);
      int alpha = Integer.parseInt(clr.substring(7, 9), 16);
      String alphaHex = To00Hex(alpha);
      String blueHex = To00Hex(blue);
      String greenHex = To00Hex(green);
      String redHex = To00Hex(red);
      StringBuilder str = new StringBuilder("#");
      str.append(alphaHex);
      str.append(redHex );
      str.append(greenHex);
      str.append(blueHex);
      Log.e(TAG, "colo1-----" + red + " " + green + " " + blue + " " + alpha+" "+str.toString());

    CustomerGlu.getInstance().configureLoadingScreenColor(str.toString());

    }else
    {
          CustomerGlu.getInstance().configureLoadingScreenColor(clr);
    }
  }

  private static String To00Hex(int value) {
    String hex = "00".concat(Integer.toHexString(value));
    return hex.substring(hex.length()-2, hex.length());
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
//        Toast.makeText(getReactApplicationContext(), "Profile Updated", Toast.LENGTH_SHORT).show();
        Log.d(TAG,"Profile Updated!...");

      }

      @Override
      public void onFail(String message) {
        Log.d(TAG,"Profile Not Updated!..."+message.toString());

      }
    });
  }

  @ReactMethod
  public void DisplayCGNotification(ReadableMap data,Boolean autoclosewebview) {
    JSONObject jsonObject=convertMapToJson(data);
    if(getAppIcon(getReactApplicationContext())!=0) {
      CustomerGlu.getInstance().displayCustomerGluNotification(getReactApplicationContext(), jsonObject, getAppIcon(getReactApplicationContext()), 0.5, autoclosewebview);
    }else{
      CustomerGlu.getInstance().displayCustomerGluNotification(getReactApplicationContext(), jsonObject, R.drawable.notification, 0.5, autoclosewebview);

    }
  }

  private static int getAppIcon(Context context) {

    try {
      ApplicationInfo ai = context.getPackageManager().getApplicationInfo(
              context.getPackageName(), PackageManager.GET_META_DATA);
      Bundle bundle = ai.metaData;
      int myAPIKey = bundle.getInt("CUSTOMERGLU_NOTIFICATION_ICON");
      printDebugLogs("API KEY : " + myAPIKey);
      return myAPIKey;
    } catch (Exception e) {
      Comman.printErrorLogs(e.toString());
      return 0;
    }
  }









  @ReactMethod
  public void DisplayCGBackgroundNotification(ReadableMap data,Boolean autoclosewebview) {
    JSONObject jsonObject=convertMapToJson(data);
    Log.d(TAG,"DisplayCGBackgroundNotification---"+jsonObject+" "+ autoclosewebview);
    CustomerGlu.getInstance().displayCustomerGluBackgroundNotification(getReactApplicationContext(),jsonObject,autoclosewebview);

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
  public void OpenNudgeRN(String nudgeid,ReadableMap readableMap){
    Log.d(TAG,"nudeg----"+readableMap.hasKey("nudgeConfiguration"));
    NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
    try {
      if(readableMap.hasKey("nudgeConfiguration")) {
        JSONObject nudgeConfigurationdata;

        JSONObject obj = convertMapToJson(readableMap);
        if (obj.has("nudgeid")) {
          nudgeid = obj.getString("nudgeid");
        }
        if (obj.has("nudgeConfiguration")) {
          nudgeConfigurationdata = obj.getJSONObject("nudgeConfiguration");
          if (nudgeConfigurationdata.has("layout")) {
            nudgeConfiguration.setLayout(nudgeConfigurationdata.getString("layout"));
          }
          if (nudgeConfigurationdata.has("opacity")) {
            nudgeConfiguration.setOpacity(Double.parseDouble(nudgeConfigurationdata.getString("opacity")));
          }
          if (nudgeConfigurationdata.has("closeOnDeepLink")) {
            nudgeConfiguration.setCloseOnDeepLink(nudgeConfigurationdata.getBoolean("closeOnDeepLink"));
          }
          if (nudgeConfigurationdata.has("absoluteHeight")) {
            nudgeConfiguration.setAbsoluteHeight(Double.parseDouble(nudgeConfigurationdata.getString("absoluteHeight")));
          }
          if (nudgeConfigurationdata.has("relativeHeight")) {
            nudgeConfiguration.setRelativeHeight(Double.parseDouble(nudgeConfigurationdata.getString("relativeHeight")));
          }
        }
      }
      CustomerGlu.getInstance().openNudge(getReactApplicationContext(),nudgeid,nudgeConfiguration);
    } catch (JSONException e) {
      e.printStackTrace();
    }


  }


  @ReactMethod
  public void configureDomainCodeMsg(ReadableMap readableMap) {
    try {
      JSONObject obj = convertMapToJson(readableMap);
      int code = obj.has("code")? (int) obj.get("code"):0;
      String msg = obj.has("msg")?(String) obj.get("msg"):"";
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
          case Map:
            jsonObject.put(key, convertMapToJson(readableMap.getMap(key)));
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
