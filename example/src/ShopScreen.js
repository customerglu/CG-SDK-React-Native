// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SetCurrentClassName, sendData } from '@customerglu/react-native-customerglu';
import { useFocusEffect, useRoute } from "@react-navigation/native";

const ShopScreen = ({ navigation }) => {

    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            console.log("route name", route.name);
            SetCurrentClassName(route.name);
        }, [navigation])
    );

    const handleCompletePurchase = () => {
        let obj = { eventName: "completePurchase", eventProperties: ["orderValue", 1000] }
        sendData(obj);
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Text style={styles.HeaderTxt}>Shop Screen</Text>
            <View style={styles.topContainer}>
                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Shop</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Shop</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.topContainer}>
                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Shop</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Shop</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.topContainer}>
                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Shop</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBox}>
                    <Image
                        source={require('../assets/trolley.png')}
                        style={styles.imageStyle} />
                    <Text style={styles.txtWallet}>Cart</Text>
                    <TouchableOpacity style={styles.touchbtn} onPress={() => handleCompletePurchase()}>
                        <Text style={styles.addTxt}>Add to cart</Text>
                    </TouchableOpacity>
                </View>

            </View>



        </View>
    );
};
export default ShopScreen;

const styles = StyleSheet.create({
    HeaderTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    topContainer: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainContatiner: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 0.2,
        backgroundColor: '#fff',
        margin: 5,
        height: '70%',
        // width: '45%',
    },
    txtWallet: {
        textAlign: 'center',
        marginTop: 20,
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    touchbtn: {
        margin: 10,
        alignSelf: 'flex-end',
        width: '50%',
        borderWidth: 0.4,
        height: '15%',
        borderRadius: 25,
        backgroundColor: 'blue',
        justifyContent: 'center'
    },
    addTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12
    }


});
