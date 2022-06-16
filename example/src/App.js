// import * as React from 'react';
// import { FlatList } from 'react-native';
// import { ScrollView } from 'react-native';

// import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
// import { registerEx, dataClearEx, webEventEx, enableAnalyticEx, loadCampaignIdByEx, openWalletEx } from 'react-native-rncustomerglu';

// export default function App() {

//   const registerUser = () => {
//     registerEx().then(setResult)
//   }
//   const opendataClearEx = () => {
//     dataClearEx()
//   }
//   const opendatawebEventEx = () => {
//     webEventEx(true)
//   }
//   const openenableAnalyticEx = () => {
//     enableAnalyticEx(true)
//   }
//   const openloadCampaignIdByEx = () => {
//     loadCampaignIdByEx("042a1048-569e-47c8-853c-33af1e325c93")
//   }
//   const openOpenWalletEx = () => {
//     openWalletEx()
//   }

//   return (
//     <View style={styles.container}>

//       <TouchableOpacity onPress={() => registerUser()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Register User</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => opendataClearEx()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Clear Data</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => opendatawebEventEx()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Web Event</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => openenableAnalyticEx()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Enable Anakytics</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => openloadCampaignIdByEx()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Load Campaign By Id</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => openOpenWalletEx()}
//         style={styles.container1}>
//         <Text style={styles.txtSt}>Open Wallet</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   box: {
//     backgroundColor: '#000',
//     width: "100%",
//     height: "30%",
//   },
//   txt1: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold'
//   },
//   viewBox: {
//     height: '70%',
//     justifyContent: 'center',
//   },
//   mainView: {
//     height: '30%',
//     margin: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   container1: {

//     elevation: 3,
//     height: "5%",
//     width: 300,
//   },
//   banner: {
//     height: "20%",
//     width: '95%',
//     backgroundColor: 'red',
//     borderRadius: 15,
//     marginHorizontal: 10

//   },
//   txtSt: {
//     fontSize: 20,
//     textAlign: 'center'
//   }

// });

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { multiply, registerEx} from 'react-native-rncustomerglu';

const Data = [
  { id: 1, name: 'Registration' },
  

]

const fun_name = ['registerUser', 'dataClear', 'sendData', 'openWallet', 'loadAllCampaign', 'loadCampaginById', 'sendEvent', 'nudgeTest', 'enableAnalyics', 'disableGluSdk', 'configureLoaderColour', 'enablePrecaching', 'gluSDKDebuggingMode', 'enableEntryPoints', 'closeWebView', 'fcmApn', 'SafeReaConfig'];

export default function App() {

  // React.useEffect(() => {
  //   multiply(3, 7).then(setResult);
  // }, []);

  var myObject = new MyClass();

  // for list
  function MyClass() {
    this.registerUser = async () => {
      console.log("registerUser");
      registerEx()
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
