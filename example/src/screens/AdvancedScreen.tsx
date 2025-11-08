import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {
  addMarginsForPIP,
  addDelayForPIP,
  getBannerHeight,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

type AccordionSection = 'analytics' | 'pip' | 'debug' | null;

export default function AdvancedScreen() {
  const [expandedSection, setExpandedSection] = useState<AccordionSection>(null);

  // Analytics state
  const [analyticsEvents, setAnalyticsEvents] = useState<any[]>([]);
  const [sseNotifications, setSseNotifications] = useState<any[]>([]);
  const [analyticsLogs, setAnalyticsLogs] = useState<LogEntry[]>([]);

  // PiP state
  const [horizontalMargin, setHorizontalMargin] = useState('16');
  const [verticalMargin, setVerticalMargin] = useState('16');
  const [pipType, setPipType] = useState('dp');
  const [pipDelay, setPipDelay] = useState('0');
  const [marginLogs, setMarginLogs] = useState<LogEntry[]>([]);
  const [delayLogs, setDelayLogs] = useState<LogEntry[]>([]);
  const [isSettingMargins, setIsSettingMargins] = useState(false);
  const [isSettingDelay, setIsSettingDelay] = useState(false);

  // Debug state
  const [sdkVersion] = useState('4.0.0');
  const [platform] = useState(Platform.OS);
  const [osVersion] = useState(Platform.Version);
  const [bannerHeight, setBannerHeight] = useState<number | null>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [deepLinkEvents, setDeepLinkEvents] = useState<any[]>([]);
  const [bannerHeightLogs, setBannerHeightLogs] = useState<LogEntry[]>([]);
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

  const addToEventLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog((prev) => [...prev.slice(-19), `[${timestamp}] ${message}`]);
  };

  const toggleSection = (section: AccordionSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Analytics event listeners
  useEffect(() => {
    const analyticsListener = eventEmitter.addListener(
      'CUSTOMERGLU_ANALYTICS_EVENT',
      (event) => {
        console.log('Analytics event received:', event);
        setAnalyticsEvents((prev) => [...prev.slice(-9), event]);
        addLog(setAnalyticsLogs, 'info', 'Analytics event received', event);

        if (event.eventName === 'NOTIFICATION_LOAD') {
          setSseNotifications((prev) => [
            ...prev.slice(-4),
            { ...event, timestamp: new Date().toLocaleTimeString() },
          ]);
        }
      }
    );

    addLog(setAnalyticsLogs, 'info', 'Analytics listener initialized');

    return () => {
      analyticsListener.remove();
    };
  }, []);

  // Debug event listeners
  useEffect(() => {
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

    addToEventLog('Debug screen initialized');

    return () => {
      deepLinkListener.remove();
      uniDeepLinkListener.remove();
    };
  }, []);

  // PiP handlers
  const handleAddMargins = async () => {
    const horizontal = parseFloat(horizontalMargin);
    const vertical = parseFloat(verticalMargin);

    if (isNaN(horizontal) || isNaN(vertical)) {
      addLog(setMarginLogs, 'error', 'Please enter valid margin values');
      return;
    }

    setIsSettingMargins(true);

    try {
      addLog(setMarginLogs, 'request', `Setting PiP margins`, {
        horizontal,
        vertical,
        type: pipType,
      });

      addMarginsForPIP(horizontal, vertical, pipType);
      addLog(setMarginLogs, 'success', `PiP margins applied successfully`, {
        horizontal,
        vertical,
        type: pipType,
      });
    } catch (error) {
      addLog(setMarginLogs, 'error', 'Failed to set PiP margins', { error: String(error) });
    } finally {
      setIsSettingMargins(false);
    }
  };

  const handleAddDelay = async () => {
    const delay = parseInt(pipDelay, 10);

    if (isNaN(delay) || delay < 0) {
      addLog(setDelayLogs, 'error', 'Please enter a valid delay value (milliseconds)');
      return;
    }

    setIsSettingDelay(true);

    try {
      addLog(setDelayLogs, 'request', `Setting PiP delay to ${delay}ms`, { delay });

      addDelayForPIP(delay);
      addLog(setDelayLogs, 'success', `PiP delay set to ${delay}ms`);
    } catch (error) {
      addLog(setDelayLogs, 'error', 'Failed to set PiP delay', { error: String(error) });
    } finally {
      setIsSettingDelay(false);
    }
  };

  // Debug handlers
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

  const clearAnalyticsEvents = () => {
    setAnalyticsEvents([]);
    addLog(setAnalyticsLogs, 'info', 'Analytics events cleared');
  };

  const clearSSENotifications = () => {
    setSseNotifications([]);
    addLog(setAnalyticsLogs, 'info', 'SSE notifications cleared');
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
      <Text style={styles.title}>Advanced</Text>
      <Text style={styles.subtitle}>
        Diagnostics, analytics monitoring, and advanced configuration
      </Text>

      {/* Analytics & SSE Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('analytics')}
        >
          <Text style={styles.accordionTitle}>Analytics & SSE</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'analytics' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'analytics' && (
          <View style={styles.accordionContent}>
            {/* SSE Notifications */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>SSE Notifications</Text>
                <TouchableOpacity onPress={clearSSENotifications} style={styles.clearButtonContainer}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>
                Notifications received via SSE connection (NOTIFICATION_LOAD events)
              </Text>
              {sseNotifications.length === 0 ? (
                <Text style={styles.noEventsText}>No SSE notifications yet</Text>
              ) : (
                sseNotifications.map((event, index) => (
                  <View key={index} style={styles.sseNotificationItem}>
                    <View style={styles.sseNotificationHeader}>
                      <Text style={styles.sseNotificationType}>SSE Notification</Text>
                      <Text style={styles.sseNotificationTime}>{event.timestamp}</Text>
                    </View>
                    <Text style={styles.eventText}>
                      {JSON.stringify(event, null, 2)}
                    </Text>
                  </View>
                ))
              )}
            </View>

            {/* Analytics Events */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>All Analytics Events</Text>
                <TouchableOpacity onPress={clearAnalyticsEvents} style={styles.clearButtonContainer}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>
                All analytics events from campaigns and interactions
              </Text>
              {analyticsEvents.length === 0 ? (
                <Text style={styles.noEventsText}>No analytics events yet</Text>
              ) : (
                analyticsEvents.map((event, index) => (
                  <View key={index} style={styles.eventItem}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventName}>{event.eventName || 'Unknown Event'}</Text>
                      <Text style={styles.eventTime}>
                        {new Date().toLocaleTimeString()}
                      </Text>
                    </View>
                    <Text style={styles.eventText}>
                      {JSON.stringify(event, null, 2)}
                    </Text>
                  </View>
                ))
              )}
            </View>

            <ResponseLog logs={analyticsLogs} />
          </View>
        )}
      </View>

      {/* PiP Configuration Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('pip')}
        >
          <Text style={styles.accordionTitle}>PiP Configuration</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'pip' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'pip' && (
          <View style={styles.accordionContent}>
            {/* PiP Margins */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>PiP Margins</Text>
                <InfoButton
                  title="addMarginsForPIP(horizontal, vertical, type)"
                  description="Configure margins for Picture-in-Picture video positioning"
                  parameters={[
                    {
                      name: 'horizontal',
                      type: 'number',
                      description: 'Horizontal margin (distance from left/right edge)',
                      required: true
                    },
                    {
                      name: 'vertical',
                      type: 'number',
                      description: 'Vertical margin (distance from top/bottom edge)',
                      required: true
                    },
                    {
                      name: 'type',
                      type: 'string',
                      description: 'Unit type: "dp" or "px"',
                      required: true
                    }
                  ]}
                  returns="void"
                  notes={[
                    'Type "dp" = density-independent pixels (recommended)',
                    'Type "px" = absolute pixels',
                    'Controls distance from screen edges'
                  ]}
                />
              </View>
              <Text style={styles.label}>Horizontal Margin</Text>
              <TextInput
                style={styles.input}
                placeholder="16"
                value={horizontalMargin}
                onChangeText={setHorizontalMargin}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Vertical Margin</Text>
              <TextInput
                style={styles.input}
                placeholder="16"
                value={verticalMargin}
                onChangeText={setVerticalMargin}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Unit Type</Text>
              <View style={styles.unitTypeContainer}>
                <TouchableOpacity
                  style={[styles.unitTypeButton, pipType === 'dp' && styles.unitTypeButtonActive]}
                  onPress={() => setPipType('dp')}
                >
                  <Text style={[styles.unitTypeText, pipType === 'dp' && styles.unitTypeTextActive]}>
                    DP (Default)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.unitTypeButton, pipType === 'px' && styles.unitTypeButtonActive]}
                  onPress={() => setPipType('px')}
                >
                  <Text style={[styles.unitTypeText, pipType === 'px' && styles.unitTypeTextActive]}>
                    PX (Pixels)
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.button, isSettingMargins && styles.buttonDisabled]}
                onPress={handleAddMargins}
                disabled={isSettingMargins}
              >
                {isSettingMargins ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Apply Margins</Text>
                )}
              </TouchableOpacity>
              <ResponseLog logs={marginLogs} />
            </View>

            {/* PiP Delay */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>PiP Delay</Text>
                <InfoButton
                  title="addDelayForPIP(delay)"
                  description="Set delay before PiP video appears after being triggered"
                  parameters={[
                    {
                      name: 'delay',
                      type: 'number',
                      description: 'Delay in milliseconds',
                      required: true
                    }
                  ]}
                  returns="void"
                  notes={[
                    'Delay in milliseconds',
                    '0 = immediate appearance',
                    'Useful for smooth transitions'
                  ]}
                />
              </View>
              <Text style={styles.label}>Delay (milliseconds)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={pipDelay}
                onChangeText={setPipDelay}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={[styles.button, isSettingDelay && styles.buttonDisabled]}
                onPress={handleAddDelay}
                disabled={isSettingDelay}
              >
                {isSettingDelay ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Apply Delay</Text>
                )}
              </TouchableOpacity>
              <ResponseLog logs={delayLogs} />
            </View>
          </View>
        )}
      </View>

      {/* Debug Information Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('debug')}
        >
          <Text style={styles.accordionTitle}>Debug Information</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'debug' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'debug' && (
          <View style={styles.accordionContent}>
            {/* SDK Information */}
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>SDK Information</Text>
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

            {/* Banner Height Query */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Banner Height Query</Text>
                <InfoButton
                  title="getBannerHeight()"
                  description="Retrieve the current height of the last rendered banner widget"
                  returns="Promise<number>"
                  notes={[
                    'Returns height in pixels',
                    'Reflects most recently rendered banner',
                    'Works only after a banner has been rendered'
                  ]}
                />
              </View>
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

            {/* Deep Link Events */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Deep Link Events</Text>
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

            {/* Event Log */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Event Log</Text>
                <TouchableOpacity onPress={clearEventLog} style={styles.clearButtonContainer}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>
                Last 20 internal events and function calls
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
          </View>
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
  accordion: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF9500',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  accordionIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  accordionContent: {
    padding: 16,
  },
  subsection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  unitTypeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  unitTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  unitTypeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unitTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  unitTypeTextActive: {
    color: '#fff',
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
  eventName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
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
});
