import {
  Text,
  View,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Button,
  ScrollView,
  TextInput,
  AppState,
  KeyboardAvoidingView,
  TouchableOpacity,
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
  disconnectSSEOnBackground,
  startSSEOnForeground,
  isCampaignValid,
  getCampaignStatus,
  UpdateUserAttributes,
  dataClear,
} from '@customerglu/react-native-customerglu';

import { useEffect, useState } from 'react';

type ResultType = 'success' | 'error' | 'warning' | 'info';

interface Result {
  type: ResultType;
  message: string;
  time: string;
}

interface SDKEvent {
  type: string;
  data: any;
  time: string;
}

export default function App() {
  // Registration state
  const [userId, setUserId] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSDKReady, setIsSDKReady] = useState(false);

  // Test inputs
  const [campaignId, setCampaignId] = useState('');
  const [eventName, setEventName] = useState('test_event');
  const [screenName, setScreenName] = useState('Home');

  // Results & Event Log
  const [results, setResults] = useState<Result[]>([]);
  const [events, setEvents] = useState<SDKEvent[]>([]);

  // Banner state
  const [bannerHeight, setBannerHeight] = useState(100);

  // Helper functions
  const addResult = (type: ResultType, message: string) => {
    setResults(prev => [...prev, {
      type,
      message,
      time: new Date().toLocaleTimeString()
    }]);
  };

  const addEvent = (type: string, data: any) => {
    setEvents(prev => [...prev, {
      type,
      data,
      time: new Date().toLocaleTimeString()
    }]);
  };

  // SDK Initialization (EXACT pattern from working code)
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // STEP 1: Debug mode FIRST
        gluSDKDebuggingMode(true);

        // STEP 2: Initialize SDK
        initCGSDK('me');

        // STEP 3: Wait 1 second (PROVEN necessary)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSDKReady(true);
        addResult('success', '✅ SDK initialized and ready');
      } catch (error) {
        addResult('error', `❌ SDK init failed: ${error}`);
      }
    };

    initializeSDK();
  }, []);

  // Event Listeners Setup (EXACT pattern from working code)
  useEffect(() => {
    const customergluModule = NativeModules.Rncustomerglu;
    if (!customergluModule) {
      console.error('Could not find RnCustomerglu module');
      return;
    }

    const eventEmitter = new NativeEventEmitter(customergluModule);

    // Analytics
    const analyticsListener = eventEmitter.addListener(
      'CUSTOMERGLU_ANALYTICS_EVENT',
      (data) => {
        addEvent('ANALYTICS_EVENT', data);
      }
    );

    // Deeplinks (with iOS platform check)
    const deeplinkListener = eventEmitter.addListener(
      'CUSTOMERGLU_DEEPLINK_EVENT',
      (data) => {
        // CRITICAL: iOS wraps in data.data
        if (Platform.OS === 'ios') {
          data = data.data;
        }
        addEvent('DEEPLINK_EVENT', data);
        if (data?.campaignId) {
          loadCampaignById(data.campaignId);
        }
      }
    );

    // Banner height
    const bannerHeightListener = eventEmitter.addListener(
      'CGBANNER_FINAL_HEIGHT',
      (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        addEvent('BANNER_HEIGHT', data);
        if (data.homescreen_banner) {
          setBannerHeight(data.homescreen_banner);
        }
      }
    );

    // Banner loaded
    const bannerLoadedListener = eventEmitter.addListener(
      'CUSTOMERGLU_BANNER_LOADED',
      (data) => {
        addEvent('BANNER_LOADED', data);
      }
    );

    // Invalid campaign
    const invalidCampaignListener = eventEmitter.addListener(
      'CG_INVALID_CAMPAIGN_ID',
      (data) => {
        addEvent('INVALID_CAMPAIGN', data);
      }
    );

    return () => {
      analyticsListener.remove();
      deeplinkListener.remove();
      bannerHeightListener.remove();
      bannerLoadedListener.remove();
      invalidCampaignListener.remove();
    };
  }, []);

  // SSE Lifecycle Management (EXACT pattern)
  let currentState = AppState.currentState;

  useEffect(() => {
    if (!isRegistered) return;

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (currentState === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('🔴 App moving to background');
        disconnectSSEOnBackground();
        addEvent('SSE', { status: 'Disconnected' });
      }

      if (currentState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('🟢 App returning to foreground');
        startSSEOnForeground();
        addEvent('SSE', { status: 'Connected' });
      }

      currentState = nextAppState;
    });

    return () => subscription.remove();
  }, [isRegistered]);

  // Login Handler
  const handleLogin = async () => {
    if (!userId.trim()) {
      addResult('error', '❌ Please enter a User ID');
      return;
    }

    try {
      addResult('info', `📝 Registering ${userId}...`);

      const userData = {
        userId: userId.trim(),
        firebaseToken: '',
        apnsDeviceToken: '',
      };

      const success = await RegisterDevice(userData);

      if (success) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await SetCurrentClassName('Home');
        startSSEOnForeground();

        setIsRegistered(true);
        addResult('success', `✅ Registered as ${userId}`);
      } else {
        addResult('error', '❌ Registration failed');
      }
    } catch (error) {
      addResult('error', `❌ Error: ${error}`);
    }
  };

  // Test Functions
  const testLoadCampaign = () => {
    if (!campaignId.trim()) {
      addResult('error', '❌ Enter campaign ID first');
      return;
    }
    try {
      loadCampaignById(campaignId);
      addResult('success', `📺 Loading campaign: ${campaignId}`);
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testCampaignValid = async () => {
    if (!campaignId.trim()) {
      addResult('error', '❌ Enter campaign ID first');
      return;
    }
    try {
      addResult('info', '🔍 Checking validity...');
      const valid = await isCampaignValid(campaignId, 'API');
      addResult(
        valid ? 'success' : 'warning',
        valid ? `✅ Campaign is valid` : `⚠️ Campaign not valid`
      );
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testCampaignStatus = async () => {
    if (!campaignId.trim()) {
      addResult('error', '❌ Enter campaign ID first');
      return;
    }
    try {
      addResult('info', '🔍 Getting status...');
      const status = await getCampaignStatus(campaignId, 'API');
      addResult('info', `📊 Status: ${status}`);
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testOpenWallet = () => {
    try {
      openWallet();
      addResult('success', '💰 Opening wallet...');
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testSendEvent = () => {
    if (!eventName.trim()) {
      addResult('error', '❌ Enter event name first');
      return;
    }
    try {
      sendData({
        eventName: eventName,
        eventProperties: {
          timestamp: new Date().toISOString(),
          source: 'demo_app',
        }
      });
      addResult('success', `📊 Sent event: ${eventName}`);
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testSetScreen = async () => {
    if (!screenName.trim()) {
      addResult('error', '❌ Enter screen name first');
      return;
    }
    try {
      await SetCurrentClassName(screenName);
      addResult('success', `📱 Set screen to: ${screenName}`);
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const testUpdateAttributes = () => {
    try {
      UpdateUserAttributes({
        last_action: new Date().toISOString(),
        demo_mode: true,
      });
      addResult('success', '✅ Updated user attributes');
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  const handleLogout = () => {
    try {
      dataClear();
      disconnectSSEOnBackground();
      setIsRegistered(false);
      setUserId('');
      setCampaignId('');
      addResult('success', '👋 Logged out');
    } catch (error) {
      addResult('error', `❌ ${error}`);
    }
  };

  // Login Screen
  if (!isRegistered) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>CustomerGlu SDK Demo</Text>
          <Text style={styles.subtitle}>ME Region Testing</Text>

          <View style={styles.loginSection}>
            <Text style={styles.label}>User ID:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user ID (e.g., test-user-123)"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              editable={isSDKReady}
            />
            <TouchableOpacity
              style={[styles.primaryButton, !isSDKReady && styles.disabledButton]}
              onPress={handleLogin}
              disabled={!isSDKReady}
            >
              <Text style={styles.primaryButtonText}>
                {isSDKReady ? 'Register & Login' : 'SDK Initializing...'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>📋 Status</Text>
            <ScrollView style={styles.resultsScroll}>
              {results.slice(-10).reverse().map((r, i) => (
                <Text key={i} style={styles[r.type]}>
                  {r.time} - {r.message}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // Main Demo Screen
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SDK Demo</Text>
          <Text style={styles.subtitle}>Logged in as: {userId}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Quick Actions</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={testOpenWallet}>
            <Text style={styles.buttonText}>💰 Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={testSendEvent}>
            <Text style={styles.buttonText}>📊 Send Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campaign Testing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Campaign Testing</Text>
        <TextInput
          style={styles.input}
          placeholder="Campaign ID"
          value={campaignId}
          onChangeText={setCampaignId}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={testLoadCampaign}>
            <Text style={styles.buttonText}>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={testCampaignValid}>
            <Text style={styles.buttonText}>Valid?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={testCampaignStatus}>
            <Text style={styles.buttonText}>Status</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Analytics Testing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Analytics</Text>
        <TextInput
          style={styles.input}
          placeholder="Event name"
          value={eventName}
          onChangeText={setEventName}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={testSendEvent}>
            <Text style={styles.buttonText}>Send Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={testUpdateAttributes}>
            <Text style={styles.buttonText}>Update Attrs</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Screen name"
          value={screenName}
          onChangeText={setScreenName}
        />
        <TouchableOpacity style={styles.button} onPress={testSetScreen}>
          <Text style={styles.buttonText}>Set Screen</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Banner Demo</Text>
        <BannerWidget
          style={[styles.banner, { height: Math.max(bannerHeight, 100) }]}
          bannerId="homescreen_banner"
        />
        <Text style={styles.bannerInfo}>Height: {bannerHeight}px</Text>
      </View>

      {/* Results Log */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Results</Text>
        <ScrollView style={styles.resultsScroll}>
          {results.slice(-10).reverse().map((r, i) => (
            <Text key={i} style={styles[r.type]}>
              {r.time} - {r.message}
            </Text>
          ))}
        </ScrollView>
        {results.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setResults([])}
          >
            <Text style={styles.clearButtonText}>Clear Results</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Event Log */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Live Events</Text>
        <ScrollView style={styles.eventScroll}>
          {events.slice(-10).reverse().map((e, i) => (
            <View key={i} style={styles.eventItem}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventType}>{e.type}</Text>
                <Text style={styles.eventTime}>{e.time}</Text>
              </View>
              <Text style={styles.eventData}>
                {JSON.stringify(e.data, null, 2)}
              </Text>
            </View>
          ))}
        </ScrollView>
        {events.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setEvents([])}
          >
            <Text style={styles.clearButtonText}>Clear Events</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  loginSection: {
    marginVertical: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#495057',
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212529',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  banner: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  bannerInfo: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  resultsSection: {
    flex: 1,
    marginTop: 20,
  },
  resultsScroll: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
  eventScroll: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
  success: {
    color: '#28a745',
    fontSize: 12,
    marginBottom: 4,
  },
  error: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 4,
  },
  warning: {
    color: '#ffc107',
    fontSize: 12,
    marginBottom: 4,
  },
  info: {
    color: '#17a2b8',
    fontSize: 12,
    marginBottom: 4,
  },
  eventItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginBottom: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eventType: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#007bff',
  },
  eventTime: {
    fontSize: 10,
    color: '#6c757d',
  },
  eventData: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#495057',
  },
});
