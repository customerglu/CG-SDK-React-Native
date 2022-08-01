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
import { SetCurrentClassName } from 'react-native-rncustomerglu';
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function CartScreen({ navigation }) {

    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            console.log("route name", route.name);
            SetCurrentClassName(route.name);
        }, [navigation])
    );

    return (
        <View style={styles.mainContatiner}>

            <Text style={styles.HeaderTxt} >Test Screen</Text>
            <Image
                source={require('../assets/quiz.png')}
                style={styles.imageStyle}
            />
            <TouchableOpacity style={styles.touchbtn}>
                <Text style={styles.addTxt}>Add to cart</Text>
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
