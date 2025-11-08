import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  loadCampaignById,
  loadCampaignWithUrl,
  openWallet,
  isCampaignValid,
  getCampaignStatus,
  dataClear,
  sendData,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

export default function CampaignsWalletScreen() {
  // Input states
  const [campaignId, setCampaignId] = useState('');
  const [campaignUrl, setCampaignUrl] = useState('');
  const [campaignOptions, setCampaignOptions] = useState('{}');
  const [walletOptions, setWalletOptions] = useState('{}');
  const [dataFlag, setDataFlag] = useState('API');
  const [eventData, setEventData] = useState('');

  // Separate log states for each function
  const [loadByIdLogs, setLoadByIdLogs] = useState<LogEntry[]>([]);
  const [loadByUrlLogs, setLoadByUrlLogs] = useState<LogEntry[]>([]);
  const [walletLogs, setWalletLogs] = useState<LogEntry[]>([]);
  const [validationLogs, setValidationLogs] = useState<LogEntry[]>([]);
  const [statusLogs, setStatusLogs] = useState<LogEntry[]>([]);
  const [sendDataLogs, setSendDataLogs] = useState<LogEntry[]>([]);
  const [clearDataLogs, setClearDataLogs] = useState<LogEntry[]>([]);

  // Loading states
  const [isLoadingById, setIsLoadingById] = useState(false);
  const [isLoadingByUrl, setIsLoadingByUrl] = useState(false);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isGettingStatus, setIsGettingStatus] = useState(false);
  const [isSendingData, setIsSendingData] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  const handleLoadCampaignById = async () => {
    if (!campaignId.trim()) {
      addLog(setLoadByIdLogs, 'error', 'Please enter a campaign ID');
      return;
    }

    setIsLoadingById(true);

    try {
      const options = JSON.parse(campaignOptions);
      addLog(setLoadByIdLogs, 'request', `Loading campaign: ${campaignId}`, { campaignId, options });

      loadCampaignById(campaignId, options);
      addLog(setLoadByIdLogs, 'success', `Campaign loaded successfully`, { campaignId });
    } catch (error) {
      addLog(setLoadByIdLogs, 'error', 'Failed to load campaign', { error: String(error) });
    } finally {
      setIsLoadingById(false);
    }
  };

  const handleLoadCampaignWithUrl = async () => {
    if (!campaignUrl.trim()) {
      addLog(setLoadByUrlLogs, 'error', 'Please enter a campaign URL');
      return;
    }

    setIsLoadingByUrl(true);

    try {
      const options = JSON.parse(campaignOptions);
      addLog(setLoadByUrlLogs, 'request', 'Loading campaign from URL', { url: campaignUrl, options });

      loadCampaignWithUrl(campaignUrl, options);
      addLog(setLoadByUrlLogs, 'success', 'Campaign loaded from URL successfully', { url: campaignUrl });
    } catch (error) {
      addLog(setLoadByUrlLogs, 'error', 'Failed to load campaign from URL', { error: String(error) });
    } finally {
      setIsLoadingByUrl(false);
    }
  };

  const handleOpenWallet = async () => {
    setIsLoadingWallet(true);

    try {
      const options = JSON.parse(walletOptions);
      addLog(setWalletLogs, 'request', 'Opening wallet', { options });

      openWallet(options);
      addLog(setWalletLogs, 'success', 'Wallet opened successfully');
    } catch (error) {
      addLog(setWalletLogs, 'error', 'Failed to open wallet', { error: String(error) });
    } finally {
      setIsLoadingWallet(false);
    }
  };

  const handleIsCampaignValid = async () => {
    if (!campaignId.trim()) {
      addLog(setValidationLogs, 'error', 'Please enter a campaign ID');
      return;
    }

    setIsValidating(true);

    try {
      addLog(setValidationLogs, 'request', `Checking campaign validity`, { campaignId, dataFlag });

      const isValid = await isCampaignValid(campaignId, dataFlag);
      addLog(setValidationLogs, 'success', `Campaign validation result: ${isValid}`, { isValid, campaignId });
    } catch (error) {
      addLog(setValidationLogs, 'error', 'Failed to check campaign validity', { error: String(error) });
    } finally {
      setIsValidating(false);
    }
  };

  const handleGetCampaignStatus = async () => {
    if (!campaignId.trim()) {
      addLog(setStatusLogs, 'error', 'Please enter a campaign ID');
      return;
    }

    setIsGettingStatus(true);

    try {
      addLog(setStatusLogs, 'request', 'Getting campaign status', { campaignId, dataFlag });

      const status = await getCampaignStatus(campaignId, dataFlag);
      addLog(setStatusLogs, 'success', `Campaign status: ${status}`, { status, campaignId });
    } catch (error) {
      addLog(setStatusLogs, 'error', 'Failed to get campaign status', { error: String(error) });
    } finally {
      setIsGettingStatus(false);
    }
  };

  const handleDataClear = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              addLog(setClearDataLogs, 'request', 'Clearing all SDK data');
              dataClear();
              addLog(setClearDataLogs, 'success', 'All data cleared successfully');
            } catch (error) {
              addLog(setClearDataLogs, 'error', 'Failed to clear data', { error: String(error) });
            } finally {
              setIsClearing(false);
            }
          },
        },
      ]
    );
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Campaigns & Wallet</Text>
      <Text style={styles.subtitle}>
        Load campaigns, manage wallet, validate campaigns, and send events
      </Text>

      {/* 1. Load Campaign by ID */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>Load Campaign by ID</Text>
          <InfoButton
            title="loadCampaignById(campaignId, displayOptions)"
            description="Loads and displays a campaign by its unique identifier. The campaign appears as a modal with customizable layout, positioning, and behavior via the displayOptions parameter (NudgeConfiguration)."
            parameters={[
              {
                name: 'campaignId',
                type: 'string',
                description: 'Unique identifier of the campaign to load',
                required: true
              },
              {
                name: 'displayOptions',
                type: 'Object (NudgeConfiguration)',
                description: 'Display configuration: layout, opacity, closeOnDeepLink, absoluteHeight, relativeHeight, isHyperLink',
                required: false
              }
            ]}
            returns="void"
            codeExample={`import { loadCampaignById } from '@customerglu/react-native-customerglu';

// Default fullscreen display
loadCampaignById('campaign-123', {});

// Bottom sheet with 60% height
loadCampaignById('campaign-456', {
  layout: 'bottom-slider',
  relativeHeight: 0.6,
  opacity: 0.7,
  closeOnDeepLink: true
});

// Middle popup with fixed height
loadCampaignById('campaign-789', {
  layout: 'middle-popup',
  absoluteHeight: 400,
  opacity: 0.8
});`}
            notes={[
              'layout: "middle-default", "middle-popup", "bottom-default", "bottom-popup", "bottom-slider"',
              'opacity: 0-1 (background overlay darkness, default 0.5)',
              'closeOnDeepLink: auto-close when user navigates away',
              'absoluteHeight: fixed height in pixels OR relativeHeight: 0-1 percentage',
              'Empty {} uses fullscreen default'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Load and display a campaign using its campaign ID
        </Text>
        <Text style={styles.helperText}>
          Enter the campaign ID (e.g., "campaign-123")
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Campaign ID"
          value={campaignId}
          onChangeText={setCampaignId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.helperText}>
          Optional: Customize campaign display options (JSON)
        </Text>
        <TextInput
          style={styles.input}
          placeholder='{}'
          value={campaignOptions}
          onChangeText={setCampaignOptions}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.presetLabel}>Quick Presets:</Text>
        <View style={styles.presetContainer}>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setCampaignOptions('{"layout":"bottom-slider","relativeHeight":0.6,"opacity":0.7,"closeOnDeepLink":true}')}
          >
            <Text style={styles.presetButtonText}>Bottom Slider</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setCampaignOptions('{"layout":"middle-popup","absoluteHeight":400,"opacity":0.8}')}
          >
            <Text style={styles.presetButtonText}>Middle Popup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setCampaignOptions('{}')}
          >
            <Text style={styles.presetButtonText}>Fullscreen</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, isLoadingById && styles.buttonDisabled]}
          onPress={handleLoadCampaignById}
          disabled={isLoadingById}
        >
          {isLoadingById ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Load Campaign</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={loadByIdLogs} />
      </View>

      {/* 2. Load Campaign with URL */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>Load Campaign with URL</Text>
          <InfoButton
            title="loadCampaignWithUrl(url, displayOptions)"
            description="Loads and displays a campaign using a full campaign URL. Same display options as loadCampaignById - supports custom layouts, positioning, and behavior."
            parameters={[
              {
                name: 'url',
                type: 'string',
                description: 'Complete URL of the campaign to load',
                required: true
              },
              {
                name: 'displayOptions',
                type: 'Object (NudgeConfiguration)',
                description: 'Display configuration: layout, opacity, closeOnDeepLink, absoluteHeight, relativeHeight, isHyperLink',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { loadCampaignWithUrl } from '@customerglu/react-native-customerglu';

const url = 'https://api.customerglu.com/campaign/xyz';

// Bottom slider at 70% height
loadCampaignWithUrl(url, {
  layout: 'bottom-slider',
  relativeHeight: 0.7,
  opacity: 0.6,
  closeOnDeepLink: true
});`}
            notes={[
              'Same display options as loadCampaignById',
              'Useful for deep linking scenarios',
              'Options object required (use {} for defaults)'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Load and display a campaign using a complete URL
        </Text>
        <Text style={styles.helperText}>
          Enter the full campaign URL
        </Text>
        <TextInput
          style={styles.input}
          placeholder="https://api.customerglu.com/campaign/..."
          value={campaignUrl}
          onChangeText={setCampaignUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.helperText}>
          Optional: Customize campaign display options (JSON)
        </Text>
        <TextInput
          style={styles.input}
          placeholder='{"autoClose": true}'
          value={campaignOptions}
          onChangeText={setCampaignOptions}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isLoadingByUrl && styles.buttonDisabled]}
          onPress={handleLoadCampaignWithUrl}
          disabled={isLoadingByUrl}
        >
          {isLoadingByUrl ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Load Campaign from URL</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={loadByUrlLogs} />
      </View>

      {/* 3. Open Wallet */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>3.</Text>
          <Text style={styles.sectionTitle}>Open Wallet</Text>
          <InfoButton
            title="openWallet(options)"
            description="Opens the user's rewards wallet interface, displaying all earned rewards, points, and achievements. The wallet provides an overview of the user's engagement progress."
            parameters={[
              {
                name: 'options',
                type: 'Object',
                description: 'Optional configuration object for wallet display',
                required: false
              }
            ]}
            returns="void"
            codeExample={`import { openWallet } from '@customerglu/react-native-customerglu';

// Open wallet with default options
openWallet({});

// Open wallet with custom options
openWallet({
  showBalance: true,
  highlightNew: true
});`}
            notes={[
              'Displays user rewards and achievements',
              'Options object is optional (use {} for defaults)',
              'Wallet opens in a modal overlay'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Open the rewards wallet showing user points and achievements
        </Text>
        <Text style={styles.helperText}>
          Optional: Customize wallet display options (JSON)
        </Text>
        <TextInput
          style={styles.input}
          placeholder='{"showBalance": true}'
          value={walletOptions}
          onChangeText={setWalletOptions}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isLoadingWallet && styles.buttonDisabled]}
          onPress={handleOpenWallet}
          disabled={isLoadingWallet}
        >
          {isLoadingWallet ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Open Wallet</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={walletLogs} />
      </View>

      {/* 4. Campaign Validation */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>4.</Text>
          <Text style={styles.sectionTitle}>Campaign Validation</Text>
          <InfoButton
            title="isCampaignValid(campaignId, dataFlag)"
            description="Checks if a campaign is valid and available for the current user. Returns a boolean indicating whether the campaign can be displayed."
            parameters={[
              {
                name: 'campaignId',
                type: 'string',
                description: 'Unique identifier of the campaign to validate',
                required: true
              },
              {
                name: 'dataFlag',
                type: 'string',
                description: 'Data source: "API" (live check) or "CACHED" (local check)',
                required: true
              }
            ]}
            returns="Promise<boolean>"
            codeExample={`import { isCampaignValid } from '@customerglu/react-native-customerglu';

// Check if campaign is valid (live API check)
const isValid = await isCampaignValid('campaign-123', 'API');
console.log('Campaign valid:', isValid);

// Check using cached data
const isValidCached = await isCampaignValid('campaign-123', 'CACHED');`}
            notes={[
              'Use "API" for real-time validation',
              'Use "CACHED" for faster offline validation',
              'Returns true if campaign is active and available'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Check if a campaign is valid and available for the current user
        </Text>
        <Text style={styles.helperText}>
          Enter the campaign ID to validate
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Campaign ID"
          value={campaignId}
          onChangeText={setCampaignId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.helperText}>
          Data source: API (live) or CACHED (local)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="API or CACHED"
          value={dataFlag}
          onChangeText={setDataFlag}
          autoCapitalize="characters"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isValidating && styles.buttonDisabled]}
          onPress={handleIsCampaignValid}
          disabled={isValidating}
        >
          {isValidating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Is Campaign Valid?</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={validationLogs} />
      </View>

      {/* 5. Campaign Status */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>5.</Text>
          <Text style={styles.sectionTitle}>Campaign Status</Text>
          <InfoButton
            title="getCampaignStatus(campaignId, dataFlag)"
            description="Retrieves the current status of a campaign, including availability, visibility conditions, and scheduling information."
            parameters={[
              {
                name: 'campaignId',
                type: 'string',
                description: 'Unique identifier of the campaign',
                required: true
              },
              {
                name: 'dataFlag',
                type: 'string',
                description: 'Data source: "API" (live check) or "CACHED" (local check)',
                required: true
              }
            ]}
            returns="Promise<string>"
            codeExample={`import { getCampaignStatus } from '@customerglu/react-native-customerglu';

// Get campaign status from API
const status = await getCampaignStatus('campaign-123', 'API');
console.log('Status:', status);

// Get cached status
const cachedStatus = await getCampaignStatus('campaign-123', 'CACHED');`}
            notes={[
              'Returns detailed status string',
              'Use "API" for real-time status',
              'Use "CACHED" for faster response'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Get the current status of a campaign (uses same campaign ID and data flag as above)
        </Text>
        <TouchableOpacity
          style={[styles.button, isGettingStatus && styles.buttonDisabled]}
          onPress={handleGetCampaignStatus}
          disabled={isGettingStatus}
        >
          {isGettingStatus ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Get Campaign Status</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={statusLogs} />
      </View>

      {/* 6. Send Event Data */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>6.</Text>
          <Text style={styles.sectionTitle}>Send Event Data</Text>
          <InfoButton
            title="sendData(eventData)"
            description="Sends custom event data to track user actions and behaviors. This data can trigger campaigns, update user attributes, and track analytics."
            parameters={[
              {
                name: 'eventData',
                type: 'Object',
                description: 'Event data object containing event name and properties',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { sendData } from '@customerglu/react-native-customerglu';

// Send a simple event
sendData({
  event: 'product_viewed',
  product_id: '12345',
  category: 'electronics'
});

// Send event with user action
sendData({
  event: 'purchase_completed',
  amount: 99.99,
  currency: 'USD',
  items: ['item1', 'item2']
});`}
            notes={[
              'Event name should be descriptive',
              'Include relevant properties for analytics',
              'Events can trigger automated campaigns'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Send custom event data to track user actions and trigger campaigns
        </Text>
        <Text style={styles.helperText}>
          Enter event data as JSON object
        </Text>
        <TextInput
          style={styles.input}
          placeholder='{"event": "purchase", "amount": 99.99}'
          value={eventData}
          onChangeText={setEventData}
          multiline
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

      {/* 7. Clear Data */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>7.</Text>
          <Text style={styles.sectionTitle}>Clear All Data</Text>
          <InfoButton
            title="dataClear()"
            description="Clears all locally stored SDK data including cached campaigns, user preferences, and temporary data. This is useful for testing or resetting the SDK state."
            returns="void"
            codeExample={`import { dataClear } from '@customerglu/react-native-customerglu';

// Clear all SDK data
dataClear();`}
            notes={[
              'WARNING: This action cannot be undone',
              'Clears all cached data and preferences',
              'User will need to re-initialize',
              'Useful for testing and debugging'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Clear all locally stored SDK data and cache
        </Text>
        <Text style={styles.warningText}>
          ⚠️ Warning: This will clear all cached data and cannot be undone
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.dangerButton, isClearing && styles.buttonDisabled]}
          onPress={handleDataClear}
          disabled={isClearing}
        >
          {isClearing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Clear All Data</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={clearDataLogs} />
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
  warningText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 12,
    lineHeight: 20,
    fontWeight: '600',
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
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  presetLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
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
  },
  presetButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
