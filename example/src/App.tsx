import {
  Text,
  View,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  gluSDKDebuggingMode,
  initCGSDK,
  loadCampaignById,
  openWallet,
  RegisterDevice,
  SetCurrentClassName,
  sendData,
  BannerWidget,
} from '@customerglu/react-native-customerglu';

import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [isSDKInitialized, setIsSDKInitialized] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(2); // Start with a reasonable minimum height
  const bannerRef = useRef(null);

  // Method to update banner height based on percentage value from payload
  const updateBannerHeightFromPercentage = (data: any) => {
    // Check if the data contains homescreen_banner
    if (data && data.homescreen_banner) {
      try {
        // Convert string percentage to number
        const percentageValue = parseFloat(data.homescreen_banner);

        // Get screen height using Dimensions API
        const screenHeight = Dimensions.get('window').height;

        // Calculate height based on percentage of screen height
        const calculatedHeight = (percentageValue / 100) * screenHeight;

        // Update the banner height state with the calculated value
        // Ensure a minimum height to prevent layout issues
        const newHeight = Math.max(calculatedHeight, 50);
        console.log(
          `Updating banner height to ${newHeight}px (${percentageValue}% of screen height)`
        );
        setBannerHeight(newHeight);
      } catch (error) {
        console.error('Error updating banner height:', error);
      }
    }
  };

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Enable debugging first
        gluSDKDebuggingMode(true);

        // Initialize SDK with environment
        initCGSDK('in');

        // Wait for SDK to be ready
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Register device
        const userData = {
          userId: 'userid',
          firebaseToken: 'token',
          apnsDeviceToken: '',
        };

        try {
          const result = await RegisterDevice(userData);
          console.log('Device registration result:', result);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          SetCurrentClassName('HomeScreen');
          setIsSDKInitialized(true);
        } catch (regError) {
          console.error('Device registration error:', regError);
        }
      } catch (error) {
        console.error('Error during SDK initialization:', error);
      }
    };

    initializeSDK();

    // Set up event emitter
    console.log('Setting up event emitter...');
    // const { RnCustomerglu } = NativeModules;

    // const eventEmitter = new NativeEventEmitter(RnCustomerglu);
    // console.log('Event emitter created');

    // // Add analytics event listener
    // const eventanalytics = eventEmitter.addListener(
    //   'CUSTOMERGLU_ANALYTICS_EVENT',
    //   (data) => {
    //     console.log('Analytics event received:', data);
    //     try {
    //       if (typeof data === 'string') {
    //         data = JSON.parse(data);
    //       }
    //       console.log('Parsed analytics data:', data);
    //     } catch (e) {
    //       console.error('Error parsing analytics data:', e);
    //     }
    //   }
    // );

    // // Add banner height event listener
    // const bannerHeightListener = eventEmitter.addListener(
    //   'CGBANNER_FINAL_HEIGHT',
    //   (data) => {
    //     console.log('bannerHeight event received:', data);
    //     try {
    //       if (typeof data === 'string') {
    //         data = JSON.parse(data);
    //       }
    //       console.log('Parsed bannerHeight data:', data);

    //       // Update banner height based on percentage value
    //       updateBannerHeightFromPercentage(data);
    //     } catch (e) {
    //       console.error('Error parsing banner height data:', e);
    //     }
    //   }
    // );

    // console.log('Analytics listener added');

    // // Add deeplink event listener
    // const eventdeeplink = eventEmitter.addListener(
    //   'CUSTOMERGLU_DEEPLINK_EVENT',
    //   (data) => {
    //     console.log('Deeplink event received:', data);
    //     try {
    //       if (Platform.OS === 'ios') {
    //         data = data.data;
    //       }
    //       console.log('Processed deeplink data:', data);
    //       if (data?.campaignId) {
    //         loadCampaignById(data.campaignId);
    //       }
    //     } catch (e) {
    //       console.error('Error processing deeplink data:', e);
    //     }
    //   }
    // );
    // console.log('Deeplink listener added');

    return () => {
      console.log('Cleaning up event listeners');
      // eventanalytics.remove();
      // eventdeeplink.remove();
      // bannerHeightListener.remove();
    };
  }, []);

  const handleTestEvent = () => {
    console.log('Sending test event...');
    const testEvent = {
      eventName: 'test_event',
      eventProperties: {
        test: 'value',
        timestamp: new Date().toISOString(),
      },
    };
    console.log('Test event data:', testEvent);
    try {
      sendData(testEvent);
      console.log('Test event sent successfully');
    } catch (error) {
      console.error('Error sending test event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Banner Outside ScrollView:</Text>
      {/* <BannerWidget
              style={[styles.bannerInside, {height:bannerHeight }]}
              bannerId="homescreen_banner"
              
            /> */}
      {/* {isSDKInitialized && (
        <CGBannerView 
          style={styles.bannerOutside} 
          bannerId="homescreen_banner" 
        />
      )} */}

      <Text style={styles.title}>
        Banner Inside ScrollView (Dynamic Height):
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}
      >
        <View style={styles.scrollContent}>
          <Text style={styles.explanation}>
            This banner uses onLayout to dynamically adjust its height.
          </Text>

          {/* <View style={{ minHeight: , flexGrow:1 }}> */}
       
            {/* <BannerWidget
              style={[styles.bannerInside, { flexGrow: 1, height:bannerHeight }]}
              bannerId="homescreen_banner"
              
            /> */}
          {/* {isSDKInitialized && (
            
            )} */}
          {/* </View> */}

          <Text style={[styles.explanation, { marginTop: 20 }]}>
            Current banner height: {bannerHeight}px
          </Text>
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  explanation: {
    marginVertical: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  scrollContent: {
    padding: 10,
  },
  bannerOutside: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  bannerInside: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
