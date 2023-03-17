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
import { SetCurrentClassName } from '@customerglu/react-native-customerglu';
import { useFocusEffect, useRoute, CommonActions } from "@react-navigation/native";
import {
    BannerWidget,
    EmbedBannerWidget,
    dataClear,
    openWallet,
    closeWebView,
    enableAnalytic,
    openNudge,
    loadCampaignById,
    configureDarkBackgroundColor,
    configureLightBackgroundColor,
    listenToDarkMode,
    enableDarkMode
} from '@customerglu/react-native-customerglu';
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
    const [finalHeight, setFinalHeight] = useState(0);
    const [finalEBHeight, setEBFinalHeight] = useState(0);

    const windowHeight = Dimensions.get('window').height;
    const _navigation = useNavigation();
    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            //Dashboard  MoreScreen
            console.log('navigation change..........', route.name)
            SetCurrentClassName("CGHomeScreen");



        }, [])
    );


    useEffect(() => {
        // enableAnalytic(true);
        closeWebView(true)

        //2jan2023
        // configureDarkBackgroundColor("#800000");
        // configureLightBackgroundColor("#00ff00");
        // listenToDarkMode(true);  //listenToSystemDarkLightMode
        // enableDarkMode(false);
        //end

        const { Rncustomerglu } = NativeModules;
        const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);

        const eventanalytics = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_ANALYTICS_EVENT',
            (reminder) => 
            console.log('CUSTOMERGLU_ANALYTICS_EVENT...', reminder)
        );

        const CG_UNI_DEEPLINK_EVENT = RncustomergluManagerEmitter.addListener(
            'CG_UNI_DEEPLINK_EVENT',
            (reminder) => 
            console.log('CG_UNI_DEEPLINK_EVENT...', reminder)
        );

        const eventdeeplink = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_DEEPLINK_EVENT',
            (reminder) => 
            {
                if (Platform.OS === 'ios') {
                    reminder = reminder.data
                }
                // console.log('CUSTOMERGLU_DEEPLINK_EVENT...12345',  reminder)
                if(reminder && reminder.campaignId){
                loadCampaignById(reminder.campaignId)
                }
            }
            
        );
        const eventbanner = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_BANNER_LOADED',
            (reminder) => 
            console.log('CUSTOMERGLU_BANNER_LOADED...>>>>>', reminder)
        );

        const invalidCampid = RncustomergluManagerEmitter.addListener(
            'CG_INVALID_CAMPAIGN_ID',
            (reminder) => 
            console.log('CG_INVALID_CAMPAIGN_ID...>>>>>', reminder)
        );
        let eventfheight = null,EmbedBannerHeight=null
        if (Platform.OS === 'ios') {
            eventfheight = RncustomergluManagerEmitter.addListener(
                'CGBANNER_FINAL_HEIGHT',
                (reminder) => {
                    console.log('reminder----', reminder);
                    // console.log('reminder["entry1"]....', reminder["entry1"])
                    if (reminder && reminder["entry1"]) {
                        setFinalHeight(reminder["entry1"] * windowHeight / 100);

                    }

                }

            );
            EmbedBannerHeight = RncustomergluManagerEmitter.addListener(
                'CGEMBED_FINAL_HEIGHT',
                (reminder) => {
                    console.log('reminder----', reminder);
                    // console.log('reminder["embedded1"]....', reminder["embedded1"])
                    if (reminder && reminder["embedded1"]) {
                        setEBFinalHeight(reminder["embedded1"]);
                    }

                }

            );
        }

        return () => {
            eventanalytics.remove();
            eventdeeplink.remove();
            eventbanner.remove();
            invalidCampid.remove()
            CG_UNI_DEEPLINK_EVENT.remove()
            if (Platform.OS === 'ios') {
                console.log('destroy.!!!!!!!!')
                eventfheight.remove();
                EmbedBannerHeight.remove()

            }

        }


    }, []);


const openWalletTest=()=>{
    let openWalletData = {
        nudgeConfiguration:{
             layout:'middle-default',
             opacity:'0.8',
             closeOnDeepLink:true,
             absoluteHeight:700,
             relativeHeight:0
        },
    };
    let openNudgeData = {
        nudgeConfiguration:{
            layout:'bottom-default',
             opacity:'0.8',
             url:'http://google.com',
             closeOnDeepLink:true,
             absoluteHeight:'50',
             relativeHeight:50
        },
    };

// loadCampaignById("042a1048-569e-47c8-853c-33af1e325c93",openWalletData)
    openWallet(openWalletData);
// openNudge("nudge1", openNudgeData);  // optional


}
    const clearDataFunc = async () => {

        dataClear();
        await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(false));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "RegisterScreen" }]
            }));
    }

    return (
        <SafeAreaView flex={1}>
            <ScrollView style={{ flexGrow: 1, backgroundColor: '#fff', }}>
                <View style={{ flex: 1.3, alignItems: 'center', backgroundColor: '#000', height: '35%', justifyContent: 'center', padding: 10 }}>
                    <Image
                        source={require('../assets/customerglu.jpg')}
                        style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            width: '100%',
                            height: 60,
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
                        onPress={() => openWalletTest()}>
                         {/* openNudgeTest() */}
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
                    style={{ width: '100%', height: Platform.OS === 'ios' ? finalHeight : null }}
                    bannerId="demo-quiz-banner1"
                />
                <EmbedBannerWidget
                    style={{ width: '100%', height: Platform.OS === 'ios' ? finalEBHeight : null }}
                    bannerId="embedded1"
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



            </ScrollView>
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
