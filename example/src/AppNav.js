

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
import Profile from './Profile'
import TestScreen from './TestScreen'
import CartScreen from './CartScreen'
import RegisterScreen from './RegisterScreen'
import ShopScreen from './ShopScreen'
import SplashScreen from './SplashScreen'



const Stack = createNativeStackNavigator();
// import messaging from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging"
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { DisplayCGNotification,DisplayCGBackgroundNotification } from '@customerglu/react-native-customerglu';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { requestUserPermission, notificationListner } from './NotificationServices'
import { Platform, LogBox } from 'react-native';
LogBox.ignoreAllLogs();

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function (token) {
        console.log("TOKEN:---", token.token);
        await AsyncStorage.setItem('apnTokenRegister', token.token);
    },
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION----:", notification);
        console.log('notification.foreground', notification.foreground)
        if (notification.foreground) {
            PushNotification.getChannels(function (channels) {
                console.log('getchannels gives us', channels);
            });
            console.log("Notification data123", notification.data);
            if (notification.data.glu_message_type) {
                //ios notification open from forground
                console.log('notification.124567', notification.foreground)
                DisplayCGNotification(notification.data, true,0.9)

            } else {
                console.log('notification.10230', notification.foreground)
                DisplayCGNotification(notification.data.data, true)
            }
        } else {
            //ios  notification open from Background 
            console.log("Notification data456", notification.data);
            // DisplayBackGroundNotification(notification.data, true)
            if(Platform==='android'){
                DisplayCGBackgroundNotification(notification.data, true)
            }else{
                DisplayCGNotification(notification.data, true)
            }
           

        }
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
    },
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        // process the action
    },
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
});

const App = () => {
    useEffect(() => {
        if (Platform.OS === 'ios') {
            const type = 'notification';
            PushNotificationIOS.addEventListener(type, onRemoteNotification);
            requestUserPermission();
            notificationListner();
        }

    }, [])

    const onRemoteNotification = (notification) => {
        const isClicked = notification.getData().userInteraction === 1;
        console.log("isClicked", notification.getData());
        console.log("isClicked", isClicked);
        if (isClicked) {
            console.log("isClicked", isClicked);
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
    };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'SplashScreen'}>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ title: 'SplashScreen', headerShown: false }}
                    headerBackVisible={false}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: 'RegisterScreen', headerShown: false }}
                    headerBackVisible={false}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: 'HomeScreen', headerBackVisible: false }}
                    headerBackVisible={false}
                />
                <Stack.Screen
                    name="ShopScreen"
                    component={ShopScreen}
                    options={{ title: 'ShopScreen' }}
                />
                <Stack.Screen
                    name="CartScreen"
                    component={CartScreen}
                    options={{ title: 'CartScreen' }}
                />
                <Stack.Screen
                    name="TestScreen"
                    component={TestScreen}
                    options={{ title: 'TestScreen' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

