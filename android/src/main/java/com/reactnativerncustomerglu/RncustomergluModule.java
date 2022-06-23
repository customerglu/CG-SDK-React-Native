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
    

  @ReactMethod
  public void dataClear() {
    customerGlu.clearGluData(getReactApplicationContext());
  }
  @ReactMethod
  public void sendData(ReadableMap readableMap) {
    try {
      JSONObject obj= convertMapToJson(readableMap);
      Log.d("Hello",String.valueOf("eventProperties"));
      HashMap<String,Object> eventProperties = new HashMap<>();
      eventProperties.put("eventName",obj.get("eventName"));
      eventProperties.put("eventProperties",obj.get("eventProperties"));
      String evnt = (String) obj.get("eventName");
      customerGlu.sendEvent(getReactApplicationContext(),evnt,eventProperties);
      LocalBroadcastManager.getInstance(getReactApplicationContext()).registerReceiver(new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
          try {
            //Filter for the intent you sent in the r.n side
            if ("someEventName".equals(intent.getStringExtra(EVENT_NAME))) {
              //Get the event properties
              JSONObject event_properties = new JSONObject(intent.getStringExtra(EVENT_PROPERTIES));
              //Add more logic here
            }
          } catch (JSONException e) {
            e.printStackTrace();
          }

        }
      }, new IntentFilter(SEND_BROADCAST_ACTION));

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
    customerGlu.loadCampaignById(getReactApplicationContext(),id);
    Log.d("id", String.valueOf(id));
  }

  @ReactMethod
  public void enableAnalytic(Boolean bool) {
    customerGlu.enableAnalyticsEvent(bool);
    Log.d("enableAnalytic", String.valueOf(bool));
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
    customerGlu.enableEntryPoints(getReactApplicationContext() , bol);
    Log.d("enableEntryPoints", String.valueOf(bol));
  }
  @ReactMethod
  public void closeWebView(Boolean bol) {
    customerGlu.closeWebviewOnDeeplinkEvent(bol);
    Log.d("closeWEbView", String.valueOf(bol));
  }

  @ReactMethod
  public void SetDefaultBannerImage(String url) {
    customerGlu.setDefaultBannerImage(getReactApplicationContext(),url);
    Log.d("closeWEbView", String.valueOf(url));
  }
  @ReactMethod
  public void UpdateProfile() {
    Map<String,Object> userData = new HashMap<>();
    String user_id="testUser_1";
    userData.put("userId",user_id);
    customerGlu.updateProfile(getReactApplicationContext(),userData);
    Log.d("updateProfile", String.valueOf(userData));
  }
  @ReactMethod
  public void DisplayCustomerGluNotification() {
    Log.d("displayCgNotification", String.valueOf("cg Notification"));
  }
  @ReactMethod
  public void CGApplication() {
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
      JSONObject obj= convertMapToJson(readableMap);
      HashMap<String,Object> campaignData = new HashMap<>();
      campaignData.put("campaignId",obj.get("campaignId"));
      campaignData.put("status",obj.get("status"));
      campaignData.put("type",obj.get("type"));
      customerGlu.loadCampaignsByFilter(getReactApplicationContext(),campaignData);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void SetCurrentClassName() {
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
}



