// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator

} from 'react-native';
import {
    RegisterDevice,
    setApnFcmToken,
    isFcmApn,
    gluSDKDebuggingMode,
    configureLoaderColour,
    initializeSDK,
    enableEntryPoints,
    SetCurrentClassName,
    allowAnonymousRegistration,
    enableAnalytic, configureLoadingScreenColor, configureStatusBarColour, configureSafeArea,
    configureDarkBackgroundColor,
    configureLightBackgroundColor,
    listenToDarkMode,
    enableDarkMode,configureLightLoaderURL,configureDarkLoaderURL,configureLightEmbedLoaderURL,configureDarkEmbedLoaderURL
} from '@customerglu/react-native-customerglu';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Platform } from 'react-native';
// getBannerHeightEx, 
// BannerWidget, 
// setApnFcmTokenEx, 
// registerEx, 
// RegisterDevice, 
// dataClearEx, 
// sendDataEX, 
// loadCampaignIdByEx, 
// enableAnalyticEx, 
// openWalletEx, 
// disableGluSdkEx, 
// configureLoaderColourEx, 
// enablePrecachingEx, 
// gluSDKDebuggingModeEx, 
// enableEntryPointsEx, 
// closeWebViewEx, 
// isFcmApnEx, 
// configureSafeAreaEx, 
// SetDefaultBannerImageEx, 
// UpdateProfileEx, 
// DisplayCustomerGluNotificationEx, 
// CGApplicationEx, 
// DisplayBackGroundNotificationEx, 
// GetRefferalIdEx, 
// LoadAllCampaginsEx, 
// LoadCampaginsByFilterEx, 
// SetCurrentClassNameEx, 
// OpenWalletWithUrlEx, 
// configureWhiteListedDomainsEx, 
// configureDomainCodeMsgEx


const RegisterScreen = ({ navigation }) => {
    const [userid, setUserId] = useState('')
    const route = useRoute();
    const [animating, setanimation] = useState(false)
    let userdataAndroid = null, userdataios = null, timer1 = null;
    useFocusEffect(
        React.useCallback(() => {
            console.log("route name", route.name, animating);
            SetCurrentClassName(route.name);

        }, [navigation])
    );

    useEffect(() => {
        requestUserPermission();
        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        //     console.log('JSON.stringify(remoteMessage)', JSON.stringify(remoteMessage.data))

        // });

        const getTokentest = async () => {
            const token = await messaging().getToken();
            console.log('token------', token)
            if (Platform.OS === 'ios') {
                isFcmApn("fcm");
                setApnFcmToken(token, token);
            }

        }

        getTokentest();
        return () => {
            // unsubscribe();
            clearTimeout(timer1)
        }
    }, []);

    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus) {
            console.log('Permission status:', authorizationStatus);
        }
    }



    const handleSubmitButton = async () => {

        const token = await messaging().getToken();
        console.log("getToken", token)
        // Send registration data in Object     
         allowAnonymousRegistration(false)
        setanimation(!animating)
        if (token) {
            console.log("userid", userid)
            userdataAndroid = {
                userId: userid,
                firebaseToken: token,
                profile:{
                    "firstName":null
                },
                customAttributes: {
                    "isTestUser": true

                }

            };
            userdataios = {
                userId: userid,
                firebaseToken: token,
                apnsDeviceToken: ""
            };
            try {
                initializeSDK()
                gluSDKDebuggingMode(true);
                enableEntryPoints(true);
                // configureLightLoaderURL("https://assets.customerglu.com/sdk-assets/embed-loader-skeleton-dark.json")
                // configureLoaderColour("#00ff00");
                 configureLoadingScreenColor("#FFFFFF");
                // configureStatusBarColour('#0000ff')

                let obj = {
                    topHeight: 100, bottomHeight: 100,
                    topSafeAreaColor: "#000034", bottomSafeAreaColor: "#FF0000"
                }
                configureSafeArea(obj);

                // enableAnalytic(true)
              //  allowAnonymousRegistration(false)
                var ok = await RegisterDevice(Platform.OS === "ios" ? userdataios : userdataAndroid);
                console.log('Register....', ok);
                if (ok == true) {
                  
                    enableDarkMode(false)
                    listenToDarkMode(true),
                    configureDarkBackgroundColor("#800000");
                    configureLightBackgroundColor("#00ff00");
                    configureDarkEmbedLoaderURL('https://assets.customerglu.com/sdk-assets/embed-loader-skeleton-light.json')
                    configureLightEmbedLoaderURL('https://assets.customerglu.com/sdk-assets/embed-loader-skeleton-dark.json')
                    configureLightLoaderURL("https://assets.customerglu.com/sdk-assets/default-loader.json")
                    // configureDarkLoaderURL("https://assets.customerglu.com/sdk-assets/default-loader.json")
                    configureDarkLoaderURL("https://assets.customerglu.com/sdk-assets/embed-loader-skeleton-dark.json")
                  
                    setUserId('');
                    setanimation(!animating)
                    await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(true));
                    navigation.replace('HomeScreen');

                    // timer1 = setTimeout(() => {
                    //     console.log("timer", 'timer1')

                    // }, 100);
                    // navigation.navigate('HomeScreen');
                } else {
                    setanimation(!animating)
                    console.log("false string", ok)
                }
            }
            catch (e) {
                console.log('e:' + e);
            }
        }
        else {
            if (!token) alert('Fcm Not Conneted!...')
            if (!userid) alert('please Enter User Id')

        }


        // call register method here
        // if (userid) {
        //     try {
        //         if (Platform.OS === 'ios') {
        //             userdataios ? RegisterDevice(userdataios) : alert('Fcm Token not found.....')
        //         } else {
        //             userdataAndroid ? RegisterDevice(userdataAndroid) : alert('Fcm Token not found.....')
        //         }
        //     }
        //     catch (e) {
        //         console.log('e:' + e);
        //     }

        //     setUserId("")


        // } else {
        //     alert('please Enter User Id')
        // }
        // // await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(true));
        // navigation.navigate('HomeScreen')
        // // Navigate to the HomeScreen   
    };

    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center', }}>
                    <Image
                        source={require('../assets/customerglu.jpg')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(id) => setUserId(id)}
                            underlineColorAndroid="#000"
                            placeholder="User Id"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            value={userid}
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
                <ActivityIndicator
                    size={'large'}
                    color={'green'}
                    animating={animating}
                />
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#000',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#000',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
        backgroundColor: '#dadae8'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
