
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { registerEx, dataClearEx, sendDataEX, openWalletEx } from 'react-native-rncustomerglu';

const Data = [
  { id: 1, name: 'Registration' },
  { id: 1, name: 'Clear Data' },
  { id: 2, name: 'Send Data' },
  { id: 3, name: 'Open Wallet' },

]

const fun_name = ['registerUser', 'dataClear', 'sendData', 'openWallet',];

export default function App() {

  var myObject = new MyClass();

  // for list
  function MyClass() {
    this.registerUser = async () => {
      console.log("registerUser");
      registerEx()
    }

    this.dataClear = async () => {
      console.log("clear data");
      dataClearEx()
    }
    this.sendData = async () => {
      console.log("sendDataEX");
      let obj = { eventName: "Order_Placed", eventProperties: ["orderValue", 1000] }
      sendDataEX(obj)
    }
    this.openWallet = async () => {
      console.log("openWallet");
      openWalletEx()
    }
  }

  const renderItem = ({ item, index }) => {
    console.log("item index", item, index);
    return (
      <TouchableOpacity onPress={() => myObject[fun_name[index]]()} style={styles.button}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}><Text style={styles.txtHed}>Home</Text></View>
      <View style={{ flex: 1, marginTop: 50, margin: 10 }}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={(props) => {
            return (<View style={{ height: 1 }} />);
          }}
        />
      </View>

    </View >
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    padding: 2,
    color: 'black',
  },
  button: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10

  },
  header: {
    backgroundColor: '#D4D4D4',
    height: 50,
  },
  txtHed: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20
  }


});
