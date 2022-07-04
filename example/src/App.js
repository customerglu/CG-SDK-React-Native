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
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {UpdateProfileExAndroid, sendEventToJs, RegisterDevice, registerEx, dataClearEx, sendDataEX, loadCampaignIdByEx, enableAnalyticEx, openWalletEx, disableGluSdkEx, configureLoaderColourEx, enablePrecachingEx, gluSDKDebuggingModeEx, enableEntryPointsEx, closeWebViewEx, isFcmApnEx, configureSafeAreaEx, SetDefaultBannerImageEx, UpdateProfileEx, DisplayCustomerGluNotificationEx, CGApplicationEx, DisplayBackGroundNotificationEx, GetRefferalIdEx, LoadAllCampaginsEx, LoadCampaginsByFilterEx, SetCurrentClassNameEx, OpenWalletWithUrlEx, configureWhiteListedDomainsEx, configureDomainCodeMsgEx } from 'react-native-rncustomerglu';
// import { sendBroadcastEvent } from '@applicaster/react-native-broadcast-manager';
import { BannerWidget } from 'react-native-rncustomerglu';
const Data = [
  { id: 0, name: 'Registration' },
  { id: 1, name: 'Clear Data' },
  { id: 2, name: 'Send Data' },
  { id: 3, name: 'Open Wallet' },
  { id: 4, name: 'Load Campaign By Id' },
  { id: 5, name: 'Enable Analytics' },
  { id: 6, name: 'DisableGluSdk' },
  { id: 7, name: 'ConfigureLoaderColour' },
  { id: 8, name: 'EnablePrecaching' },
  { id: 9, name: 'GluSDKDebuggingMode' },
  { id: 10, name: 'enableEntryPoints' },
  { id: 11, name: 'closeWebView' },
  { id: 12, name: 'FCM Apn' },
  { id: 13, name: 'SafeAreaView' },
  { id: 14, name: 'SetDefaultBannerImage' },
  { id: 15, name: 'Update Profile' },
  { id: 16, name: 'DisplayCustomerGlu Notification' },
  { id: 17, name: 'CGApplication' },
  { id: 18, name: 'DisplayBackGroundNotification' },
  { id: 19, name: 'GetRefferalId' },
  { id: 20, name: 'LoadAllCampagins' },
  { id: 21, name: 'LoadCampaginsByFilter' },
  { id: 22, name: 'SetCurrentClassName' },
  { id: 23, name: 'OpenWalletWithUrl' },
  { id: 24, name: 'configureWhiteListedDomains' },
  { id: 25, name: 'configureDomainCodeMsg' },

]
const fun_name = ['registerUser', 'dataClear', 'sendData', 'openWallet', 'loadCampaginById', 'enableAnalyics', 'disableGluSdk', 'configureLoaderColour', 'enablePrecaching', 'gluSDKDebuggingMode', 'enableEntryPoints', 'closeWebView', 'fcmApn', 'SafeReaConfig', "SetDefaultBannerImage", "UpdateProfile", 'DisplayCustomerGluNotification', 'CGApplication', 'DisplayBackGroundNotification', 'GetRefferalId', 'LoadAllCampagins', 'LoadCampaginsByFilter', 'SetCurrentClassName', 'OpenWalletWithUrl', 'configureWhiteListedDomains', 'configureDomainCodeMsg'];


