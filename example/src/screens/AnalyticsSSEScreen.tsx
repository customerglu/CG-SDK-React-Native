import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  AppState,
  NativeEventEmitter,
  NativeModules,
  ActivityIndicator,
} from 'react-native';
import {
  enableAnalytic,
  startSSEOnForeground,
  disconnectSSEOnBackground,
  setSSETimeout,
  sendData,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

export default function AnalyticsSSEScreen() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [sseTimeout, setSseTimeout] = useState('30000');
  const [eventData, setEventData] = useState('');
  const [analyticsEvents, setAnalyticsEvents] = useState<any[]>([]);
  const [sseNotifications, setSseNotifications] = useState<any[]>([]);
  const [appStateValue, setAppStateValue] = useState(AppState.currentState);
  const [sseConnected, setSseConnected] = useState(false);

  // Log states
  const [analyticsLogs, setAnalyticsLogs] = useState<LogEntry[]>([]);
  const [sseLogs, setSseLogs] = useState<LogEntry[]>([]);
  const [timeoutLogs, setTimeoutLogs] = useState<LogEntry[]>([]);
  const [sendDataLogs, setSendDataLogs] = useState<LogEntry[]>([]);

  // Loading states
  const [isSettingTimeout, setIsSettingTimeout] = useState(false);
  const [isSendingData, setIsSendingData] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  useEffect(() => {
    // Listen for analytics events
    const analyticsListener = eventEmitter.addListener(
      'CUSTOMERGLU_ANALYTICS_EVENT',
      (event) => {
        console.log('Analytics event received:', event);
        setAnalyticsEvents((prev) => [...prev.slice(-9), event]);
        addLog(setAnalyticsLogs, 'info', 'Analytics event received', event);

        // Check if this is an SSE-triggered notification (NOTIFICATION_LOAD event)
        if (event.eventName === 'NOTIFICATION_LOAD') {
          setSseNotifications((prev) => [...prev.slice(-4), { ...event, timestamp: new Date().toLocaleTimeString() }]);
          addLog(setSseLogs, 'success', 'SSE notification received', event);
        }
      }
    );

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log('App state changed:', nextAppState);
      setAppStateValue(nextAppState);

      if (nextAppState === 'active') {
        startSSEOnForeground();
        setSseConnected(true);
        addLog(setSseLogs, 'success', 'SSE connected (app became active)');
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        disconnectSSEOnBackground();
        setSseConnected(false);
        addLog(setSseLogs, 'info', 'SSE disconnected (app went to background)');
      }
    });

    addLog(setAnalyticsLogs, 'info', 'Listening for analytics events');
    addLog(setSseLogs, 'info', 'AppState listener initialized');

    return () => {
      analyticsListener.remove();
      subscription.remove();
    };
  }, []);

  const handleEnableAnalytics = (value: boolean) => {
    setAnalyticsEnabled(value);
    enableAnalytic(value);
    addLog(setAnalyticsLogs, value ? 'success' : 'info', `Analytics ${value ? 'enabled' : 'disabled'}`);
  };

  const handleStartSSE = () => {
    try {
      startSSEOnForeground();
      setSseConnected(true);
      addLog(setSseLogs, 'success', 'SSE connection started manually');
    } catch (error) {
      addLog(setSseLogs, 'error', 'Failed to start SSE connection', { error: String(error) });
    }
  };

  const handleDisconnectSSE = () => {
    try {
      disconnectSSEOnBackground();
      setSseConnected(false);
      addLog(setSseLogs, 'success', 'SSE connection disconnected manually');
    } catch (error) {
      addLog(setSseLogs, 'error', 'Failed to disconnect SSE', { error: String(error) });
    }
  };

  const handleSetSSETimeout = async () => {
    const timeout = parseInt(sseTimeout, 10);
    if (isNaN(timeout) || timeout <= 0) {
      addLog(setTimeoutLogs, 'error', 'Please enter a valid timeout value in milliseconds');
      return;
    }

    setIsSettingTimeout(true);

    try {
      addLog(setTimeoutLogs, 'request', `Setting SSE timeout to ${timeout}ms`, { timeout });
      setSSETimeout(timeout);
      addLog(setTimeoutLogs, 'success', `SSE timeout set to ${timeout}ms`);
    } catch (error) {
      addLog(setTimeoutLogs, 'error', 'Failed to set SSE timeout', { error: String(error) });
    } finally {
      setIsSettingTimeout(false);
    }
  };

  const handleSendData = async () => {
    if (!eventData.trim()) {
      addLog(setSendDataLogs, 'error', 'Please enter event data');
      return;
    }

    setIsSendingData(true);

    try {
      const data = JSON.parse(eventData);
      addLog(setSendDataLogs, 'request', 'Sending event data', { data });

      sendData(data);
      addLog(setSendDataLogs, 'success', 'Event data sent successfully', { data });
    } catch (error) {
      addLog(setSendDataLogs, 'error', 'Failed to send event data', { error: String(error) });
    } finally {
      setIsSendingData(false);
    }
  };

  const fillSampleEventData = () => {
    const sampleData = {
      eventName: 'sample_event',
      properties: {
        property1: 'value1',
        property2: 123,
        timestamp: new Date().toISOString(),
      },
    };
    setEventData(JSON.stringify(sampleData, null, 2));
  };

  const clearAnalyticsEvents = () => {
    setAnalyticsEvents([]);
    addLog(setAnalyticsLogs, 'info', 'Analytics events log cleared');
  };

  const clearSSENotifications = () => {
    setSseNotifications([]);
    addLog(setSseLogs, 'info', 'SSE notifications cleared');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics & SSE</Text>
      <Text style={styles.subtitle}>
        Manage analytics tracking and real-time Server-Sent Events connection
      </Text>

      {/* 1. Connection Status */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>Connection Status</Text>
          <InfoButton
            title="SSE Connection Status"
            description="Displays the current app state and SSE (Server-Sent Events) connection status. The SSE connection is automatically managed based on app state - it connects when the app is active and disconnects when in background to conserve resources."
            notes={[
              'SSE auto-connects when app becomes active',
              'SSE auto-disconnects when app goes to background',
              'App state: active, background, or inactive',
              'Connection is managed automatically for optimal performance'
            ]}
          />
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>App State:</Text>
          <Text style={styles.statusValue}>{appStateValue}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>SSE Connected:</Text>
          <Text style={[styles.statusValue, sseConnected && styles.connectedText]}>
            {sseConnected ? 'Yes' : 'No'}
          </Text>
        </View>
        <ResponseLog logs={sseLogs} maxHeight={180} />
      </View>

      {/* 2. Analytics Controls */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <InfoButton
            title="enableAnalytic(enabled)"
            description="Enables or disables analytics event tracking in the SDK. When enabled, the SDK will emit CUSTOMERGLU_ANALYTICS_EVENT events for campaign interactions, user actions, and other trackable behaviors."
            parameters={[
              {
                name: 'enabled',
                type: 'boolean',
                description: 'true to enable analytics, false to disable',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { enableAnalytic } from '@customerglu/react-native-customerglu';

// Enable analytics tracking
enableAnalytic(true);

// Disable analytics tracking
enableAnalytic(false);`}
            notes={[
              'Analytics events track user engagement',
              'Events include campaign interactions, clicks, views',
              'Useful for debugging and understanding user behavior',
              'Can be toggled on/off at any time'
            ]}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Enable analytics event tracking</Text>
          <Switch value={analyticsEnabled} onValueChange={handleEnableAnalytics} />
        </View>
        <Text style={styles.description}>
          When enabled, analytics events will be logged below
        </Text>
        <ResponseLog logs={analyticsLogs} maxHeight={180} />
      </View>

      {/* 3. SSE Manual Controls */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>3.</Text>
          <Text style={styles.sectionTitle}>SSE Manual Control</Text>
          <InfoButton
            title="startSSEOnForeground() & disconnectSSEOnBackground()"
            description="Manually control the Server-Sent Events connection. SSE maintains a real-time connection with the server for instant updates. These functions are typically called automatically based on app state, but can be used manually if needed."
            codeExample={`import { startSSEOnForeground, disconnectSSEOnBackground } from '@customerglu/react-native-customerglu';

// Start SSE connection
startSSEOnForeground();

// Disconnect SSE
disconnectSSEOnBackground();

// Automatic management with AppState
useEffect(() => {
  const subscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      startSSEOnForeground();
    } else {
      disconnectSSEOnBackground();
    }
  });
  return () => subscription.remove();
}, []);`}
            notes={[
              'SSE provides real-time updates from server',
              'Auto-managed based on app state (recommended)',
              'Manual control available for special cases',
              'Disconnecting saves battery and bandwidth'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Manually start or stop the SSE connection (usually managed automatically)
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.halfButton]}
            onPress={handleStartSSE}
          >
            <Text style={styles.buttonText}>Start SSE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.halfButton, styles.secondaryButton]}
            onPress={handleDisconnectSSE}
          >
            <Text style={styles.buttonText}>Disconnect SSE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. SSE Timeout Configuration */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>4.</Text>
          <Text style={styles.sectionTitle}>SSE Timeout</Text>
          <InfoButton
            title="setSSETimeout(timeout)"
            description="Configures the timeout duration for SSE connections. The timeout determines how long the SDK waits for a response before considering the connection failed and attempting to reconnect."
            parameters={[
              {
                name: 'timeout',
                type: 'number',
                description: 'Timeout duration in milliseconds',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { setSSETimeout } from '@customerglu/react-native-customerglu';

// Set timeout to 30 seconds
setSSETimeout(30000);

// Set timeout to 1 minute
setSSETimeout(60000);`}
            notes={[
              'Default timeout is usually 30000ms (30 seconds)',
              'Lower values = faster failure detection',
              'Higher values = more patient connection',
              'Value is in milliseconds'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Configure how long SSE waits for responses before reconnecting
        </Text>
        <Text style={styles.helperText}>
          Enter timeout in milliseconds (e.g., 30000 for 30 seconds)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Timeout (ms)"
          value={sseTimeout}
          onChangeText={setSseTimeout}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isSettingTimeout && styles.buttonDisabled]}
          onPress={handleSetSSETimeout}
          disabled={isSettingTimeout}
        >
          {isSettingTimeout ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Set SSE Timeout</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={timeoutLogs} />
      </View>

      {/* 5. Send Event Data */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>5.</Text>
          <Text style={styles.sectionTitle}>Send Event Data</Text>
          <InfoButton
            title="sendData(eventData)"
            description="Sends custom event data to track user actions, behaviors, and interactions. Events can be used for analytics, triggering automated campaigns, and understanding user engagement patterns."
            parameters={[
              {
                name: 'eventData',
                type: 'Object',
                description: 'Event data object with eventName and properties',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { sendData } from '@customerglu/react-native-customerglu';

// Send event with properties
sendData({
  eventName: 'product_viewed',
  properties: {
    productId: '12345',
    category: 'electronics',
    price: 99.99
  }
});`}
            notes={[
              'Use descriptive event names',
              'Include relevant properties for context',
              'Events can trigger automated campaigns',
              'Data is sent asynchronously'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Send custom event data for analytics and campaign triggering
        </Text>
        <Text style={styles.helperText}>
          Enter event data as JSON with eventName and properties
        </Text>
        <TouchableOpacity style={styles.linkButton} onPress={fillSampleEventData}>
          <Text style={styles.linkButtonText}>Fill Sample Data</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textArea}
          placeholder='{"eventName": "sample_event", "properties": {...}}'
          value={eventData}
          onChangeText={setEventData}
          multiline
          numberOfLines={6}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isSendingData && styles.buttonDisabled]}
          onPress={handleSendData}
          disabled={isSendingData}
        >
          {isSendingData ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Send Event Data</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={sendDataLogs} />
      </View>

      {/* 6. SSE Notifications Monitor */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>6.</Text>
          <Text style={styles.sectionTitle}>SSE Notifications</Text>
          <InfoButton
            title="SSE-Triggered Notifications"
            description="When SSE connection receives a notification event from the server, it automatically displays the campaign and logs a NOTIFICATION_LOAD analytics event. This section shows only SSE-triggered notifications filtered from all analytics events."
            codeExample={`// SSE notifications are automatically handled by the SDK
// They appear as NOTIFICATION_LOAD analytics events

eventEmitter.addListener(
  'CUSTOMERGLU_ANALYTICS_EVENT',
  (event) => {
    if (event.eventName === 'NOTIFICATION_LOAD') {
      // This is an SSE-triggered notification
      console.log('SSE notification:', event);
    }
  }
);`}
            notes={[
              'SSE events are received in real-time when connection is active',
              'Notifications display automatically via handleInAppNotifications',
              'NOTIFICATION_LOAD events are emitted for tracking',
              'Last 5 SSE notifications shown below',
              'Enable analytics to see these events'
            ]}
          />
        </View>
        <View style={styles.logHeader}>
          <Text style={styles.description}>
            Last 5 SSE-triggered notifications (filtered from analytics)
          </Text>
          <TouchableOpacity onPress={clearSSENotifications}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        {sseNotifications.length === 0 ? (
          <Text style={styles.noEventsText}>
            No SSE notifications yet - ensure SSE is connected and analytics enabled
          </Text>
        ) : (
          <ScrollView style={styles.eventsContainer} nestedScrollEnabled>
            {sseNotifications.map((event, index) => (
              <View key={index} style={styles.sseNotificationItem}>
                <View style={styles.sseNotificationHeader}>
                  <Text style={styles.sseNotificationType}>SSE Notification</Text>
                  <Text style={styles.sseNotificationTime}>{event.timestamp}</Text>
                </View>
                <Text style={styles.eventText}>
                  {JSON.stringify(event, null, 2)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* 7. Analytics Events Log */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>7.</Text>
          <Text style={styles.sectionTitle}>All Analytics Events</Text>
          <InfoButton
            title="CUSTOMERGLU_ANALYTICS_EVENT"
            description="Native event emitted by the SDK whenever an analytics-worthy action occurs. These events provide real-time insight into user interactions with campaigns and the SDK."
            codeExample={`import { NativeEventEmitter, NativeModules } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

// Listen for analytics events
const listener = eventEmitter.addListener(
  'CUSTOMERGLU_ANALYTICS_EVENT',
  (event) => {
    console.log('Analytics:', event);
    // event contains: eventName, properties, timestamp, etc.
  }
);

// Clean up
return () => listener.remove();`}
            notes={[
              'Events are emitted in real-time',
              'Contains eventName and properties',
              'Requires analytics to be enabled',
              'Last 10 events are shown below'
            ]}
          />
        </View>
        <View style={styles.logHeader}>
          <Text style={styles.description}>Last 10 analytics events (most recent at bottom)</Text>
          <TouchableOpacity onPress={clearAnalyticsEvents}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        {analyticsEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events yet - enable analytics and interact with campaigns</Text>
        ) : (
          <ScrollView style={styles.eventsContainer} nestedScrollEnabled>
            {analyticsEvents.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventText}>
                  {JSON.stringify(event, null, 2)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
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
  sectionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
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
    lineHeight: 20,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  connectedText: {
    color: '#34C759',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#8E8E93',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  linkButtonText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Courier',
    minHeight: 100,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButton: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  eventsContainer: {
    maxHeight: 300,
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
    borderLeftColor: '#007AFF',
  },
  eventText: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: '#333',
  },
  sseNotificationItem: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#34C759',
  },
  sseNotificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sseNotificationType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },
  sseNotificationTime: {
    fontSize: 12,
    color: '#666',
  },
});
