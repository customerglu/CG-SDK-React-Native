import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  NativeModules,
  NativeEventEmitter,
  AppState,
  type AppStateStatus,
} from 'react-native';
import {
  RegisterDevice,
  SetCurrentClassName,
  loadCampaignById,
  startSSEOnForeground,
  disconnectSSEOnBackground,
  initCGSDK,
  gluSDKDebuggingMode,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

export default function QuickstartScreen() {
  // Combined Setup: Region + User Info + SDK Init
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'me' | 'in'>('me');
  const [userId, setUserId] = useState('');
  const [writeKey, setWriteKey] = useState('83982458a3f233fd3a3a54fe5ed004c0aa213e7f');
  const [isSDKReady, setIsSDKReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [setupLogs, setSetupLogs] = useState<LogEntry[]>([]);

  // Step 2: Set Active Screen
  const [screenName, setScreenName] = useState('');
  const [isSettingScreen, setIsSettingScreen] = useState(false);
  const [screenLogs, setScreenLogs] = useState<LogEntry[]>([]);

  // Step 3: Load Campaign
  const [campaignId, setCampaignId] = useState('');
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [campaignLogs, setCampaignLogs] = useState<LogEntry[]>([]);

  // Step 4: Live Event Monitor
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [eventLogs, setEventLogs] = useState<LogEntry[]>([]);

  // Step 5: SSE Connection Status
  const [sseStatus, setSseStatus] = useState<'disconnected' | 'connected' | 'connecting'>('disconnected');
  const [sseLogs, setSseLogs] = useState<LogEntry[]>([]);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  // Set up comprehensive event listeners
  useEffect(() => {
    const listeners: any[] = [];

    // Deep link events
    listeners.push(
      eventEmitter.addListener('CUSTOMERGLU_DEEPLINK_EVENT', (event) => {
        const timestamp = new Date().toLocaleTimeString();
        setLiveEvents((prev) => [
          ...prev.slice(-9),
          { type: 'deeplink', ...event, timestamp },
        ]);
        addLog(setEventLogs, 'info', '🔗 Deep link event', event);
      })
    );

    // Universal deep link events
    listeners.push(
      eventEmitter.addListener('CG_UNI_DEEPLINK_EVENT', (event) => {
        const timestamp = new Date().toLocaleTimeString();
        setLiveEvents((prev) => [
          ...prev.slice(-9),
          { type: 'uni_deeplink', ...event, timestamp },
        ]);
        addLog(setEventLogs, 'info', '🔗 Universal deep link event', event);
      })
    );

    // Analytics events (sent TO backend, not received FROM SSE)
    listeners.push(
      eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (event) => {
        const timestamp = new Date().toLocaleTimeString();
        setLiveEvents((prev) => [
          ...prev.slice(-9),
          { type: 'analytics', ...event, timestamp },
        ]);
        addLog(setEventLogs, 'info', '📊 Analytics event (sent)', event);
      })
    );

    // Banner events
    listeners.push(
      eventEmitter.addListener('CUSTOMERGLU_BANNER_LOADED', (event) => {
        addLog(setEventLogs, 'success', '🎯 Banner loaded', event);
      })
    );

    listeners.push(
      eventEmitter.addListener('CGBANNER_FINAL_HEIGHT', (event) => {
        addLog(setEventLogs, 'info', '📏 Banner height updated', event);
      })
    );

    listeners.push(
      eventEmitter.addListener('CGEMBED_FINAL_HEIGHT', (event) => {
        addLog(setEventLogs, 'info', '📏 Embed height updated', event);
      })
    );

    // Campaign events
    listeners.push(
      eventEmitter.addListener('CG_INVALID_CAMPAIGN_ID', (event) => {
        addLog(setEventLogs, 'error', '❌ Invalid campaign ID', event);
      })
    );

    addLog(setEventLogs, 'info', '🎧 All event listeners initialized (deeplink, analytics, banner, campaign)');

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, []);

  // NOTE: SSE lifecycle management is now handled in App.tsx
  // The AppState listener in App.tsx automatically manages SSE connections

  // Combined: Initialize SDK + Register Device
  const handleCompleteSetup = async () => {
    // Validation
    if (!userId.trim()) {
      addLog(setSetupLogs, 'error', 'User ID is required');
      return;
    }
    if (!writeKey.trim()) {
      addLog(setSetupLogs, 'error', 'Write Key is required');
      return;
    }

    setIsInitializing(true);
    addLog(setSetupLogs, 'request', `Starting setup with ${selectedRegion.toUpperCase()} region for user: ${userId}`);

    try {
      // Step 1: Enable debug mode
      gluSDKDebuggingMode(true);
      addLog(setSetupLogs, 'info', 'Debug mode enabled');

      // Step 2: Initialize SDK with selected region
      initCGSDK(selectedRegion);
      addLog(setSetupLogs, 'info', `SDK initialized with ${selectedRegion.toUpperCase()} region`);

      // Step 3: Wait for SDK initialization (getAppConfig to complete)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Register device
      const userData = { userId: userId.trim(), writeKey };
      addLog(setSetupLogs, 'request', 'Registering device...');

      const result = await RegisterDevice(userData);

      if (result) {
        // Step 5: Explicitly start SSE with new user
        addLog(setSetupLogs, 'info', 'Starting SSE connection...');
        startSSEOnForeground();
        setSseStatus('connecting');

        // Set status to connected after 3 seconds (SSE typically connects within this time)
        // Will be overridden if we receive analytics events confirming connection
        setTimeout(() => {
          setSseStatus('connected');
          addLog(setSseLogs, 'success', '✅ SSE assumed connected (3s timeout)');
        }, 3000);

        setIsSDKReady(true);
        addLog(setSetupLogs, 'success', '✅ Setup complete! SSE connection initiated', {
          userId,
          region: selectedRegion,
          note: 'Watch for SSE status indicator to turn green'
        });
      } else {
        addLog(setSetupLogs, 'error', 'Registration failed', result);
      }
    } catch (error) {
      addLog(setSetupLogs, 'error', 'Setup failed', { error: String(error) });
    } finally {
      setIsInitializing(false);
    }
  };

  // Step 2: Set Active Screen
  const handleSetScreen = async () => {
    if (!screenName.trim()) {
      addLog(setScreenLogs, 'error', 'Screen name is required');
      return;
    }

    setIsSettingScreen(true);
    addLog(setScreenLogs, 'request', `Setting active screen to "${screenName}"`);

    try {
      await SetCurrentClassName(screenName);
      addLog(setScreenLogs, 'success', `Active screen set to "${screenName}"`, {
        note: 'Backend-configured entry points will now auto-render for this screen'
      });
    } catch (error) {
      addLog(setScreenLogs, 'error', 'Failed to set screen', { error: String(error) });
    } finally {
      setIsSettingScreen(false);
    }
  };

  // Step 3: Load Campaign
  const handleLoadCampaign = async () => {
    if (!campaignId.trim()) {
      addLog(setCampaignLogs, 'error', 'Campaign ID is required');
      return;
    }

    setIsLoadingCampaign(true);
    addLog(setCampaignLogs, 'request', `Loading campaign "${campaignId}"`);

    try {
      loadCampaignById(campaignId);
      addLog(setCampaignLogs, 'success', `Campaign "${campaignId}" loaded`, {
        note: 'Campaign should now be visible'
      });
    } catch (error) {
      addLog(setCampaignLogs, 'error', 'Failed to load campaign', { error: String(error) });
    } finally {
      setIsLoadingCampaign(false);
    }
  };

  const clearEvents = () => {
    setLiveEvents([]);
    addLog(setEventLogs, 'info', 'Events cleared');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quickstart Guide</Text>
      <Text style={styles.subtitle}>
        Follow these steps to get started with CustomerGlu SDK
      </Text>

      {/* Setup: Combined SDK Init + User Registration */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.stepBadge}>SETUP</Text>
          <Text style={styles.sectionTitle}>Complete Setup</Text>
          <InfoButton
            title="initCGSDK(region) + RegisterDevice(userData)"
            description="One-time setup that initializes the CustomerGlu SDK with your region and registers your device. This combined flow ensures SSE auto-starts after registration without requiring any manual intervention."
            parameters={[
              {
                name: 'region',
                type: 'string',
                description: 'Region code: "us", "me", or "in"',
                required: true
              },
              {
                name: 'userData',
                type: 'Object',
                description: 'User data object containing userId, writeKey, and optional fields',
                required: true
              }
            ]}
            returns="Promise<any>"
            codeExample={`import { initCGSDK, RegisterDevice, gluSDKDebuggingMode } from '@customerglu/react-native-customerglu';

// Step 1: Enable debug mode (optional)
gluSDKDebuggingMode(true);

// Step 2: Initialize SDK with region
initCGSDK('me');  // Middle East
// initCGSDK('us');  // United States
// initCGSDK('in');  // India

// Step 3: Wait for SDK initialization
await new Promise((resolve) => setTimeout(resolve, 2000));

// Step 4: Register device (SSE auto-starts after this)
const userData = {
  userId: 'user123',
  writeKey: 'YOUR_WRITE_KEY',
  // Optional fields:
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerMobile: '+1234567890'
};

const result = await RegisterDevice(userData);
// SSE connection automatically starts!`}
            notes={[
              'Region endpoints: us → api-us.customerglu.com, me → api-me.customerglu.com, in → api.customerglu.com',
              'WriteKey is passed INSIDE userData object (not as separate parameter)',
              'SSE auto-starts after RegisterDevice completes',
              'Only needs to be done once per app session',
              'User will remain registered across app restarts'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Provide your details to initialize the SDK and register your device
        </Text>

        {!isSDKReady && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningText}>
              ⚠️ Note: User data persists across app restarts. To test with a different userId, uninstall the app first.
            </Text>
          </View>
        )}

        <Text style={styles.label}>Region *</Text>
        <View style={styles.regionContainer}>
          <TouchableOpacity
            style={[styles.regionButton, selectedRegion === 'us' && styles.regionButtonActive]}
            onPress={() => setSelectedRegion('us')}
            disabled={isSDKReady}
          >
            <Text style={[styles.regionText, selectedRegion === 'us' && styles.regionTextActive]}>
              US
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.regionButton, selectedRegion === 'me' && styles.regionButtonActive]}
            onPress={() => setSelectedRegion('me')}
            disabled={isSDKReady}
          >
            <Text style={[styles.regionText, selectedRegion === 'me' && styles.regionTextActive]}>
              ME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.regionButton, selectedRegion === 'in' && styles.regionButtonActive]}
            onPress={() => setSelectedRegion('in')}
            disabled={isSDKReady}
          >
            <Text style={[styles.regionText, selectedRegion === 'in' && styles.regionTextActive]}>
              IN
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>User ID *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter unique user ID (e.g., user123)"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSDKReady}
        />

        <Text style={styles.label}>Write Key * (for testing different environments)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your CustomerGlu write key"
          value={writeKey}
          onChangeText={setWriteKey}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSDKReady}
        />

        {isSDKReady && (
          <View style={styles.successBadge}>
            <Text style={styles.successText}>
              ✓ Setup Complete! User: {userId} | Region: {selectedRegion.toUpperCase()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, (isInitializing || isSDKReady || !userId.trim() || !writeKey.trim()) && styles.buttonDisabled]}
          onPress={handleCompleteSetup}
          disabled={isInitializing || isSDKReady || !userId.trim() || !writeKey.trim()}
        >
          {isInitializing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isSDKReady ? 'Setup Complete' : 'Complete Setup'}
            </Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={setupLogs} />
      </View>

      {/* Step 1: Set Active Screen */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.stepBadge}>STEP 1</Text>
          <Text style={styles.sectionTitle}>Set Active Screen</Text>
          <InfoButton
            title="SetCurrentClassName(screenName)"
            description="Tell CustomerGlu which screen the user is currently viewing. The SDK will automatically fetch and display any backend-configured entry points (popups, nudges, banners) that are set to show on this screen."
            parameters={[
              {
                name: 'screenName',
                type: 'string',
                description: 'The current screen identifier (e.g., "HomeScreen", "ProfileScreen")',
                required: true
              }
            ]}
            returns="Promise<string>"
            codeExample={`import { SetCurrentClassName } from '@customerglu/react-native-customerglu';

function HomeScreen() {
  useEffect(() => {
    // Set screen name when component mounts
    SetCurrentClassName('HomeScreen');
  }, []);

  return <View>...</View>;
}`}
            notes={[
              'Call whenever user navigates to a new screen',
              'Entry points configured for this screen will auto-display',
              'PiP videos will show/hide based on allowed screens',
              'Screen name should match your dashboard configuration'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Set the current screen name to trigger auto-display of entry points
        </Text>
        <Text style={styles.label}>Screen Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter screen name (e.g., HomeScreen)"
          value={screenName}
          onChangeText={setScreenName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isSettingScreen && styles.buttonDisabled]}
          onPress={handleSetScreen}
          disabled={isSettingScreen}
        >
          {isSettingScreen ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Set Active Screen</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={screenLogs} />
      </View>

      {/* Step 2: Load Campaign */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.stepBadge}>STEP 2</Text>
          <Text style={styles.sectionTitle}>Load Campaign</Text>
          <InfoButton
            title="loadCampaignById(campaignId)"
            description="Manually load and display a specific campaign by its ID. The campaign will open in a webview with the configured layout and options from your dashboard."
            parameters={[
              {
                name: 'campaignId',
                type: 'string',
                description: 'The unique identifier of the campaign to load',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { loadCampaignById } from '@customerglu/react-native-customerglu';

// Load a specific campaign
loadCampaignById('campaign-123');

// Load campaign when user taps a button
<TouchableOpacity onPress={() => loadCampaignById('rewards-campaign')}>
  <Text>View Rewards</Text>
</TouchableOpacity>`}
            notes={[
              'Campaign ID is available in CustomerGlu dashboard',
              'Campaign opens immediately when called',
              'Triggers analytics events (CAMPAIGN_OPENED, etc.)',
              'Works independently of screen-based entry points'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Manually trigger a campaign to open
        </Text>
        <Text style={styles.label}>Campaign ID *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter campaign ID"
          value={campaignId}
          onChangeText={setCampaignId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isLoadingCampaign && styles.buttonDisabled]}
          onPress={handleLoadCampaign}
          disabled={isLoadingCampaign}
        >
          {isLoadingCampaign ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Load Campaign</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={campaignLogs} />
      </View>

      {/* Step 3: Live Event Monitor */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.stepBadge}>STEP 3</Text>
          <Text style={styles.sectionTitle}>Live Event Monitor</Text>
          <TouchableOpacity onPress={clearEvents} style={styles.clearButtonContainer}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Real-time monitoring of deep link and analytics events from campaigns
        </Text>
        {liveEvents.length === 0 ? (
          <Text style={styles.noEventsText}>
            No events yet. Interact with campaigns to see events here.
          </Text>
        ) : (
          liveEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <View style={styles.eventHeader}>
                <Text
                  style={[
                    styles.eventType,
                    event.type === 'deeplink' && styles.eventTypeDeeplink,
                    event.type === 'analytics' && styles.eventTypeAnalytics,
                  ]}
                >
                  {event.type === 'deeplink' ? 'DEEPLINK' : 'ANALYTICS'}
                </Text>
                <Text style={styles.eventTime}>{event.timestamp}</Text>
              </View>
              <Text style={styles.eventText}>
                {JSON.stringify(event, null, 2)}
              </Text>
            </View>
          ))
        )}
        <ResponseLog logs={eventLogs} />
      </View>

      {/* Step 4: SSE Connection Status */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.stepBadge}>STEP 4</Text>
          <Text style={styles.sectionTitle}>SSE Connection</Text>
          <InfoButton
            title="SSE Lifecycle Management"
            description="Server-Sent Events (SSE) connection provides real-time updates from CustomerGlu servers. The SDK automatically manages the connection based on app state - connecting when app is active and disconnecting when backgrounded to save resources."
            codeExample={`import {
  startSSEOnForeground,
  disconnectSSEOnBackground
} from '@customerglu/react-native-customerglu';
import { AppState } from 'react-native';

useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      // App foregrounded - start SSE
      startSSEOnForeground();
    } else if (nextAppState === 'background') {
      // App backgrounded - disconnect SSE
      disconnectSSEOnBackground();
    }
  });

  return () => subscription.remove();
}, []);`}
            notes={[
              'SSE enables real-time campaign delivery',
              'Auto-connects on app foreground',
              'Auto-disconnects on background to save battery',
              'Notifications received via SSE emit NOTIFICATION_LOAD events'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Connection automatically managed based on app state
        </Text>
        <View style={styles.sseStatusContainer}>
          <View
            style={[
              styles.sseStatusDot,
              sseStatus === 'connected' && styles.sseStatusConnected,
              sseStatus === 'connecting' && styles.sseStatusConnecting,
              sseStatus === 'disconnected' && styles.sseStatusDisconnected,
            ]}
          />
          <Text style={styles.sseStatusText}>
            {sseStatus === 'connected' && 'Connected'}
            {sseStatus === 'connecting' && 'Connecting...'}
            {sseStatus === 'disconnected' && 'Disconnected'}
          </Text>
        </View>
        <Text style={styles.sseNote}>
          Note: Indicator turns green 3 seconds after SSE start command (timer-based). SSE receives nudgeUrls and keep-alives from backend. Put app in background/foreground to test lifecycle management.
        </Text>
        <ResponseLog logs={sseLogs} />
      </View>

      {/* Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Steps</Text>
        <Text style={styles.description}>
          You've completed the quickstart guide! Here's what you can do next:
        </Text>
        <View style={styles.nextStepItem}>
          <Text style={styles.nextStepNumber}>1.</Text>
          <Text style={styles.nextStepText}>
            Explore the Testing tab to test specific features like widgets, notifications, and wallet
          </Text>
        </View>
        <View style={styles.nextStepItem}>
          <Text style={styles.nextStepNumber}>2.</Text>
          <Text style={styles.nextStepText}>
            Check the Advanced tab for diagnostics, PiP configuration, and analytics monitoring
          </Text>
        </View>
        <View style={styles.nextStepItem}>
          <Text style={styles.nextStepNumber}>3.</Text>
          <Text style={styles.nextStepText}>
            Configure campaigns and entry points in your CustomerGlu dashboard
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepBadge: {
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonContainer: {
    marginLeft: 'auto',
  },
  clearButton: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  noEventsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  eventItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#34C759',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '600',
  },
  eventTypeDeeplink: {
    color: '#FF9500',
  },
  eventTypeAnalytics: {
    color: '#34C759',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
  },
  eventText: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: '#333',
  },
  sseStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    marginBottom: 8,
  },
  sseStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  sseStatusConnected: {
    backgroundColor: '#34C759',
  },
  sseStatusConnecting: {
    backgroundColor: '#FF9500',
  },
  sseStatusDisconnected: {
    backgroundColor: '#8E8E93',
  },
  sseStatusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  sseNote: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  nextStepItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  nextStepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
    width: 24,
  },
  nextStepText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    flex: 1,
  },
  regionContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  regionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  regionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  regionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  regionTextActive: {
    color: '#fff',
  },
  successBadge: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  warningBadge: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
  },
});
