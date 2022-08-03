import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setApnFcmToken } from 'react-native-customerglu'
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


const getFcmToken = async () => {
    try {
        const fcmTokenfcm = await messaging().getToken()
        await AsyncStorage.setItem('fcmTokenFCM', fcmTokenfcm);
        console.log("fcm token generated", fcmTokenfcm)

        // --------------------If setApnFcmTokenEx((token.token, "")) for apn is commented uncomment below line -------------

        if (Platform.OS === 'ios') {
            setApnFcmToken("", fcmTokenfcm);
        }


    } catch (error) {
        console.log("error in fcm", error)
    }
}

export const notificationListner = async () => {


    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        console.log("remoteMessage1234", remoteMessage.data.data)

        // DisplayBackGroundNotificationEx(remoteMessage.notification.data);
        PushNotification.localNotification({
            userInfo: {
                data: remoteMessage.data,
            },
            // userInfo: remoteMessage.data,
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            // data: JSON.stringify(remoteMessage.data.data),
            // title: remoteMessage.notification.title,
            // message: JSON.stringify(remoteMessage.data.data)

        });
    });




    // messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log("stringify", remoteMessage.notification);
    //     // DisplayBackGroundNotificationEx(remoteMessage.notification);
    //     // CGApplicationEx(remoteMessage.notification);
    //     console.log('notification caused App to open from background:', remoteMessage.notification);

    // });

    // messaging().getInitialNotification().then(remoteMessage => {
    //     console.log('notification from quit state', remoteMessage.notification);
    //     console.log("remote message", remoteMessage.notification)
    //     if (remoteMessage) {
    //         PushNotification.localNotification({
    //             message: remoteMessage.notification.body,
    //             title: remoteMessage.notification.title,

    //         });

    //     }

    // });

    // messaging().onMessage(remoteMessage => {
    //     PushNotification.localNotification({
    //         message: remoteMessage.notification.body,
    //         title: remoteMessage.notification.title,

    //     });

    //     // console.log("three", remoteMessage.notification.body)
    //     // DisplayBackGroundNotificationEx(remoteMessage.notification);
    //     // CGApplicationEx(remoteMessage.notification.data);
    //     console.log("forground", remoteMessage.notification)
    // })


}