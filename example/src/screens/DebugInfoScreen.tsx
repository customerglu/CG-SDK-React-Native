import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  NativeModules,
  NativeEventEmitter,
  ActivityIndicator,
} from 'react-native';
import { getBannerHeight } from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

export default function DebugInfoScreen() {
  const [sdkVersion] = useState('4.0.0');
  const [platform] = useState(Platform.OS);
  const [osVersion] = useState(Platform.Version);
  const [bannerHeight, setBannerHeight] = useState<number | null>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [deepLinkEvents, setDeepLinkEvents] = useState<any[]>([]);

  // Log states
  const [bannerHeightLogs, setBannerHeightLogs] = useState<LogEntry[]>([]);

  // Loading state
  const [isGettingHeight, setIsGettingHeight] = useState(false);

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
    // Listen for deep link events
    const deepLinkListener = eventEmitter.addListener(
      'CUSTOMERGLU_DEEPLINK_EVENT',
      (event) => {
        const timestamp = new Date().toLocaleTimeString();
        setDeepLinkEvents((prev) => [
          ...prev.slice(-4),
          { ...event, timestamp },
        ]);
        addToEventLog(`Deep Link: ${JSON.stringify(event)}`);
      }
    );

    // Listen for universal deep link events
    const uniDeepLinkListener = eventEmitter.addListener(
      'CG_UNI_DEEPLINK_EVENT',
      (event) => {
        const timestamp = new Date().toLocaleTimeString();
        setDeepLinkEvents((prev) => [
          ...prev.slice(-4),
          { ...event, timestamp, type: 'universal' },
        ]);
        addToEventLog(`Universal Deep Link: ${JSON.stringify(event)}`);
      }
    );

    // Listen for invalid campaign events
    const invalidCampaignListener = eventEmitter.addListener(
      'CG_INVALID_CAMPAIGN_ID',
      (event) => {
        addToEventLog(`Invalid Campaign: ${JSON.stringify(event)}`);
        Alert.alert('Invalid Campaign', 'The campaign ID is invalid or unavailable');
      }
    );

    addToEventLog('Debug screen initialized');

    return () => {
      deepLinkListener.remove();
      uniDeepLinkListener.remove();
      invalidCampaignListener.remove();
    };
  }, []);

  const addToEventLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((prev) => [...prev.slice(-19), `[${timestamp}] ${message}`]);
  };

  const handleGetBannerHeight = async () => {
    setIsGettingHeight(true);
    addLog(setBannerHeightLogs, 'request', 'Retrieving banner height from native module');

    try {
      const height = await getBannerHeight();
      setBannerHeight(height);
      addToEventLog(`Banner height retrieved: ${height}`);
      addLog(setBannerHeightLogs, 'success', `Banner height retrieved: ${height}px`, { height });
    } catch (error) {
      addToEventLog(`Error getting banner height: ${error}`);
      addLog(setBannerHeightLogs, 'error', 'Failed to retrieve banner height', { error: String(error) });
    } finally {
      setIsGettingHeight(false);
    }
  };

  const clearEventLog = () => {
    setEventLog([]);
    addToEventLog('Event log cleared');
  };

  const clearDeepLinks = () => {
    setDeepLinkEvents([]);
    addToEventLog('Deep link events cleared');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Debug Information</Text>
      <Text style={styles.subtitle}>
        SDK version info, native module details, event monitoring, and debugging tools
      </Text>

      {/* 1. SDK Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>SDK Information</Text>
        </View>
        <Text style={styles.description}>
          Current SDK version and platform details
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>SDK Version:</Text>
          <Text style={styles.infoValue}>{sdkVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform:</Text>
          <Text style={styles.infoValue}>{platform}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>OS Version:</Text>
          <Text style={styles.infoValue}>{osVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>React Native:</Text>
          <Text style={styles.infoValue}>0.78.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Architecture:</Text>
          <Text style={styles.infoValue}>New Architecture (Turbo Modules)</Text>
        </View>
      </View>

      {/* 2. Banner Height */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>Banner Height Query</Text>
          <InfoButton
            title="getBannerHeight()"
            description="Retrieves the current height of the last rendered banner widget from the native module. This is useful for debugging banner layout issues and understanding how banner widgets are sized."
            returns="Promise<number> - The banner height in pixels"
            codeExample={`import { getBannerHeight } from '@customerglu/react-native-customerglu';

// Get current banner height
const height = await getBannerHeight();
console.log(\`Banner height: \${height}px\`);`}
            notes={[
              'Returns height in pixels',
              'Height reflects the most recently rendered banner',
              'Useful for debugging layout issues',
              'Works only after a banner has been rendered'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Query the native module for the current banner widget height
        </Text>
        <TouchableOpacity
          style={[styles.button, isGettingHeight && styles.buttonDisabled]}
          onPress={handleGetBannerHeight}
          disabled={isGettingHeight}
        >
          {isGettingHeight ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Get Banner Height</Text>
          )}
        </TouchableOpacity>
        {bannerHeight !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              Current Banner Height: {bannerHeight}px
            </Text>
          </View>
        )}
        <ResponseLog logs={bannerHeightLogs} />
      </View>

      {/* 3. Deep Link Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>3.</Text>
          <Text style={styles.sectionTitle}>Deep Link Events Monitor</Text>
          <TouchableOpacity onPress={clearDeepLinks} style={styles.clearButtonContainer}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Real-time monitoring of CUSTOMERGLU_DEEPLINK_EVENT and CG_UNI_DEEPLINK_EVENT
        </Text>
        {deepLinkEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No deep link events yet</Text>
        ) : (
          deepLinkEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventType}>
                  {event.type === 'universal' ? 'Universal' : 'Standard'}
                </Text>
                <Text style={styles.eventTime}>{event.timestamp}</Text>
              </View>
              <Text style={styles.eventText}>
                {JSON.stringify(event, null, 2)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* 4. Event Log */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>4.</Text>
          <Text style={styles.sectionTitle}>Event Log</Text>
          <TouchableOpacity onPress={clearEventLog} style={styles.clearButtonContainer}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Last 20 internal events and function calls (all events logged here)
        </Text>
        <ScrollView style={styles.logContainer} nestedScrollEnabled>
          {eventLog.length === 0 ? (
            <Text style={styles.noEventsText}>No events yet</Text>
          ) : (
            eventLog.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </ScrollView>
      </View>

      {/* 5. Native Module Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>5.</Text>
          <Text style={styles.sectionTitle}>Native Module Details</Text>
        </View>
        <Text style={styles.description}>
          Information about the native TurboModule implementation
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Module Name:</Text>
          <Text style={styles.infoValue}>Rncustomerglu</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Module Type:</Text>
          <Text style={styles.infoValue}>TurboModule</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Event Emitter:</Text>
          <Text style={styles.infoValue}>
            {NativeModules.Rncustomerglu ? 'Available' : 'Not Available'}
          </Text>
        </View>
      </View>

      {/* 6. Features */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>6.</Text>
          <Text style={styles.sectionTitle}>SDK Features</Text>
        </View>
        <Text style={styles.description}>
          Complete list of features available in this SDK version
        </Text>
        <Text style={styles.featureItem}>✓ Campaign Management</Text>
        <Text style={styles.featureItem}>✓ Wallet Integration</Text>
        <Text style={styles.featureItem}>✓ Analytics Events</Text>
        <Text style={styles.featureItem}>✓ SSE (Server-Sent Events)</Text>
        <Text style={styles.featureItem}>✓ Deep Link Handling</Text>
        <Text style={styles.featureItem}>✓ Push Notifications</Text>
        <Text style={styles.featureItem}>✓ Banner Widgets</Text>
        <Text style={styles.featureItem}>✓ Embed Widgets</Text>
        <Text style={styles.featureItem}>✓ PiP Video Support</Text>
        <Text style={styles.featureItem}>✓ Multi-Region Support (US, ME, IN)</Text>
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
    marginBottom: 12,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 4,
    marginTop: 12,
  },
  resultText: {
    fontSize: 15,
    color: '#2E7D32',
    fontWeight: '600',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clearButtonContainer: {
    marginLeft: 'auto',
  },
  clearButton: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  logContainer: {
    maxHeight: 200,
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 4,
  },
  logText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#333',
    marginBottom: 4,
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
    color: '#34C759',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
  },
  eventText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#333',
  },
  featureItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
});