export default function App() {

  useEffect(() => {
    // const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
    // this.eventListener = eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
    //   console.log(event)
    // });

  }, []);

  var myObject = new MyClass();

  // for list
  function MyClass() {
    this.registerUser = async () => {
      let userdata = { userId: 'testUser_1' };
      // registerEx()
      try {
        var ok = await RegisterDevice(userdata);
        console.log(ok)
      }
      catch (e) {
        console.log('e:' + e);
      }


    }
    this.dataClear = async () => {
      console.log("clear data");
      dataClearEx()
    }
    this.sendData = async () => {
      console.log("sendDataEX");
      let obj = { eventName: "Order_Placed", eventProperties: ["orderValue", 1000] }
      sendDataEX(obj);
    }
    this.openWallet = async () => {
      console.log("openWallet");
      openWalletEx()
    }

    this.loadCampaginById = async () => {
      console.log("loadCampaginById");
      loadCampaignIdByEx("042a1048-569e-47c8-853c-33af1e325c93")
    }

    this.enableAnalyics = async () => {
      console.log("enableAnalyics");
      // console.log("sendEventToJs", sendEventToJs);
      // const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
      // this.eventListener = eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
      //   console.log(event)
      // });
      enableAnalyticEx(true)

    }
    this.disableGluSdk = async () => {
      console.log("disableGluSdk");
      disableGluSdkEx(true)
    }
    this.configureLoaderColour = async () => {
      console.log("configureLoaderColour");
      configureLoaderColourEx("#00FF00")
    }
    this.enablePrecaching = async () => {
      console.log("enablePrecaching");
      enablePrecachingEx()
    }
    this.gluSDKDebuggingMode = async () => {
      console.log("gluSDKDebuggingMode");
      gluSDKDebuggingModeEx(true)
    }
    this.enableEntryPoints = async () => {
      console.log("enableEntryPoints");
      enableEntryPointsEx(true)
    }
    this.closeWebView = async () => {
      console.log("closeWebView");
      closeWebViewEx(true)
    }
    this.fcmApn = async () => {
      console.log("isFcmApnEx");
      isFcmApnEx("fcm")
    }
    this.SafeReaConfig = async () => {
      console.log("configureSafeAreaEx");
      let obj = {
        topHeight: 44, bottomHeight: 34,
        topSafeAreaColor: "#00FF00", bottomSafeAreaColor: "#FF0000"
      }
      // configureSafeAreaEx(10, 10, "#00FF00", "#FF0000")
      configureSafeAreaEx(obj)
    }
    this.SetDefaultBannerImage = async () => {
      console.log("SetDefaultBannerImage");
      SetDefaultBannerImageEx("https://i.picsum.photos/id/682/536/354.jpg?hmac=PDEEGFU19wF9pcW-7wD2aw_GwXLyRUwr0RtWxhVfvAg")
    }
    this.UpdateProfile = async () => {
      console.log("UpdateProfile");
      let userdata = { userId: 'testUser_1' };
      // UpdateProfileEx()
      UpdateProfileExAndroid(userdata);
    }
    this.DisplayCustomerGluNotification = async () => {
      console.log("DisplayCustomerGluNotification");
      const eventEmitter = new NativeEventEmitter(NativeModules.DisplayCustomerGluNotification);
      this.eventListener = eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
        console.log('event......', event)
      });
      DisplayCustomerGluNotificationEx()
    }
    this.CGApplication = async () => {
      console.log("CGApplication");
      CGApplicationEx()
    }
    this.DisplayBackGroundNotification = async () => {
      console.log("DisplayBackGroundNotification");
      DisplayBackGroundNotificationEx()
    }
    this.GetRefferalId = async () => {
      console.log("GetRefferalId");
      GetRefferalIdEx("https://google.com?userId=“neha”")
    }
    this.LoadAllCampagins = async () => {
      console.log("LoadAllCampagins");
      LoadAllCampaginsEx()
    }
    this.LoadCampaginsByFilter = async () => {
      console.log("LoadCampaginsByFilter");
      let obj = {
        campaignId: "f7fd0ec7-7315-44a8-b4e1-83342b09414f",
        status: "pristine",
        type: "quiz"
      }
      LoadCampaginsByFilterEx(obj)
    }
    this.SetCurrentClassName = async () => {
      console.log("SetCurrentClassName");
      SetCurrentClassNameEx("App.js")
    }
    this.OpenWalletWithUrl = async () => {
      console.log("OpenWalletWithUrl");
      OpenWalletWithUrlEx("https://google.com")
    }
    this.configureWhiteListedDomains = async () => {
      console.log("configureWhiteListedDomains");
      configureWhiteListedDomainsEx()
    }
    this.configureDomainCodeMsg = async () => {
      console.log("configureDomainCodeMsg");
      configureDomainCodeMsgEx()
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
    
      <BannerWidget
        bannerId="entry1"
      />
      <View style={{ flex: 1, marginTop: 10, margin: 10 }}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id.toString()}
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
  },
  txtHed: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20
  }


});
