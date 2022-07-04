import React, { useEffect } from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    NativeModules,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { SetCurrentClassNameEx } from 'react-native-rncustomerglu';
import { useIsFocused, useFocusEffect, useRoute } from "@react-navigation/native";

export default function Profile({ navigation }) {
    // const [user, setUser] = React.useState("Hello.js");

    const route = useRoute();
    useFocusEffect(
        React.useCallback(() => {
            console.log("route name", route.name);
            // SetCurrentClassNameEx(className);
        }, [navigation])
    );

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>GO TO HOME PAGE</Text>
        </TouchableOpacity>
    )
}