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
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
  multiply,
} from '@customerglu/react-native-customerglu';

import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [isSDKInitialized, setIsSDKInitialized] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(2); // Start with a reasonable minimum height
  const bannerRef = useRef(null);
  const [firstNumber, setFirstNumber] = useState('5');
  const [secondNumber, setSecondNumber] = useState('7');
  const [multiplyResult, setMultiplyResult] = useState<number | null>(null);

  // New state for SDK testing
  const [environment, setEnvironment] = useState('in');
  const [userId, setUserId] = useState('userid');
  const [firebaseToken, setFirebaseToken] = useState('token');
  const [apnsDeviceToken, setApnsDeviceToken] = useState('');
  const [sdkInitStatus, setSdkInitStatus] = useState('Not initialized');
  const [deviceRegStatus, setDeviceRegStatus] = useState('Not registered');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // SDK Testing Methods
  const handleInitSDK = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Initializing SDK with environment: ${environment}`);

      // Enable debugging first
      gluSDKDebuggingMode(true);

      // Initialize SDK with environment
      initCGSDK(environment);

      // Wait for SDK to initialize
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('SDK initialized successfully');
      setSdkInitStatus(`Initialized with env: ${environment}`);
      setIsSDKInitialized(true);
    } catch (error) {
      console.error('Error initializing SDK:', error);
      setSdkInitStatus('Initialization failed');
      setError(
        `Init failed: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterDevice = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isSDKInitialized) {
        console.warn('SDK not initialized yet. Initializing first...');
        await handleInitSDK();
      }

      const userData = {
        userId,
        firebaseToken,
        apnsDeviceToken,
      };

      console.log('Registering device with data:', userData);
      const result = await RegisterDevice(userData);

      console.log('Device registration result:', result);
      setDeviceRegStatus(
        result ? 'Registration successful' : 'Registration failed'
      );

      // Set current class name
      await SetCurrentClassName('HomeScreen');
    } catch (error) {
      console.error('Device registration error:', error);
      setDeviceRegStatus('Registration failed');
      setError(
        `Registration failed: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // We'll keep the original initialization for backwards compatibility,
  // but use our new manual controls for testing
  useEffect(() => {
    // Initialization moved to manual buttons

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

  const handleMultiply = async () => {
    try {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);

      if (isNaN(num1) || isNaN(num2)) {
        console.error('Please enter valid numbers');
        return;
      }

      console.log(`Multiplying ${num1} × ${num2}`);
      const result = await multiply(num1, num2);
      console.log(`Multiply result: ${result}`);
      setMultiplyResult(result);
    } catch (error) {
      console.error('Multiplication error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.sectionTitle}>CustomerGlu SDK Testing</Text>

        <View style={styles.testSection}>
          <Text style={styles.title}>SDK Initialization</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Environment:</Text>
            <TextInput
              style={styles.input}
              value={environment}
              onChangeText={setEnvironment}
              placeholder="Environment (e.g. 'in')"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleInitSDK}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Initializing...' : 'Initialize SDK'}
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.status,
              sdkInitStatus.includes('failed') ? styles.error : styles.success,
            ]}
          >
            Status: {sdkInitStatus}
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.title}>Register Device</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>User ID:</Text>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              placeholder="User ID"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Firebase Token:</Text>
            <TextInput
              style={styles.input}
              value={firebaseToken}
              onChangeText={setFirebaseToken}
              placeholder="Firebase Token"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>APNS Device Token:</Text>
            <TextInput
              style={styles.input}
              value={apnsDeviceToken}
              onChangeText={setApnsDeviceToken}
              placeholder="APNS Device Token (iOS only)"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegisterDevice}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Registering...' : 'Register Device'}
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.status,
              deviceRegStatus.includes('failed')
                ? styles.error
                : styles.success,
            ]}
          >
            Status: {deviceRegStatus}
          </Text>
        </View>

        {error && <Text style={styles.errorMessage}>{error}</Text>}

        <View style={styles.separator} />

        <Text style={styles.title}>Multiply Function Demo:</Text>
        <View style={styles.multiplyContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={firstNumber}
              onChangeText={setFirstNumber}
              keyboardType="numeric"
              placeholder="First number"
            />
            <Text style={styles.operatorText}>×</Text>
            <TextInput
              style={styles.input}
              value={secondNumber}
              onChangeText={setSecondNumber}
              keyboardType="numeric"
              placeholder="Second number"
            />
          </View>
          <Button title="Calculate" onPress={handleMultiply} />
          {multiplyResult !== null && (
            <Text style={styles.resultText}>
              Result: {firstNumber} × {secondNumber} = {multiplyResult}
            </Text>
          )}
        </View>

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

        <View style={styles.scrollContainer}>
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
    textAlign: 'center',
  },
  testSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 8,
    fontSize: 14,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginVertical: 12,
    padding: 8,
    backgroundColor: '#ffeeee',
    borderRadius: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  explanation: {
    marginVertical: 10,
  },
  multiplyContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
  },
  operatorText: {
    fontSize: 24,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
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
  originalSectionTitle: {
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
