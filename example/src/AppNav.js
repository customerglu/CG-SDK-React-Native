import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home'
import Profile from './Profile'
const Stack = createNativeStackNavigator();
import PushNotification from "react-native-push-notification";
import { registerEx, RegisterDevice, dataClearEx, sendDataEX, loadCampaignIdByEx, enableAnalyticEx, openWalletEx, disableGluSdkEx, configureLoaderColourEx, enablePrecachingEx, gluSDKDebuggingModeEx, enableEntryPointsEx, closeWebViewEx, isFcmApnEx, configureSafeAreaEx, SetDefaultBannerImageEx, UpdateProfileEx, DisplayCustomerGluNotificationEx, CGApplicationEx, DisplayBackGroundNotificationEx, GetRefferalIdEx, LoadAllCampaginsEx, LoadCampaginsByFilterEx, SetCurrentClassNameEx, OpenWalletWithUrlEx, configureWhiteListedDomainsEx, configureDomainCodeMsgEx } from 'react-native-rncustomerglu';

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification.data);
        DisplayCustomerGluNotificationEx(notification.data);



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

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Profile' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;