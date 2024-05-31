package com.reactnativerncustomerglu;

import static com.customerglu.sdk.Utils.Comman.printDebugLogs;
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.customerglu.sdk.Interface.CGDeepLinkListener;
import com.customerglu.sdk.Interface.CampaignStatusListener;
import com.customerglu.sdk.Interface.CampaignValidListener;
import com.customerglu.sdk.Modal.DeepLinkWormholeModel;
import com.customerglu.sdk.Modal.NudgeConfiguration;
import com.customerglu.sdk.Utils.CGConstants;
import com.customerglu.sdk.Utils.Comman;
import com.customerglu.sdk.pip.PIPHelper;
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
public class RncustomergluModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String TAG = RncustomergluModule.class.getName();
    public static String Myclassname = "";
    public static final String NAME = "Rncustomerglu";
    private static ReactApplicationContext mContext;


    public RncustomergluModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        reactContext.addLifecycleEventListener(this);
        if (!CustomerGlu.isInitialized){
            Log.e("Receiver Register","register");
            registerBroadcastReceiver();
            CustomerGlu.getInstance().initializeSdk(getReactApplicationContext());
        }
        setPlatformAndSdkVersion();
    }

    @ReactMethod
    public void addListener(String eventName) {
    }

    @ReactMethod
    public void removeListeners(Integer count) {
    }



    private void setPlatformAndSdkVersion() {
        if (CustomerGlu.getInstance() != null) {

            CustomerGlu.cg_sdk_version = "1.5.8";
            CustomerGlu.cg_app_platform = "REACT_NATIVE";
        }
    }
    


    private final BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.d(TAG, "on Received....");
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
        try {
            mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_ANALYTICS_EVENT"));
            mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_DEEPLINK_EVENT"));
            mContext.registerReceiver(mMessageReceiver, new IntentFilter("CUSTOMERGLU_BANNER_LOADED"));
            mContext.registerReceiver(mMessageReceiver, new IntentFilter("CG_INVALID_CAMPAIGN_ID"));
        }catch (Exception e){
            printDebugLogs(""+e);
        }

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
        Log.e(TAG, "On Host Resume....");
        CustomerGlu.getInstance().showEntryPoint(getReactApplicationContext().getCurrentActivity());

        CustomerGlu.getInstance().setCgDeepLinkListener(new CGDeepLinkListener() {
            @Override
            public void onSuccess(CGConstants.CGSTATE message, DeepLinkWormholeModel.DeepLinkData deepLinkData) {
                JSONObject jsonObject = null;
                try {
                    if (message.equals(CGConstants.CGSTATE.DEEPLINK_URL)) {
                        String url = "";
                        if (deepLinkData.getContent().getUrl() != null) {
                            url = deepLinkData.getContent().getUrl();
                            Log.e("DeepLink URL", "Success " + message);
                        }
                        // Add your logic
                    }
                    Log.e("Onelink", "Success " + message);
                    jsonObject = new JSONObject();
                    jsonObject.put("status",message.toString());
                    Gson gson = new Gson();
                    String json = gson.toJson(deepLinkData);
                    JSONObject mJSONObject = new JSONObject(json);
                    jsonObject.put("data",mJSONObject);

                    Log.e("Onelink2", "Success " + jsonObject);
//                    Intent intent = new Intent("CG_UNI_DEEPLINK_EVENT");
//                    intent.putExtra("data", jsonObject.toString());
//                    context.sendBroadcast(intent);

                    WritableMap map = jsonToWritableMap(jsonObject);
                    sendEventToJs("CG_UNI_DEEPLINK_EVENT", map);

                    Log.e("Onelink4", "Success " + message);
                }catch (Exception e)
                {
                    Log.e("Onelink ex ",e.toString());
                }
            }

            @Override
            public void onFailure(CGConstants.CGSTATE exceptions) {
                try {
                    Log.e("Onelink", "Success " + exceptions);
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("status", exceptions.toString());

                    JSONObject mJSONObject = new JSONObject();
                    jsonObject.put("data", mJSONObject);
                    WritableMap map = jsonToWritableMap(jsonObject);
                    sendEventToJs("CG_UNI_DEEPLINK_EVENT", map);

                    Log.e("Onelink2", "Success " + jsonObject);

//
//                    Intent intent = new Intent("CG_UNI_DEEPLINK_EVENT");
//                    intent.putExtra("data", jsonObject.toString());
//                    context.sendBroadcast(intent);
                }catch (Exception e)
                {
                    Log.e("Onelink ex ",e.toString());

                }

            }
        });

    }


    @ReactMethod
    public void handleDeepLinkUri(String urls){
        if(urls!=null){
        Uri uri = Uri.parse(urls);
        Comman.handleDeepLinkUri(uri);}
        else
        {
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("status", "EXCEPTION");
                JSONObject mJSONObject = new JSONObject();
                jsonObject.put("data", mJSONObject);
                WritableMap map = jsonToWritableMap(jsonObject);
                sendEventToJs("CG_UNI_DEEPLINK_EVENT", map);
            } catch (JSONException e) {
                e.printStackTrace();
            }


        }
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        try {
            if (mContext != null) {
                Log.e("Receiver unRegister","unregister");
                mContext.unregisterReceiver(mMessageReceiver);
            }
        }catch (Exception e){
        printDebugLogs(""+e);
        }
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android


    @ReactMethod
    public void registerDevice(ReadableMap map, Promise promise) {
        if (map != null) {
            JSONObject jsonObject = convertMapToJson(map);
            HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);
            Log.d(TAG, "userdata----> " + userData.toString() + " " + new Date().getTime());

            CustomerGlu.getInstance().registerDevice(getReactApplicationContext(), userData, new DataListner() {
                //this method registers the user
                @Override
                public void onSuccess(RegisterModal registerModal) {
//        Toast.makeText(getReactApplicationContext(), "Registered", Toast.LENGTH_SHORT).show();

                    RegisterModal remodal = registerModal;
                    Log.d(TAG, "Registered!..." + " " + new Date().getTime());
                    promise.resolve(true);


                }

                @Override
                public void onFail(String message) {
//        Toast.makeText(getReactApplicationContext(), "" + message, Toast.LENGTH_SHORT).show();
                    Log.d(TAG, "Registeration Failed!..." + message.toString());

                    promise.resolve(false);

                }
            });
        }

    }

    @ReactMethod
    public void setOpenWalletAsFallback(Boolean value) {
        CustomerGlu.getInstance().openWalletAsFallback(value);
    }


    @ReactMethod
    public void dataClear() {
        CustomerGlu.getInstance().clearGluData(getCurrentActivity());
    }

    @ReactMethod
    public void sendData(ReadableMap readableMap) {
        Log.e(TAG, "rereadableMapquest----- " + readableMap);
        if (readableMap != null) {
            try {
                String evnt = "";
                JSONObject obj = convertMapToJson(readableMap);
                Log.e(TAG, "request----- " + obj);
                if (obj.has("eventName")) {
                    evnt = (String) obj.get("eventName");
                }
                if (obj.has("eventProperties")) {
                    Object eventProperties = obj.get("eventProperties");
                    if (eventProperties instanceof JSONObject) {
                        Log.e(TAG, "data>>>>>----- " + (JSONObject) eventProperties);
                        CustomerGlu.getInstance().sendEvent(getReactApplicationContext(), evnt, jsonToMap((JSONObject) eventProperties));
                    }
                } else {
                    Map<String, Object> s = new HashMap<>();
                    CustomerGlu.getInstance().sendEvent(getReactApplicationContext(), evnt, s);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

    }

    public static Map<String, Object> jsonToMap(JSONObject json) throws JSONException {
        Map<String, Object> retMap = new HashMap<String, Object>();
        if (json != JSONObject.NULL) {
            retMap = toMap(json);
        }
        return retMap;
    }

    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap<String, Object>();
        Iterator<String> keysItr = object.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            Object value = object.get(key);

            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    public static List<Object> toList(JSONArray array) throws JSONException {
        List<Object> list = new ArrayList<Object>();
        for (int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }

    @ReactMethod
    public void openWallet(ReadableMap readableMap) {
        try {
            if (readableMap.hasKey("nudgeConfiguration")) {
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


            } else {
                CustomerGlu.getInstance().openWallet(getReactApplicationContext());
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void loadCampaignById(String id, ReadableMap readableMap) {
        Log.e(TAG, "loadCampaignById-----" + readableMap.toString());
        try {
            JSONObject nudgeConfigurationdata;
            NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
            if (readableMap.hasKey("nudgeConfiguration")) {
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
                CustomerGlu.getInstance().loadCampaignById(getReactApplicationContext(), id);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }


    }

    @ReactMethod
    public void loadCampaignWithUrl(String url, ReadableMap readableMap) {
        Log.e(TAG, "loadCampaignByUrl-----" + readableMap.toString());
        try {
            JSONObject nudgeConfigurationdata;
            NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
            if (readableMap.hasKey("nudgeConfiguration")) {
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
                CustomerGlu.getInstance().displayCGNudge(getReactApplicationContext(), url, "",nudgeConfiguration);
            } else {
                CustomerGlu.getInstance().displayCGNudge(getReactApplicationContext(), url,"",nudgeConfiguration);
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
    public void allowAnonymousRegistration(Boolean bool) {
        CustomerGlu.getInstance().allowAnonymousRegistration(bool);
    }


    @ReactMethod
    public void disableGluSdk(Boolean bool) {
        CustomerGlu.getInstance().disableGluSdk(bool);

    }

    @ReactMethod
    public void testIntegration()
    {
        CustomerGlu.getInstance().testIntegration();
    }

    @ReactMethod
    public void configureLoaderColour(String color) {
        CustomerGlu.getInstance().configureLoaderColour(getReactApplicationContext(), color);
    }

    @ReactMethod
    public void addMarginsForPIP(int horizontal, int vertical, String type) {
        if (type.equalsIgnoreCase("px")) {
            CustomerGlu.getInstance().addMarginForPIP(horizontal, vertical, PIPHelper.DISPLAY_UNIT_TYPE.PX);
        }else{
            CustomerGlu.getInstance().addMarginForPIP(horizontal, vertical, PIPHelper.DISPLAY_UNIT_TYPE.DP);

        }
    }
    @ReactMethod
    public void addDelayForPIP(int delay) {

        CustomerGlu.getInstance().addDelayForPIP(delay);
    }
    // @ReactMethod
    // public void setPIPEnabled(boolean enabled) {
    //         CustomerGlu.getInstance().setPIPEnabled(getReactApplicationContext().getCurrentActivity(),enabled);
    // }
    // @ReactMethod
    // public boolean isPIPEnabled() {
        
    //       return CustomerGlu.getInstance().isPIPEnabled();
    // }
    // @ReactMethod
    // public void dismissPIP() {

    //         CustomerGlu.getInstance().dismissPIP();
    // }
    @ReactMethod
    public void isCampaignValid( String campaignId,String dataFlag,Promise promise) {
        CGConstants.DATA_FLAG flag = CGConstants.DATA_FLAG.API;

        if (dataFlag.equalsIgnoreCase("CACHE"))
        {
             flag = CGConstants.DATA_FLAG.CACHED;
        }
             CustomerGlu.getInstance().isCampaignValid(campaignId, flag, new CampaignValidListener() {
               @Override
               public void validCampaign() {
                   promise.resolve(true);
               }

               @Override
               public void invalidCampaign() {
                promise.resolve(false);
               }
           });
    }

    @ReactMethod
    public void getCampaignStatus( String campaignId,String dataFlag,Promise promise) {
        CGConstants.DATA_FLAG flag = CGConstants.DATA_FLAG.API;

        if (dataFlag.equalsIgnoreCase("CACHE"))
        {
            flag = CGConstants.DATA_FLAG.CACHED;
        }
        CustomerGlu.getInstance().getCampaignStatus(campaignId, CGConstants.DATA_FLAG.API, new CampaignStatusListener() {
            @Override
            public void onStatusReceived(CGConstants.CAMPAIGN_STATE campaignState) {
                promise.resolve(campaignState.toString());
            }
        });
    }

    //2jan2023

    @ReactMethod
    public void configureDarkBackgroundColor(String color) {
        if(color!=null){
        CustomerGlu.getInstance().configureDarkBackgroundColor(color);}
    }

    @ReactMethod
    public void configureLightBackgroundColor(String color) {
        if(color!=null){
        CustomerGlu.getInstance().configureLightBackgroundColor(color);}
    }

    @ReactMethod
    public void listenToDarkMode(boolean isdarkmode) {
        CustomerGlu.getInstance().listenToSystemDarkMode(isdarkmode);
    }

    @ReactMethod
    public void enableDarkMode(boolean darkmode) {
        CustomerGlu.getInstance().enableDarkMode(darkmode);
    }
//end

//16jan2023
    @ReactMethod
    public void configureLightLoaderURL(String url){
        if(url!=null){
             CustomerGlu.getInstance().configureLightLoaderURL(getReactApplicationContext(), url);
        }
    }
    @ReactMethod
    public void configureDarkLoaderURL(String url){
        if(url!=null){
             CustomerGlu.getInstance().configureDarkLoaderURL(getReactApplicationContext(), url);
        }

    }
    @ReactMethod
    public void configureLightEmbedLoaderURL(String url){
        if(url!=null){
             CustomerGlu.getInstance().configureLightEmbedLoaderURL(getReactApplicationContext(), url);
        }

    }
    @ReactMethod
    public void configureDarkEmbedLoaderURL(String url){
        if(url!=null){
             CustomerGlu.getInstance().configureDarkEmbedLoaderURL(getReactApplicationContext(), url);
        }
    }
    //end
    @ReactMethod
    public void configureStatusBarColour(String color) {
        CustomerGlu.getInstance().configureStatusBarColour(color);
    }

    @ReactMethod
    public void configureSafeArea(ReadableMap map) {
    }

    @ReactMethod
    public void configureLoadingScreenColor(String clr) {
        Log.e(TAG, "color->>>>>>" + clr);
        if (clr != null && clr.length() == 9) {
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
            str.append(redHex);
            str.append(greenHex);
            str.append(blueHex);
            Log.e(TAG, "colo1-----" + red + " " + green + " " + blue + " " + alpha + " " + str.toString());

            CustomerGlu.getInstance().configureLoadingScreenColor(str.toString());

        } else {
            CustomerGlu.getInstance().configureLoadingScreenColor(clr);
        }
    }

    private static String To00Hex(int value) {
        String hex = "00".concat(Integer.toHexString(value));
        return hex.substring(hex.length() - 2, hex.length());
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
        if (map != null) {
            JSONObject jsonObject = convertMapToJson(map);
            HashMap<String, Object> userData = new Gson().fromJson(jsonObject.toString(), HashMap.class);
            CustomerGlu.getInstance().updateProfile(getReactApplicationContext(), userData, new DataListner() {
                @Override
                public void onSuccess(RegisterModal registerModal) {
//        Toast.makeText(getReactApplicationContext(), "Profile Updated", Toast.LENGTH_SHORT).show();
                    Log.d(TAG, "Profile Updated!...");

                }

                @Override
                public void onFail(String message) {
                    Log.d(TAG, "Profile Not Updated!..." + message.toString());

                }
            });
        }
    }

    @ReactMethod
    public void DisplayCGNotification(ReadableMap data, Boolean autoclosewebview) {
        JSONObject jsonObject = convertMapToJson(data);
        if (getAppIcon(getReactApplicationContext()) != 0) {
            CustomerGlu.getInstance().displayCustomerGluNotification(getReactApplicationContext(), jsonObject, getAppIcon(getReactApplicationContext()), 0.5, autoclosewebview);
        } else {
            CustomerGlu.getInstance().displayCustomerGluNotification(getReactApplicationContext(), jsonObject, R.drawable.notification, 0.5, autoclosewebview);

        }
    }

    private static int getAppIcon(Context context) {

        try {
            ApplicationInfo ai = context.getPackageManager().getApplicationInfo(
                    context.getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = ai.metaData;
            int myAPIKey = bundle.getInt("CUSTOMERGLU_NOTIFICATION_ICON");
            return myAPIKey;
        } catch (Exception e) {
            Comman.printErrorLogs(e.toString());
            return 0;
        }
    }


    @ReactMethod
    public void DisplayCGBackgroundNotification(ReadableMap data, Boolean autoclosewebview) {
        JSONObject jsonObject = convertMapToJson(data);
        Log.d(TAG, "DisplayCGBackgroundNotification---" + jsonObject + " " + autoclosewebview);
        CustomerGlu.getInstance().displayCustomerGluBackgroundNotification(getReactApplicationContext(), jsonObject, autoclosewebview);

    }


    @ReactMethod
    public void CGApplication() {
    }



    @ReactMethod
    public void GetRefferalId(String url, Promise promise) throws MalformedURLException {
        Uri myURL = Uri.parse(url);
        String referID = CustomerGlu.getInstance().getReferralId(myURL);
        promise.resolve(referID);
    }

    @ReactMethod
    public void SetCurrentClassName(String classname,String time) {
        this.Myclassname = classname;
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                CustomerGlu.getInstance().setScreenName(getReactApplicationContext(), classname);

            }
        });
    }


    @ReactMethod
    public void configureWhiteListedDomains(ReadableArray readableArray) {
        try {
            JSONArray obj = convertArrayToJson(readableArray);
            ArrayList<String> listdata = new ArrayList<String>();
            for (int i = 0; i < obj.length(); i++) {
                listdata.add((String) obj.get(i));

            }
            CustomerGlu.getInstance().configureWhiteListedDomains(listdata);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void OpenNudgeRN(String nudgeid, ReadableMap readableMap) {
        Log.d(TAG, "nudeg----" + readableMap.hasKey("nudgeConfiguration"));
        NudgeConfiguration nudgeConfiguration = new NudgeConfiguration();
        try {
            if (readableMap.hasKey("nudgeConfiguration")) {
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
            CustomerGlu.getInstance().openNudge(getReactApplicationContext(), nudgeid, nudgeConfiguration);
        } catch (JSONException e) {
            e.printStackTrace();
        }


    }


    @ReactMethod
    public void configureDomainCodeMsg(ReadableMap readableMap) {
        try {
            JSONObject obj = convertMapToJson(readableMap);
            int code = obj.has("code") ? (int) obj.get("code") : 0;
            String msg = obj.has("msg") ? (String) obj.get("msg") : "";
            CustomerGlu.getInstance().configureDomainCodeMsg(code, msg);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }


    private static JSONObject convertMapToJson(ReadableMap readableMap) {
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
            Log.e(TAG, "readableType" + readableType + " " + readableMap.toString());
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
                        break;
                    case Map:
                        jsonObject.put(key, convertMapToJson(readableMap.getMap(key)));
                        break;
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
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
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
