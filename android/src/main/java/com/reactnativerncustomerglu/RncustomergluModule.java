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
//      Array prop = (Array) obj.get("eventProperties");
//      Log.d("event",String.valueOf(eventProperties));
//      Log.d("event",String.valueOf(obj.get("eventProperties")));
//      Log.d("event",String.valueOf(obj.get("eventName")));
//      Log.d("event",String.valueOf(prop));
//      Log.d("event",String.valueOf(evnt));
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

//    HashMap<String,Object> eventProperties = new HashMap<>();
//    eventProperties.put("orderValue",1000);
//    customerGlu.sendEvent(getReactApplicationContext(),"Order_Placed",eventProperties);
//    Log.d("sendEvent", String.valueOf("sendEvent"));
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

}
