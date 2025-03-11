package com.customerglu.reactnativecustomerglu

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import android.R
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.core.content.ContextCompat
import com.customerglu.sdk.CustomerGlu
import com.customerglu.sdk.Interface.CampaignValidListener
import com.customerglu.sdk.Interface.DataListner
import com.customerglu.sdk.Modal.NudgeConfiguration
import com.customerglu.sdk.Utils.CGConstants
import com.customerglu.sdk.Utils.Comman
import com.customerglu.sdk.pip.PIPHelper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.util.Date
import kotlin.math.roundToInt
@ReactModule(name = RnCustomergluModule.NAME)
class RnCustomergluModule(reactContext: ReactApplicationContext) :
  NativeReactNativeCustomergluSpec(reactContext) {
 val TAG:String = "CUSTOMERGLU"
   val ANALYTICS_BROADCAST_ACTION = "CUSTOMERGLU_ANALYTICS_EVENT"
  val DEEPLINK_BROADCAST_ACTION = "CUSTOMERGLU_DEEPLINK_EVENT"
  val BANNER_BROADCAST_ACTION = "CUSTOMERGLU_BANNER_LOADED"
  val INVALID_CAMPAIGN_BROADCAST_ACTION = "CG_INVALID_CAMPAIGN_ID"
  val BANNER_HEIGHT_BROADCAST_ACTION = "CGBANNER_FINAL_HEIGHT"


  var mContext: ReactApplicationContext? = null
  var mReceiver: BroadcastReceiver? = null
  var Myclassname: String = ""

  override fun getName(): String {
    return NAME
  }
  @ReactMethod
  override fun addListener(eventName: String) {
    Log.d(TAG, "addListener called for $eventName")
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
    Log.d(TAG, "removeListeners called with count: $count")
  }
  init {
    mContext = reactContext;
    CustomerGlu.getInstance().showEntryPoint(reactApplicationContext.currentActivity,"CG_SCREEN");
    registerBroadcastReceiver()
  }
  private fun registerBroadcastReceiver() {
    Log.d(TAG, "Registering broadcast receiver for action: $ANALYTICS_BROADCAST_ACTION")

    mReceiver = object : BroadcastReceiver() {
      override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == ANALYTICS_BROADCAST_ACTION) {
          val data = intent.getStringExtra("data") ?: ""
          Log.d(TAG, "Received broadcast event with data: $data")

          // Create a WritableMap to send to React Native
          val jsonObject = JSONObject(data)
          val map: WritableMap? = jsonToWritableMap(jsonObject)
          if (map != null) {
            sendEventToJs("CUSTOMERGLU_ANALYTICS_EVENT", map)
          }

          // Send the event to JS
          //sendEventToJs("onCustomerGluAnalyticsEvent", params)
        }
        if (intent.action == DEEPLINK_BROADCAST_ACTION) {
          val data = intent.getStringExtra("data") ?: ""
          Log.d(TAG, "Received broadcast event with data: $data")

          // Create a WritableMap to send to React Native
          val jsonObject = JSONObject(data)
          val map: WritableMap? = jsonToWritableMap(jsonObject)
          if (map != null) {
            sendEventToJs("CUSTOMERGLU_DEEPLINK_EVENT", map)
          }

        }
        if (intent.action == BANNER_BROADCAST_ACTION) {
          val data = intent.getStringExtra("data") ?: ""
          Log.d(TAG, "Received broadcast event with data: $data")

          // Create a WritableMap to send to React Native
          val jsonObject = JSONObject(data)
          val map: WritableMap? = jsonToWritableMap(jsonObject)
          if (map != null) {
            sendEventToJs("CUSTOMERGLU_BANNER_LOADED", map)
          }

          // Send the event to JS
          //sendEventToJs("onCustomerGluAnalyticsEvent", params)
        }
        if (intent.action == BANNER_HEIGHT_BROADCAST_ACTION) {
          val data = intent.getStringExtra("data") ?: ""
          Log.d(TAG, "Received broadcast event with data: $data")

          // Create a WritableMap to send to React Native
          val jsonObject = JSONObject(data)
          val map: WritableMap? = jsonToWritableMap(jsonObject)
          if (map != null) {
            sendEventToJs("CGBANNER_FINAL_HEIGHT", map)
          }

          // Send the event to JS
          //sendEventToJs("onCustomerGluAnalyticsEvent", params)
        }

        if (intent.action == INVALID_CAMPAIGN_BROADCAST_ACTION) {
          val data = intent.getStringExtra("data") ?: ""
          Log.d(TAG, "Received broadcast event with data: $data")

          // Create a WritableMap to send to React Native
          val jsonObject = JSONObject(data)
          val map: WritableMap? = jsonToWritableMap(jsonObject)
          if (map != null) {
            sendEventToJs("CG_INVALID_CAMPAIGN_ID", map)
          }

          // Send the event to JS
          //sendEventToJs("onCustomerGluAnalyticsEvent", params)
        }

      }
    }

    // Register the broadcast receiver
    val intentFilter = IntentFilter().apply {
      addAction(ANALYTICS_BROADCAST_ACTION)
      addAction(DEEPLINK_BROADCAST_ACTION)
      addAction(BANNER_BROADCAST_ACTION)
      addAction(INVALID_CAMPAIGN_BROADCAST_ACTION)
      addAction(BANNER_HEIGHT_BROADCAST_ACTION)
    }
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
      reactApplicationContext.registerReceiver(
        mReceiver,
        intentFilter,
        Context.RECEIVER_EXPORTED  // Use NOT_EXPORTED since this is for internal app communication
      )
    } else {
      reactApplicationContext.registerReceiver(mReceiver, intentFilter,Context.RECEIVER_EXPORTED )
    }
  }

  // Don't forget to unregister the receiver when the module is destroyed
  override fun invalidate() {
    // This is called when the TurboModule is destroyed
    if (mReceiver != null) {
      try {
        reactApplicationContext.unregisterReceiver(mReceiver)
      } catch (e: IllegalArgumentException) {
        // Receiver might not be registered
        Log.e(TAG, "Error unregistering receiver: ${e.message}")
      }
      mReceiver = null
    }
    super.invalidate()
  }

  private fun sendEventToJs(eventName: String, map: WritableMap) {
    try {
      reactApplicationContext.getJSModule<DeviceEventManagerModule.RCTDeviceEventEmitter>(
        DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, map)
    } catch (e: java.lang.Exception) {
    }
  }
  @ReactMethod
  override fun registerDevice(map: ReadableMap?, promise: Promise) {
    map?.let {
      Handler(Looper.getMainLooper()).postDelayed({
        val jsonObject = convertMapToJson(it)
        val userData: HashMap<String, Any> = Gson().fromJson(jsonObject.toString(), object : TypeToken<HashMap<String, Any>>() {}.type)
        Log.d(TAG, "userdata----> $userData ${Date().time}")
        CustomerGlu.getInstance().registerDevice(reactApplicationContext, userData, object :
          DataListner {
          // this method registers the user


          override fun onSuccess(p0: kotlin.Boolean?) {
            Log.d(TAG, "Registered!... ${Date().time}")
            promise.resolve(true)
          }

          override fun onFail(message: String) {
            Log.d(TAG, "Registeration Failed!... $message")
            promise.resolve(false)
          }
        })
      }, 500)
    }
  }

  @ReactMethod
  override fun UpdateUserAttributes(map: ReadableMap?) {
    if (map != null) {
      val jsonObject = convertMapToJson(map)
      val userData: MutableMap<String, Any> = Gson().fromJson(
        jsonObject.toString(),
        object : TypeToken<HashMap<String, Any>>() {}.type
      ) ?: mutableMapOf()

      CustomerGlu.getInstance().updateUserAttributes(reactApplicationContext, userData)
    }
  }

  override fun dataClear() {
    CustomerGlu.getInstance().clearGluData(currentActivity)
  }

  override fun sendData(readableMap: ReadableMap?) {


    if (readableMap != null) {
      try {
        var evnt = ""
        val obj = convertMapToJson(readableMap)
        Log.e(TAG, "request----- $obj")
        if (obj!!.has("eventName")) {
          evnt = obj!!["eventName"] as String
        }
        if (obj!!.has("eventProperties")) {
          val eventProperties = obj!!["eventProperties"]
          if (eventProperties is JSONObject) {
            Log.e(TAG, "data>>>>>----- " + eventProperties)
            CustomerGlu.getInstance().sendEvent(
              reactApplicationContext, evnt, jsonToMap(
                eventProperties
              )
            )
          }
        } else {
          val s: Map<String, Any> = HashMap()
          CustomerGlu.getInstance().sendEvent(reactApplicationContext, evnt, s)
        }
      } catch (e: JSONException) {
        e.printStackTrace()
      }
    }
  }

  override fun openWallet(readableMap: ReadableMap?) {
    try {
      if (readableMap != null) {
        if (readableMap.hasKey("nudgeConfiguration")) {
          Log.e(TAG, "openwallet-----" + readableMap.toString())

          val nudgeConfigurationdata: JSONObject
          val nudgeConfiguration = NudgeConfiguration()
          val obj = convertMapToJson(readableMap)
          nudgeConfigurationdata = obj!!.getJSONObject("nudgeConfiguration")
          if (nudgeConfigurationdata.has("layout")) {
            nudgeConfiguration.layout = nudgeConfigurationdata.getString("layout")
          }
          if (nudgeConfigurationdata.has("opacity")) {
            nudgeConfiguration.opacity = nudgeConfigurationdata.getString("opacity").toDouble()
          }
          if (nudgeConfigurationdata.has("closeOnDeepLink")) {
            nudgeConfiguration.isCloseOnDeepLink =
              nudgeConfigurationdata.getBoolean("closeOnDeepLink")
          }
          if (nudgeConfigurationdata.has("absoluteHeight")) {
            nudgeConfiguration.absoluteHeight =
              nudgeConfigurationdata.getString("absoluteHeight").toDouble()
          }
          if (nudgeConfigurationdata.has("relativeHeight")) {
            nudgeConfiguration.relativeHeight =
              nudgeConfigurationdata.getString("relativeHeight").toDouble()
          }
          CustomerGlu.getInstance().openWallet(reactApplicationContext, nudgeConfiguration)
        } else {
          CustomerGlu.getInstance().openWallet(reactApplicationContext)
        }
      }
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  override fun initCGSDK(obj: String?) {
    CustomerGlu.getInstance().initializeSdk(getReactApplicationContext(),obj);

  }

  override fun loadCampaignById(id: String?, readableMap: ReadableMap?) {
    Log.e(TAG, "loadCampaignById-----" + readableMap.toString())
    try {
      val nudgeConfigurationdata: JSONObject
      val nudgeConfiguration = NudgeConfiguration()
      if (readableMap != null) {
        if (readableMap.hasKey("nudgeConfiguration")) {
          val obj = convertMapToJson(readableMap)
          nudgeConfigurationdata = obj!!.getJSONObject("nudgeConfiguration")
          if (nudgeConfigurationdata.has("layout")) {
            nudgeConfiguration.layout = nudgeConfigurationdata.getString("layout")
          }
          if (nudgeConfigurationdata.has("opacity")) {
            nudgeConfiguration.opacity = nudgeConfigurationdata.getString("opacity").toDouble()
          }
          if (nudgeConfigurationdata.has("closeOnDeepLink")) {
            nudgeConfiguration.isCloseOnDeepLink =
              nudgeConfigurationdata.getBoolean("closeOnDeepLink")
          }
          if (nudgeConfigurationdata.has("absoluteHeight")) {
            nudgeConfiguration.absoluteHeight =
              nudgeConfigurationdata.getString("absoluteHeight").toDouble()
          }
          if (nudgeConfigurationdata.has("relativeHeight")) {
            nudgeConfiguration.relativeHeight =
              nudgeConfigurationdata.getString("relativeHeight").toDouble()
          }
          CustomerGlu.getInstance().loadCampaignById(reactApplicationContext, id, nudgeConfiguration)
        } else {
          CustomerGlu.getInstance().loadCampaignById(reactApplicationContext, id)
        }
      }
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  override fun loadCampaignWithUrl(url: String?, readableMap: ReadableMap?) {
    Log.e(TAG, "loadCampaignByUrl-----" + readableMap.toString())
    try {
      val nudgeConfigurationdata: JSONObject
      val nudgeConfiguration = NudgeConfiguration()
      if (readableMap != null) {
        if (readableMap.hasKey("nudgeConfiguration")) {
          val obj = convertMapToJson(readableMap)
          nudgeConfigurationdata = obj!!.getJSONObject("nudgeConfiguration")
          if (nudgeConfigurationdata.has("layout")) {
            nudgeConfiguration.layout = nudgeConfigurationdata.getString("layout")
          }
          if (nudgeConfigurationdata.has("opacity")) {
            nudgeConfiguration.opacity = nudgeConfigurationdata.getString("opacity").toDouble()
          }
          if (nudgeConfigurationdata.has("closeOnDeepLink")) {
            nudgeConfiguration.isCloseOnDeepLink =
              nudgeConfigurationdata.getBoolean("closeOnDeepLink")
          }
          if (nudgeConfigurationdata.has("absoluteHeight")) {
            nudgeConfiguration.absoluteHeight =
              nudgeConfigurationdata.getString("absoluteHeight").toDouble()
          }
          if (nudgeConfigurationdata.has("relativeHeight")) {
            nudgeConfiguration.relativeHeight =
              nudgeConfigurationdata.getString("relativeHeight").toDouble()
          }
          CustomerGlu.getInstance()
            .displayCGNudge(reactApplicationContext, url, "", nudgeConfiguration)
        } else {
          CustomerGlu.getInstance()
            .displayCGNudge(reactApplicationContext, url, "", nudgeConfiguration)
        }
      }
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  override fun enableAnalytic(b: Boolean) {
    CustomerGlu.getInstance().enableAnalyticsEvent(b);

  }

  override fun allowAnonymousRegistration(b: Boolean) {
    CustomerGlu.getInstance().allowAnonymousRegistration(b);
  }

  override fun gluSDKDebuggingMode(b: Boolean) {
    CustomerGlu.getInstance().gluSDKDebuggingMode(getCurrentActivity(), b);
  }

  override fun enableEntryPoints(b: Boolean) {
    CustomerGlu.getInstance().enableEntryPoints(getCurrentActivity(), b);
  }

  override fun isFcmApn(id: String) {

  }

  override fun UpdateProfile(map: ReadableMap?) {
    if (map != null) {
      val jsonObject = convertMapToJson(map)

      val userData: MutableMap<String, Any> = Gson().fromJson<HashMap<String, Any>>(
        jsonObject.toString(),
        object : TypeToken<HashMap<String, Any>>() {}.type
      ) ?: mutableMapOf() // Ensure it's not null

      CustomerGlu.getInstance()
        .updateProfile(reactApplicationContext, userData, object : DataListner {
          override fun onSuccess(registerModal: Boolean) {
            Log.d(TAG, "Profile Updated!...")
          }

          override fun onFail(message: String) {
            Log.d(TAG, "Profile Not Updated!...$message")
          }
        })
    }
  }

  override fun DisplayCustomerGluNotification() {
    TODO("Not yet implemented")
  }
  private fun getAppIcon(context: Context): Int {
    try {
      val ai = context.packageManager.getApplicationInfo(
        context.packageName, PackageManager.GET_META_DATA
      )
      val bundle = ai.metaData
      val myAPIKey = bundle.getInt("CUSTOMERGLU_NOTIFICATION_ICON")
      return myAPIKey
    } catch (e: Exception) {
      Comman.printErrorLogs(e.toString())
      return 0
    }
  }
  override fun DisplayCGNotification(obj: ReadableMap?, autoclosewebview: Boolean?) {
    val jsonObject = convertMapToJson(obj)
    if (getAppIcon(reactApplicationContext) !== 0) {
      CustomerGlu.getInstance().displayCustomerGluNotification(
        reactApplicationContext, jsonObject, getAppIcon(reactApplicationContext), 0.5,
        autoclosewebview!!
      )
    } else {
      CustomerGlu.getInstance().displayCustomerGluNotification(
        reactApplicationContext, jsonObject, R.drawable.ic_notification_overlay, 0.5,
        autoclosewebview!!
      )
    }  }

  override fun DisplayCGBackgroundNotification(obj: ReadableMap?, autoclosewebview: Boolean?) {
    val jsonObject = convertMapToJson(obj)
    Log.d(TAG, "DisplayCGBackgroundNotification---$jsonObject $autoclosewebview")
    CustomerGlu.getInstance().displayCustomerGluBackgroundNotification(
      reactApplicationContext, jsonObject,
      autoclosewebview!!
    )
  }

  override fun SetCurrentClassName(clname: String?, promise: Promise?) {
    if (clname != null) {
      this.Myclassname = clname
      runOnUiThread(Runnable {
        CustomerGlu.getInstance().setScreenName(reactApplicationContext, clname)
      })
    }else{
      Log.e(TAG,"Class Name is Null")
    }

  }

  override fun setApnFcmToken(a: String?, b: String?) {
  }

  override fun getBannerHeight(promise: Promise?) {
  }

  override fun addMarginsForPIP(horizontal: Double, vertical: Double, type: String?) {
    if (type.equals("px")) {
      CustomerGlu.getInstance().addMarginForPIP(horizontal.roundToInt(), vertical.roundToInt(), PIPHelper.DISPLAY_UNIT_TYPE.PX);
    }else{
      CustomerGlu.getInstance().addMarginForPIP(horizontal.roundToInt(), vertical.roundToInt(), PIPHelper.DISPLAY_UNIT_TYPE.DP);

    }  }

  override fun addDelayForPIP(delay: Double) {
    CustomerGlu.getInstance().addDelayForPIP(delay.toInt());
  }

  override fun setOpenWalletAsFallback(value: Boolean) {
    CustomerGlu.getInstance().openWalletAsFallback(value);
  }

  override fun isCampaignValid(campaignId: String?, dataFlag: String?, promise: Promise?) {
    var flag = CGConstants.DATA_FLAG.API

    if (dataFlag.equals("CACHE")) {
      flag = CGConstants.DATA_FLAG.CACHED
    }
    CustomerGlu.getInstance().isCampaignValid(campaignId, flag, object : CampaignValidListener {
      override fun validCampaign() {
        promise!!.resolve(true)
      }

      override fun invalidCampaign() {
        promise!!.resolve(false)
      }
    })  }

  override fun getCampaignStatus(campaignId: String?, dataFlag: String?, promise: Promise?) {
    var flag = CGConstants.DATA_FLAG.API

    if (dataFlag.equals("CACHE")) {
      flag = CGConstants.DATA_FLAG.CACHED
    }
    CustomerGlu.getInstance().getCampaignStatus(
      campaignId, CGConstants.DATA_FLAG.API
    ) { campaignState -> promise!!.resolve(campaignState.toString()) }
  }


  @Throws(JSONException::class)
  fun jsonToMap(json: JSONObject): Map<String?, Any?> {
    var retMap: Map<String?, Any?> = HashMap()
    if (json !== JSONObject.NULL) {
      retMap = toMap(json)
    }
    return retMap
  }

  @Throws(JSONException::class)
  fun toMap(`object`: JSONObject): Map<String?, Any?> {
    val map: MutableMap<String?, Any?> = HashMap()
    val keysItr = `object`.keys()
    while (keysItr.hasNext()) {
      val key = keysItr.next()
      var value = `object`[key]

      if (value is JSONArray) {
        value = toList(value)
      } else if (value is JSONObject) {
        value = toMap(value)
      }
      map[key] = value
    }
    return map
  }

  @Throws(JSONException::class)
  fun toList(array: JSONArray): List<Any> {
    val list: MutableList<Any> = ArrayList()
    for (i in 0 until array.length()) {
      var value = array[i]
      if (value is JSONArray) {
        value = toList(value)
      } else if (value is JSONObject) {
        value = toMap(value)
      }
      list.add(value)
    }
    return list
  }

  private fun convertMapToJson(readableMap: ReadableMap?): JSONObject? {
    val jsonObject = JSONObject()
    if (readableMap == null) {
      return null
    }
    val iterator = readableMap.keySetIterator()
    if (!iterator.hasNextKey()) {
      return null
    }
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val readableType = readableMap.getType(key)
      Log.e(TAG, "readableType$readableType $readableMap")
      try {
        when (readableType) {
          ReadableType.Null -> jsonObject.put(key, null)
          ReadableType.Boolean -> jsonObject.put(key, readableMap.getBoolean(key))
          ReadableType.Number ->                         // Can be int or double.
            jsonObject.put(key, readableMap.getInt(key))

          ReadableType.String -> jsonObject.put(key, readableMap.getString(key))
          ReadableType.Array -> jsonObject.put(key, convertArrayToJson(readableMap.getArray(key)))
          ReadableType.Map -> jsonObject.put(key, convertMapToJson(readableMap.getMap(key)))
          else -> {}
        }
      } catch (ex: JSONException) {
      }
    }
    return jsonObject
  }

  @Throws(JSONException::class)
  private fun convertArrayToJson(readableArray: ReadableArray?): JSONArray {
    val array = JSONArray()
    for (i in 0 until readableArray!!.size()) {
      when (readableArray!!.getType(i)) {
        ReadableType.Null -> {}
        ReadableType.Boolean -> array.put(readableArray!!.getBoolean(i))
        ReadableType.Number -> array.put(readableArray!!.getDouble(i))
        ReadableType.String -> array.put(readableArray!!.getString(i))
        ReadableType.Map -> array.put(convertMapToJson(readableArray!!.getMap(i)))
        ReadableType.Array -> array.put(convertArrayToJson(readableArray!!.getArray(i)))
      }
    }
    return array
  }


  fun jsonToWritableMap(jsonObject: JSONObject?): WritableMap? {
    val writableMap: WritableMap = WritableNativeMap()
    if (jsonObject == null) {
      return null
    }
    val iterator = jsonObject.keys()
    if (!iterator.hasNext()) {
      return null
    }
    while (iterator.hasNext()) {
      val key = iterator.next()
      try {
        val value = jsonObject[key]
        if (value == null) {
          writableMap.putNull(key)
        } else if (value is Boolean) {
          writableMap.putBoolean(key, value)
        } else if (value is Int) {
          writableMap.putInt(key, value)
        } else if (value is Double) {
          writableMap.putDouble(key, value)
        } else if (value is String) {
          writableMap.putString(key, value)
        } else if (value is JSONObject) {
          writableMap.putMap(key, jsonToWritableMap(value))
        } else if (value is JSONArray) {
          writableMap.putArray(key, jsonArrayToWritableArray(value))
        }
      } catch (ex: JSONException) {
        // Do nothing and fail silently
      }
    }

    return writableMap
  }

  fun jsonArrayToWritableArray(jsonArray: JSONArray?): WritableArray? {
    val writableArray: WritableArray = WritableNativeArray()

    if (jsonArray == null) {
      return null
    }

    if (jsonArray.length() <= 0) {
      return null
    }

    for (i in 0 until jsonArray.length()) {
      try {
        val value = jsonArray[i]
        if (value == null) {
          writableArray.pushNull()
        } else if (value is Boolean) {
          writableArray.pushBoolean(value)
        } else if (value is Int) {
          writableArray.pushInt(value)
        } else if (value is Double) {
          writableArray.pushDouble(value)
        } else if (value is String) {
          writableArray.pushString(value)
        } else if (value is JSONObject) {
          writableArray.pushMap(jsonToWritableMap(value))
        } else if (value is JSONArray) {
          writableArray.pushArray(jsonArrayToWritableArray(value))
        }
      } catch (e: JSONException) {
        // Do nothing and fail silently
      }
    }

    return writableArray
  }

  companion object {
    const val NAME = "Rncustomerglu"
  }
}
