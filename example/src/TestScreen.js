import React, { useEffect } from 'react';
import {
    StatusBar,
    Text,
    View,
    Image,
    StyleSheet,
    NativeModules,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { SetCurrentClassName, GetRefferalId } from 'react-native-rncustomerglu';
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function CartScreen({ navigation }) {

    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            console.log("route name", route.name);
            SetCurrentClassName(route.name);
        }, [navigation])
    );

    const referIdFunc = async () => {
        try {
            const eventId = await GetRefferalId(
                'https://www.google.com?klkkl=ghjh&userId=123&cftcf=4594',
            );
            console.log(`Created a new event with id ${eventId}`);
        } catch (e) {
            console.error(e);
        }




        // GetRefferalId('https://reactnative.dev/docs/native-modules-android', (referID) => { console.log("referID1234", referID) })
    }


    return (
        <View style={styles.mainContatiner}>

            <Text style={styles.HeaderTxt} >Test Screen</Text>
            <Image
                source={require('../assets/quiz.png')}
                style={styles.imageStyle}
            />
            <TouchableOpacity style={styles.touchbtn} onPress={() => referIdFunc()}>
                <Text style={styles.addTxt}>Refer Here</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContatiner: {
        flex: 1,

    },
    HeaderTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    imageStyle: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },

    touchbtn: {
        margin: 10,
        alignSelf: 'center',
        width: '50%',
        borderWidth: 0.4,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    addTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24
    }


});
