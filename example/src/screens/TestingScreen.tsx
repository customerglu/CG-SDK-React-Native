import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Switch,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {
  loadCampaignById,
  DisplayCGNotification,
  DisplayCGBackgroundNotification,
  openWallet,
  BannerWidget,
  EmbedBannerWidget,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

type AccordionSection = 'campaigns' | 'widgets' | 'notifications' | 'wallet' | null;

export default function TestingScreen() {
  const [expandedSection, setExpandedSection] = useState<AccordionSection>(null);

  // Campaigns state
  const [campaignId, setCampaignId] = useState('');
  const [presentationOptions, setPresentationOptions] = useState('{}');
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [campaignLogs, setCampaignLogs] = useState<LogEntry[]>([]);

  // Widgets state
  const [bannerId, setBannerId] = useState('');
  const [embedId, setEmbedId] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(200);
  const [embedHeight, setEmbedHeight] = useState(300);
  const [bannerLogs, setBannerLogs] = useState<LogEntry[]>([]);
  const [embedLogs, setEmbedLogs] = useState<LogEntry[]>([]);

  // Notifications state
  const [notificationData, setNotificationData] = useState('');
  const [autoCloseWebview, setAutoCloseWebview] = useState(false);
  const [cgNotificationLogs, setCgNotificationLogs] = useState<LogEntry[]>([]);
  const [backgroundNotificationLogs, setBackgroundNotificationLogs] = useState<LogEntry[]>([]);
  const [isLoadingCG, setIsLoadingCG] = useState(false);
  const [isLoadingBackground, setIsLoadingBackground] = useState(false);

  // Wallet state
  const [walletLogs, setWalletLogs] = useState<LogEntry[]>([]);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  const toggleSection = (section: AccordionSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Widget event listeners
  useEffect(() => {
    const bannerHeightListener = eventEmitter.addListener(
      'CGBANNER_FINAL_HEIGHT',
      (data) => {
        if (data.height) {
          const height = parseFloat(data.height);
          setBannerHeight(height);
          addLog(setBannerLogs, 'info', `Banner height updated to ${height.toFixed(0)}px`, { height });
        }
      }
    );

    const embedHeightListener = eventEmitter.addListener(
      'CGEMBED_FINAL_HEIGHT',
      (data) => {
        if (data.height) {
          const height = parseFloat(data.height);
          setEmbedHeight(height);
          addLog(setEmbedLogs, 'info', `Embed height updated to ${height.toFixed(0)}px`, { height });
        }
      }
    );

    return () => {
      bannerHeightListener.remove();
      embedHeightListener.remove();
    };
  }, []);

  // Campaigns handlers
  const handleLoadCampaign = async () => {
    if (!campaignId.trim()) {
      addLog(setCampaignLogs, 'error', 'Campaign ID is required');
      return;
    }

    setIsLoadingCampaign(true);

    try {
      let options = {};
      if (presentationOptions.trim()) {
        try {
          options = JSON.parse(presentationOptions);
        } catch (e) {
          addLog(setCampaignLogs, 'error', 'Invalid JSON in presentation options', { error: String(e) });
          setIsLoadingCampaign(false);
          return;
        }
      }

      addLog(setCampaignLogs, 'request', 'Loading campaign', {
        campaignId,
        options
      });

      loadCampaignById(campaignId, options);
      addLog(setCampaignLogs, 'success', 'Campaign loaded successfully');
    } catch (error) {
      addLog(setCampaignLogs, 'error', 'Failed to load campaign', { error: String(error) });
    } finally {
      setIsLoadingCampaign(false);
    }
  };

  // Widget handlers
  const handleShowBanner = () => {
    if (!bannerId.trim()) {
      addLog(setBannerLogs, 'error', 'Please enter a banner ID');
      return;
    }
    setShowBanner(true);
    addLog(setBannerLogs, 'request', `Rendering banner widget`, { bannerId });
  };

  const handleHideBanner = () => {
    setShowBanner(false);
    addLog(setBannerLogs, 'info', 'Banner widget hidden');
  };

  const handleShowEmbed = () => {
    if (!embedId.trim()) {
      addLog(setEmbedLogs, 'error', 'Please enter an embed ID');
      return;
    }
    setShowEmbed(true);
    addLog(setEmbedLogs, 'request', `Rendering embed widget`, { embedId });
  };

  const handleHideEmbed = () => {
    setShowEmbed(false);
    addLog(setEmbedLogs, 'info', 'Embed widget hidden');
  };

  // Campaign presentation option presets
  const presetOptions = {
    default: {},
    bottomSlider70: {
      layout: 'bottom-slider',
      relativeHeight: 0.7,
      opacity: 0.5,
      closeOnDeepLink: true,
    },
    bottomSlider50: {
      layout: 'bottom-slider',
      relativeHeight: 0.5,
      opacity: 0.5,
      closeOnDeepLink: true,
    },
    middlePopup50: {
      layout: 'middle-popup',
      relativeHeight: 0.5,
      opacity: 0.5,
      closeOnDeepLink: false,
    },
    fullScreen: {
      layout: 'middle-default',
      relativeHeight: 1.0,
      opacity: 0.5,
      closeOnDeepLink: true,
    },
  };

  const fillPresetOption = (presetKey: keyof typeof presetOptions) => {
    const preset = presetOptions[presetKey];
    setPresentationOptions(JSON.stringify(preset, null, 2));
  };

  // Notification handlers
  const minimalNotificationData = {
    type: 'CustomerGlu',
    nudge_url: 'https://api.customerglu.com/campaign/reward-123',
  };

  const sampleNotificationData = {
    type: 'CustomerGlu',
    title: 'Special Reward!',
    body: 'You earned 100 points!',
    nudge_url: 'https://api.customerglu.com/campaign/reward-123',
    campaign_id: 'reward-campaign-1',
    nudge_id: 'nudge-001',
    glu_message_type: 'in-app',
    page_type: 'bottom-slider',
    relativeHeight: '0.7',
    closeOnDeepLink: 'true',
  };

  const fillSampleData = () => {
    setNotificationData(JSON.stringify(sampleNotificationData, null, 2));
  };

  const fillMinimalData = () => {
    setNotificationData(JSON.stringify(minimalNotificationData, null, 2));
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

  // Wallet handler
  const handleOpenWallet = () => {
    addLog(setWalletLogs, 'request', 'Opening CustomerGlu wallet');
    try {
      openWallet();
      addLog(setWalletLogs, 'success', 'Wallet opened successfully');
    } catch (error) {
      addLog(setWalletLogs, 'error', 'Failed to open wallet', { error: String(error) });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feature Testing</Text>
      <Text style={styles.subtitle}>
        Test specific SDK features with custom configurations
      </Text>

      {/* Campaigns Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('campaigns')}
        >
          <Text style={styles.accordionTitle}>Campaigns</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'campaigns' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'campaigns' && (
          <View style={styles.accordionContent}>
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Load Campaign by ID</Text>
                <InfoButton
                  title="loadCampaignById(campaignId, options)"
                  description="Load a campaign by its ID with optional presentation configuration. The options object defines how the campaign should be displayed (modal style, height, close behavior, etc.)."
                  parameters={[
                    {
                      name: 'campaignId',
                      type: 'string',
                      description: 'Campaign identifier from dashboard',
                      required: true
                    },
                    {
                      name: 'options',
                      type: 'Object',
                      description: 'Presentation options (page_type, relativeHeight, closeOnDeepLink, etc.)',
                      required: false
                    }
                  ]}
                  returns="void"
                  codeExample={`import { loadCampaignById } from '@customerglu/react-native-customerglu';

// Minimal - uses default presentation
loadCampaignById('campaign-123');

// With presentation options
loadCampaignById('campaign-123', {
  layout: 'bottom-slider',
  relativeHeight: 0.7,
  opacity: 0.5,
  closeOnDeepLink: true
});`}
                  notes={[
                    'layout: "bottom-slider", "bottom-default", "middle-default", "middle-popup", "bottom-popup"',
                    'relativeHeight: 0.0 to 1.0 (number, percentage of screen)',
                    'opacity: 0.0 to 1.0 (number, background overlay darkness)',
                    'closeOnDeepLink: true/false (auto-close on navigation)',
                    'absoluteHeight: number (fixed height in pixels, alternative to relativeHeight)'
                  ]}
                />
              </View>
              <Text style={styles.label}>Campaign ID *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter campaign ID (e.g., campaign-123)"
                value={campaignId}
                onChangeText={setCampaignId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Presentation Options (JSON)</Text>
              <View style={styles.presetContainer}>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => fillPresetOption('default')}
                >
                  <Text style={styles.presetButtonText}>Default</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => fillPresetOption('bottomSlider70')}
                >
                  <Text style={styles.presetButtonText}>Bottom Slider 70%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => fillPresetOption('bottomSlider50')}
                >
                  <Text style={styles.presetButtonText}>Bottom Slider 50%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => fillPresetOption('middlePopup50')}
                >
                  <Text style={styles.presetButtonText}>Middle Popup 50%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.presetButton}
                  onPress={() => fillPresetOption('fullScreen')}
                >
                  <Text style={styles.presetButtonText}>Full Screen</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textArea}
                placeholder='{"layout":"bottom-slider","relativeHeight":0.7,"opacity":0.5,"closeOnDeepLink":true}'
                value={presentationOptions}
                onChangeText={setPresentationOptions}
                multiline
                numberOfLines={4}
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
          </View>
        )}
      </View>

      {/* Widgets Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('widgets')}
        >
          <Text style={styles.accordionTitle}>Engagement Widgets</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'widgets' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'widgets' && (
          <View style={styles.accordionContent}>
            {/* Banner Widget */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Banner Widget</Text>
                <InfoButton
                  title="<BannerWidget bannerId={string} />"
                  description="Display a horizontal banner campaign with auto-adjusted height"
                  parameters={[
                    {
                      name: 'bannerId',
                      type: 'string',
                      description: 'Banner identifier from dashboard',
                      required: true
                    }
                  ]}
                  returns="React.ReactElement"
                  codeExample={`import { BannerWidget } from '@customerglu/react-native-customerglu';

<View style={{ height: bannerHeight }}>
  <BannerWidget
    bannerId="my-banner-id"
    style={{ width: '100%', height: '100%' }}
  />
</View>`}
                  notes={[
                    'Height updates via CGBANNER_FINAL_HEIGHT event',
                    'Auto-renders based on backend configuration',
                    'Listen to height events to adjust container'
                  ]}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Banner ID"
                value={bannerId}
                onChangeText={setBannerId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.halfButton]}
                  onPress={handleShowBanner}
                >
                  <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.halfButton, styles.secondaryButton]}
                  onPress={handleHideBanner}
                >
                  <Text style={styles.buttonText}>Hide</Text>
                </TouchableOpacity>
              </View>
              {showBanner && bannerId && (
                <View style={styles.widgetContainer}>
                  <Text style={styles.widgetInfo}>
                    Height: {bannerHeight.toFixed(0)}px (auto-updates)
                  </Text>
                  <View style={[styles.widget, { height: bannerHeight }]}>
                    <BannerWidget
                      bannerId={bannerId}
                      style={styles.bannerWidget}
                    />
                  </View>
                </View>
              )}
              <ResponseLog logs={bannerLogs} />
            </View>

            {/* Embed Widget */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Embed Widget</Text>
                <InfoButton
                  title="<EmbedBannerWidget embedId={string} />"
                  description="Display an embedded campaign view with auto-adjusted height"
                  parameters={[
                    {
                      name: 'embedId',
                      type: 'string',
                      description: 'Embed identifier from dashboard',
                      required: true
                    }
                  ]}
                  returns="React.ReactElement"
                  codeExample={`import { EmbedBannerWidget } from '@customerglu/react-native-customerglu';

<View style={{ height: embedHeight }}>
  <EmbedBannerWidget
    embedId="my-embed-id"
    style={{ width: '100%', height: '100%' }}
  />
</View>`}
                  notes={[
                    'Height updates via CGEMBED_FINAL_HEIGHT event',
                    'Auto-renders based on backend configuration',
                    'Suitable for full embedded experiences'
                  ]}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Embed ID"
                value={embedId}
                onChangeText={setEmbedId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.halfButton]}
                  onPress={handleShowEmbed}
                >
                  <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.halfButton, styles.secondaryButton]}
                  onPress={handleHideEmbed}
                >
                  <Text style={styles.buttonText}>Hide</Text>
                </TouchableOpacity>
              </View>
              {showEmbed && embedId && (
                <View style={styles.widgetContainer}>
                  <Text style={styles.widgetInfo}>
                    Height: {embedHeight.toFixed(0)}px (auto-updates)
                  </Text>
                  <View style={[styles.widget, { height: embedHeight }]}>
                    <EmbedBannerWidget
                      embedId={embedId}
                      style={styles.embedWidget}
                    />
                  </View>
                </View>
              )}
              <ResponseLog logs={embedLogs} />
            </View>
          </View>
        )}
      </View>

      {/* Notifications Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('notifications')}
        >
          <Text style={styles.accordionTitle}>Notifications</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'notifications' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'notifications' && (
          <View style={styles.accordionContent}>
            {/* Foreground Notification */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Foreground Notification</Text>
                <InfoButton
                  title="DisplayCGNotification(data, autoCloseWebview)"
                  description="Display notification when app is in foreground"
                  parameters={[
                    {
                      name: 'data',
                      type: 'Object',
                      description: 'Notification payload with type:"CustomerGlu" (required)',
                      required: true
                    },
                    {
                      name: 'autoCloseWebview',
                      type: 'boolean',
                      description: 'Auto-close webview on deep link',
                      required: false
                    }
                  ]}
                  returns="void"
                  notes={[
                    'type:"CustomerGlu" is REQUIRED',
                    'glu_message_type:"in-app" shows modal',
                    'Height/boolean values must be STRINGS'
                  ]}
                />
              </View>
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
                placeholder='{"type":"CustomerGlu","nudge_url":"..."}'
                value={notificationData}
                onChangeText={setNotificationData}
                multiline
                numberOfLines={6}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Auto-close webview</Text>
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
                  <Text style={styles.buttonText}>Display Foreground</Text>
                )}
              </TouchableOpacity>
              <ResponseLog logs={cgNotificationLogs} />
            </View>

            {/* Background Notification */}
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Background Notification</Text>
                <InfoButton
                  title="DisplayCGBackgroundNotification(data, autoCloseWebview)"
                  description="Display notification when user taps notification (app was backgrounded)"
                  parameters={[
                    {
                      name: 'data',
                      type: 'Object',
                      description: 'Notification payload with type:"CustomerGlu" (required)',
                      required: true
                    },
                    {
                      name: 'autoCloseWebview',
                      type: 'boolean',
                      description: 'Auto-close webview on deep link',
                      required: false
                    }
                  ]}
                  returns="void"
                  notes={[
                    'type:"CustomerGlu" is REQUIRED',
                    'ALWAYS shows as in-app modal',
                    'Uses hardcoded opacity: 0.5'
                  ]}
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
                  <Text style={styles.buttonText}>Display Background</Text>
                )}
              </TouchableOpacity>
              <ResponseLog logs={backgroundNotificationLogs} />
            </View>
          </View>
        )}
      </View>

      {/* Wallet Accordion */}
      <View style={styles.accordion}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection('wallet')}
        >
          <Text style={styles.accordionTitle}>Wallet</Text>
          <Text style={styles.accordionIcon}>
            {expandedSection === 'wallet' ? '−' : '+'}
          </Text>
        </TouchableOpacity>
        {expandedSection === 'wallet' && (
          <View style={styles.accordionContent}>
            <View style={styles.subsection}>
              <View style={styles.subsectionHeader}>
                <Text style={styles.subsectionTitle}>Open Wallet</Text>
                <InfoButton
                  title="openWallet()"
                  description="Opens the CustomerGlu wallet interface where users can view their points, rewards, and transaction history."
                  returns="void"
                  codeExample={`import { openWallet } from '@customerglu/react-native-customerglu';

// Open wallet on button tap
<TouchableOpacity onPress={() => openWallet()}>
  <Text>View My Wallet</Text>
</TouchableOpacity>`}
                  notes={[
                    'Requires user to be registered first',
                    'Shows points balance and rewards',
                    'Users can redeem rewards from wallet',
                    'Wallet content is managed from dashboard'
                  ]}
                />
              </View>
              <Text style={styles.description}>
                Opens the CustomerGlu wallet showing points, rewards, and history
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleOpenWallet}
              >
                <Text style={styles.buttonText}>Open Wallet</Text>
              </TouchableOpacity>
              <ResponseLog logs={walletLogs} />
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
    backgroundColor: '#007AFF',
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
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryButton: {
    backgroundColor: '#8E8E93',
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
  widgetContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  widgetInfo: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  widget: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  bannerWidget: {
    width: '100%',
    height: '100%',
  },
  embedWidget: {
    width: '100%',
    height: '100%',
  },
});
