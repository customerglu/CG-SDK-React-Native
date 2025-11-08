import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  DisplayCGNotification,
  DisplayCGBackgroundNotification,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

export default function NotificationsScreen() {
  const [notificationData, setNotificationData] = useState('');
  const [autoCloseWebview, setAutoCloseWebview] = useState(false);

  // Separate log states for each function
  const [cgNotificationLogs, setCgNotificationLogs] = useState<LogEntry[]>([]);
  const [backgroundNotificationLogs, setBackgroundNotificationLogs] = useState<LogEntry[]>([]);

  // Loading states
  const [isLoadingCG, setIsLoadingCG] = useState(false);
  const [isLoadingBackground, setIsLoadingBackground] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  const handleDisplayCGNotification = async () => {
    if (!notificationData.trim()) {
      addLog(setCgNotificationLogs, 'error', 'Please enter notification data');
      return;
    }

    setIsLoadingCG(true);

    try {
      const data = JSON.parse(notificationData);
      addLog(setCgNotificationLogs, 'request', 'Displaying CG notification', { data, autoCloseWebview });

      DisplayCGNotification(data, autoCloseWebview);
      addLog(setCgNotificationLogs, 'success', 'CG notification displayed successfully', { autoCloseWebview });
    } catch (error) {
      addLog(setCgNotificationLogs, 'error', 'Failed to display notification', { error: String(error) });
    } finally {
      setIsLoadingCG(false);
    }
  };

  const handleDisplayCGBackgroundNotification = async () => {
    if (!notificationData.trim()) {
      addLog(setBackgroundNotificationLogs, 'error', 'Please enter notification data');
      return;
    }

    setIsLoadingBackground(true);

    try {
      const data = JSON.parse(notificationData);
      addLog(setBackgroundNotificationLogs, 'request', 'Displaying background notification', { data, autoCloseWebview });

      DisplayCGBackgroundNotification(data, autoCloseWebview);
      addLog(setBackgroundNotificationLogs, 'success', 'Background notification displayed successfully', { autoCloseWebview });
    } catch (error) {
      addLog(setBackgroundNotificationLogs, 'error', 'Failed to display notification', { error: String(error) });
    } finally {
      setIsLoadingBackground(false);
    }
  };

  // MINIMUM required fields to prevent crashes
  const minimalNotificationData = {
    type: 'CustomerGlu',  // ⚠️ REQUIRED - app crashes without this!
    nudge_url: 'https://api.customerglu.com/campaign/reward-123',
  };

  // Full notification payload with all options
  const sampleNotificationData = {
    type: 'CustomerGlu',              // ⚠️ REQUIRED
    title: 'Special Reward!',
    body: 'You earned 100 points!',
    nudge_url: 'https://api.customerglu.com/campaign/reward-123',
    campaign_id: 'reward-campaign-1',
    nudge_id: 'nudge-001',
    glu_message_type: 'in-app',       // 'in-app' = modal, other = system notification
    page_type: 'bottom-slider',       // Layout type
    relativeHeight: '0.7',            // Height as string!
    closeOnDeepLink: 'true',          // Boolean as string!
  };

  const fillSampleData = () => {
    setNotificationData(JSON.stringify(sampleNotificationData, null, 2));
  };

  const fillMinimalData = () => {
    setNotificationData(JSON.stringify(minimalNotificationData, null, 2));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>
        Display notification campaigns manually (works without FCM/APN push setup)
      </Text>

      {/* 1. Display CG Notification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>Foreground Notification</Text>
          <InfoButton
            title="DisplayCGNotification(data, autoCloseWebview)"
            description="Processes and displays FCM notification payload when app is in FOREGROUND. Can show as system notification OR in-app modal depending on 'glu_message_type' field."
            parameters={[
              {
                name: 'data',
                type: 'Object (FCM Payload)',
                description: 'FCM notification payload with type:"CustomerGlu", title, body, nudge_url, page_type, etc.',
                required: true
              },
              {
                name: 'autoCloseWebview',
                type: 'boolean',
                description: 'Auto-close campaign webview on deep link navigation',
                required: false
              }
            ]}
            returns="void"
            codeExample={`import { DisplayCGNotification } from '@customerglu/react-native-customerglu';

const fcmPayload = {
  type: 'CustomerGlu',
  title: 'Special Reward!',
  body: 'You earned 100 points!',
  nudge_url: 'https://api.customerglu.com/campaign/xyz',
  campaign_id: 'reward-123',
  glu_message_type: 'in-app', // 'in-app' = modal, other = system notification
  page_type: 'bottom-slider',  // layout option
  relativeHeight: '0.7',        // height as string!
  closeOnDeepLink: 'true'       // boolean as string!
};

DisplayCGNotification(fcmPayload, true);`}
            notes={[
              'type:"CustomerGlu" is REQUIRED',
              'glu_message_type:"in-app" shows modal, other values show system notification',
              'page_type: "middle-default", "middle-popup", "bottom-default", "bottom-popup", "bottom-slider"',
              'Height/boolean values must be STRINGS ("0.7", "true")',
              'Originally designed for FCM push notification payloads'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Display a campaign with custom notification data (app in foreground)
        </Text>
        <Text style={styles.helperText}>
          Enter notification data as JSON object. Minimum required: type and nudge_url
        </Text>
        <View style={styles.presetContainer}>
          <TouchableOpacity style={styles.presetButton} onPress={fillMinimalData}>
            <Text style={styles.presetButtonText}>Minimal (Required Fields Only)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={fillSampleData}>
            <Text style={styles.presetButtonText}>Full Sample Data</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder='{"title": "Sample", "message": "Test", "campaignId": "123"}'
          value={notificationData}
          onChangeText={setNotificationData}
          multiline
          numberOfLines={8}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Auto-close webview after interaction</Text>
          <Switch
            value={autoCloseWebview}
            onValueChange={setAutoCloseWebview}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isLoadingCG && styles.buttonDisabled]}
          onPress={handleDisplayCGNotification}
          disabled={isLoadingCG}
        >
          {isLoadingCG ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Display Foreground Notification</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={cgNotificationLogs} />
      </View>

      {/* 2. Display CG Background Notification */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>Background Notification</Text>
          <InfoButton
            title="DisplayCGBackgroundNotification(data, autoCloseWebview)"
            description="Processes and displays FCM notification payload when user taps notification (app was in BACKGROUND). ALWAYS shows as in-app modal regardless of 'glu_message_type' field. Hardcoded opacity: 0.5."
            parameters={[
              {
                name: 'data',
                type: 'Object (FCM Payload)',
                description: 'FCM notification payload with type:"CustomerGlu", title, body, nudge_url, page_type, etc.',
                required: true
              },
              {
                name: 'autoCloseWebview',
                type: 'boolean',
                description: 'Auto-close campaign webview on deep link navigation',
                required: false
              }
            ]}
            returns="void"
            codeExample={`import { DisplayCGBackgroundNotification } from '@customerglu/react-native-customerglu';

const fcmPayload = {
  type: 'CustomerGlu',
  title: 'New Achievement!',
  body: 'You earned a badge!',
  nudge_url: 'https://api.customerglu.com/campaign/xyz',
  campaign_id: 'achievement-123',
  nudge_id: 'nudge-002',
  page_type: 'middle-popup',    // layout option
  absoluteHeight: '400',         // height as string!
  closeOnDeepLink: 'true'        // boolean as string!
};

DisplayCGBackgroundNotification(fcmPayload, true);`}
            notes={[
              'type:"CustomerGlu" is REQUIRED',
              'ALWAYS shows as in-app modal (ignores glu_message_type)',
              'Uses hardcoded opacity: 0.5',
              'page_type: "middle-default", "middle-popup", "bottom-default", "bottom-popup", "bottom-slider"',
              'Height/boolean values must be STRINGS ("400", "true")',
              'Sends PUSH_NOTIFICATION_CLICK analytics event'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Display a campaign with custom notification data (app in background)
        </Text>
        <Text style={styles.helperText}>
          Enter notification data as JSON object. Same format as foreground notifications.
        </Text>
        <View style={styles.presetContainer}>
          <TouchableOpacity style={styles.presetButton} onPress={fillMinimalData}>
            <Text style={styles.presetButtonText}>Minimal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={fillSampleData}>
            <Text style={styles.presetButtonText}>Full Sample</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder='{"title": "Sample", "message": "Test", "campaignId": "123"}'
          value={notificationData}
          onChangeText={setNotificationData}
          multiline
          numberOfLines={8}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Auto-close webview after interaction</Text>
          <Switch
            value={autoCloseWebview}
            onValueChange={setAutoCloseWebview}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isLoadingBackground && styles.buttonDisabled]}
          onPress={handleDisplayCGBackgroundNotification}
          disabled={isLoadingBackground}
        >
          {isLoadingBackground ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Display Background Notification</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={backgroundNotificationLogs} />
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
  helperText: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Courier',
    minHeight: 120,
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
  linkButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  linkButtonText: {
    color: '#007AFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  presetButton: {
    backgroundColor: '#E5E5EA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  presetButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
