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
    LogBox
} from 'react-native';
import { SetCurrentClassName } from 'react-native-rncustomerglu';
import { useFocusEffect, useRoute, CommonActions } from "@react-navigation/native";
import {
    BannerWidget,
    dataClear,
    openWallet,
    gluSDKDebuggingModeEx,
    enableEntryPointsEx,
    configureLoaderColourEx,
    closeWebView,
    enableAnalytic,
    loadCampaignIdBy
} from 'react-native-rncustomerglu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

LogBox.ignoreLogs(['new NativeEventemitter()']);

const HomeScreen = ({ navigation }) => {
    const [apntoken, setApnToken] = useState("");
    const [fcmtoken, setFcmToken] = useState("");
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [finalHeight, setFinalHeight] = useState();
    const windowHeight = Dimensions.get('window').height;
    const _navigation = useNavigation();
    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            console.log('navigation change..........', route.name)
            SetCurrentClassName(route.name);


        }, [])
    );


    useEffect(() => {
        //enableEntryPointsEx(true);
        enableAnalytic(true);
        closeWebView(true)

        const { Rncustomerglu } = NativeModules;
        const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);

        const eventanalytics = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_ANALYTICS_EVENT',
            (reminder) => console.log('CUSTOMERGLU_ANALYTICS_EVENT...', reminder)
        );
        const eventdeeplink = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_DEEPLINK_EVENT',
            (reminder) => console.log('CUSTOMERGLU_DEEPLINK_EVENT...', reminder)
        );
        const eventbanner = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_BANNER_LOADED',
            (reminder) => console.log('CUSTOMERGLU_BANNER_LOADED...', reminder)
        );
        if (Platform.OS === 'ios') {
            const eventfheight = RncustomergluManagerEmitter.addListener(
                'CGBANNER_FINAL_HEIGHT',
                (reminder) =>
                    console.log('CGBANNER_FINAL_HEIGHT....', reminder["entry1"])
                // if (reminder["entry1"]) {
                //     // setFinalHeight(reminder["entry1"] * windowHeight / 100);
                // }

            );
        }

        return () => {
            eventanalytics.remove();
            eventdeeplink.remove();
            eventbanner.remove();
            if (Platform.OS === 'ios') {
                eventfheight.remove();

            }

        }


    }, []);



    const clearDataFunc = async () => {

        dataClear();
        await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(false));
        // navigation.navigate('RegisterScreen')
        // _navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'RegisterScreen' }],
        // });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "RegisterScreen" }]
            }));
        // navigation.replace('RegisterScreen');
        // navigation.goBack()
        // navigation.dispatch(StackActions.replace('RegisterScreen'))
    }

    return (
        <SafeAreaView flex={1}>
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={{ flex: 1.3, alignItems: 'center', backgroundColor: '#000', height: '35%', justifyContent: 'center', padding: 10 }}>
                    <Image
                        source={require('../assets/customerglu.jpg')}
                        style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            width: '100%',
                            height: 120,
                            resizeMode: 'contain',
                        }}
                    />
                    <TouchableOpacity onPress={() => clearDataFunc()}>
                        <Image
                            source={require('../assets/power.png')}
                            style={styles.logoutbtn}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.containerBox}
                        onPress={() => openWallet()}>
                        {/* // onPress={() => loadCampaignIdBy("1", false)}> */}
                        <Image
                            source={require('../assets/purse.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Wallet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('TestScreen')}>
                        <Image
                            source={require('../assets/quiz.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Rewards</Text>
                    </TouchableOpacity>

                </View>

                <BannerWidget
                    style={{ flex: 1, width: '100%', height: Platform.OS === 'ios' ? finalHeight : null, marginTop: 20, }}
                    bannerId="entry1"
                />


                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('ShopScreen')}>
                        <Image
                            source={require('../assets/shop.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Shop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('CartScreen')}>
                        <Image
                            source={require('../assets/trolley.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Cart</Text>
                    </TouchableOpacity>

                </View>



            </View>
        </SafeAreaView>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'center',
        padding: 10,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }

    },
    txtWallet: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,

    },
    imageStyle: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    logoutbtn: {
        tintColor: '#fff',
        justifyContent: "flex-end",
        alignContent: "flex-end",
        alignSelf: "flex-end",
        width: 40,
        height: 40,
        resizeMode: 'contain',
    }

});
