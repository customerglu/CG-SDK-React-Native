//package com.reactnativerncustomerglu;
//
//import android.app.NotificationChannel;
//import android.app.NotificationManager;
//import android.app.PendingIntent;
//import android.content.Context;
//import android.content.Intent;
//import android.os.Build;
//import android.util.Log;
//import android.widget.RemoteViews;
//
//import androidx.core.app.NotificationCompat;
//
//import com.customerglu.sdk.CustomerGlu;
//import com.google.firebase.messaging.FirebaseMessagingService;
//import com.google.firebase.messaging.RemoteMessage;
//
//import org.json.JSONObject;
//
//public class MyFirebaseMessagingService extends FirebaseMessagingService {
//public static final String TAG=MyFirebaseMessagingService.class.getSimpleName();
//  @Override
//  public void onMessageReceived(RemoteMessage message) {
//    super.onMessageReceived(message);
//    Log.d(TAG, "mesage received" + message.getData());
//    JSONObject data = null;
//    JSONObject json = new JSONObject(message.getData());
////    CustomerGlu.getInstance().displayCustomerGluNotification(this, json, R.drawable.notification, 0.5, true);
//    if (message.getNotification() != null) {
//      // Since the notification is received directly from
//      // FCM, the title and the body can be fetched
//      // directly as below.
//      showNotification(
//        message.getNotification().getTitle(),
//        message.getNotification().getBody());
//    }
//  }
//
//
//    public void showNotification(String title,
//      String message) {
//      // Pass the intent to switch to the MainActivity
//      Intent intent
//        = new Intent(this,null);
//      // Assign channel ID
//      String channel_id = "notification_channel";
//      // Here FLAG_ACTIVITY_CLEAR_TOP flag is set to clear
//      // the activities present in the activity stack,
//      // on the top of the Activity that is to be launched
//      intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//      // Pass the intent to PendingIntent to start the
//      // next Activity
//      PendingIntent pendingIntent
//        = PendingIntent.getActivity(
//        this, 0, intent,
//        PendingIntent.FLAG_ONE_SHOT);
//
//      // Create a Builder object using NotificationCompat
//      // class. This will allow control over all the flags
//      NotificationCompat.Builder builder
//        = new NotificationCompat
//        .Builder(getApplicationContext(),
//        channel_id)
//        .setSmallIcon(R.drawable.notification)
//        .setAutoCancel(true)
//        .setVibrate(new long[]{1000, 1000, 1000,
//          1000, 1000})
//        .setOnlyAlertOnce(true)
//        .setContentIntent(pendingIntent);
//
//      // A customized design for the notification can be
//      // set only for Android versions 4.1 and above. Thus
//      // condition for the same is checked here.
//
//      // Create an object of NotificationManager class to
//      // notify the
//      // user of events that happen in the background.
//      NotificationManager notificationManager
//        = (NotificationManager) getSystemService(
//        Context.NOTIFICATION_SERVICE);
//      // Check if the Android Version is greater than Oreo
//      if (Build.VERSION.SDK_INT
//        >= Build.VERSION_CODES.O) {
//        NotificationChannel notificationChannel
//          = new NotificationChannel(
//          channel_id, "web_app",
//          NotificationManager.IMPORTANCE_HIGH);
//        notificationManager.createNotificationChannel(
//          notificationChannel);
//      }
//
//      notificationManager.notify(0, builder.build());
//    }
//
//  @Override
//  public void onNewToken(String token) {
//    super.onNewToken(token);
//    Log.e("Refreshed token:",token);
//  }
//}
