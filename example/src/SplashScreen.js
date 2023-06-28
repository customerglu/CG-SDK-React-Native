// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    NativeEventEmitter,
    ScrollView,
    AppState,
    Dimensions,
    NativeModules,
    LogBox,
    Linking,
    Alert
} from 'react-native';
import { SetCurrentClassName } from '@customerglu/react-native-customerglu';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
    BannerWidget,
    dataClear,
    openWallet,
    gluSDKDebuggingMode,
    enableEntryPoints,
    configureLoadingScreenColor,
    closeWebView,
    enableAnalytic
} from '@customerglu/react-native-customerglu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Animated } from 'react-native';
LogBox.ignoreLogs(['new NativeEventemitter()']);
const SplashScreen = ({ navigation }) => {
    const appState = useRef(AppState.currentState);
    const windowHeight = Dimensions.get('window').height;
    const width = new Animated.Value(60);
    const height = new Animated.Value(60);
    const route = useRoute();

    useFocusEffect(
        React.useCallback(() => {
            // SetCurrentClassNameEx(route.name);
            
        }, [])
    );
    useEffect(() => {
        let timer1 = null;
        Animated.timing(
            width, // The animated value to drive
            {
                toValue: 200, // Animate to opacity: 1 (opaque)
                duration: 8000, // Make it take a while
                useNativeDriver: false,
            },
        ).start();

        const getRegisterResponse = async () => {
            await AsyncStorage.getItem("isRegisterScuccess").then((value) => {
                console.log("value", JSON.parse(value));
                if (JSON.parse(value)) {
                    console.log('Registered!!!!!!!!!!!!!!!')
                    gluSDKDebuggingMode(true);
                    enableEntryPoints(true);
                    configureLoadingScreenColor("#FFFFFF");
                    enableAnalytic(true)
                    timer1 = setTimeout(() => {
                        navigation.navigate('HomeScreen');
                    }, 1000);
                } else {
                    timer1 = setTimeout(() => {
                        navigation.navigate('RegisterScreen');
                    }, 8000);

                }
            })
        }
        getRegisterResponse();
        return () => {
            clearTimeout(timer1);
        };
    }, [])
    return (

        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
            <Animated.Image
                source={require('../assets/customerglu.jpg')}
                style={{
                    width: width,
                    height: height,

                }}
            />

        </View>
    );
};
export default SplashScreen;

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 5,
        height: '70%',
        justifyContent: 'center'
    }

});
