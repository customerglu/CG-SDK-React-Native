import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {
  BannerWidget,
  EmbedBannerWidget,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

export default function WidgetsScreen() {
  const [bannerId, setBannerId] = useState('');
  const [embedId, setEmbedId] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(200);
  const [embedHeight, setEmbedHeight] = useState(300);

  // Log states
  const [bannerLogs, setBannerLogs] = useState<LogEntry[]>([]);
  const [embedLogs, setEmbedLogs] = useState<LogEntry[]>([]);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-3), { type, message, data, timestamp }]);
  };

  useEffect(() => {
    // Listen for banner height changes
    const bannerHeightListener = eventEmitter.addListener(
      'CGBANNER_FINAL_HEIGHT',
      (data) => {
        console.log('Banner height update:', data);
        if (data.height) {
          const height = parseFloat(data.height);
          setBannerHeight(height);
          addLog(setBannerLogs, 'info', `Banner height updated to ${height.toFixed(0)}px`, { height });
        }
      }
    );

    // Listen for embed height changes
    const embedHeightListener = eventEmitter.addListener(
      'CGEMBED_FINAL_HEIGHT',
      (data) => {
        console.log('Embed height update:', data);
        if (data.height) {
          const height = parseFloat(data.height);
          setEmbedHeight(height);
          addLog(setEmbedLogs, 'info', `Embed height updated to ${height.toFixed(0)}px`, { height });
        }
      }
    );

    // Listen for banner loaded event
    const bannerLoadedListener = eventEmitter.addListener(
      'CUSTOMERGLU_BANNER_LOADED',
      (data) => {
        console.log('Banner loaded:', data);
        addLog(setBannerLogs, 'success', 'Banner loaded successfully', data);
      }
    );

    addLog(setBannerLogs, 'info', 'Listening for banner events');
    addLog(setEmbedLogs, 'info', 'Listening for embed events');

    return () => {
      bannerHeightListener.remove();
      embedHeightListener.remove();
      bannerLoadedListener.remove();
    };
  }, []);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Engagement Widgets</Text>
      <Text style={styles.subtitle}>
        Display native banner and embed widgets that adjust height dynamically
      </Text>

      {/* 1. Banner Widget */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>Banner Widget</Text>
          <InfoButton
            title="<BannerWidget bannerId={string} />"
            description="A native component that displays a horizontal banner campaign. The banner automatically adjusts its height based on content and emits height update events. Useful for displaying engagement campaigns inline with your app content."
            parameters={[
              {
                name: 'bannerId',
                type: 'string',
                description: 'Unique identifier of the banner to display',
                required: true
              },
              {
                name: 'style',
                type: 'StyleProp<ViewStyle>',
                description: 'React Native style object for the banner container',
                required: false
              }
            ]}
            returns="React.ReactElement"
            codeExample={`import { BannerWidget } from '@customerglu/react-native-customerglu';

function MyComponent() {
  const [height, setHeight] = useState(200);

  useEffect(() => {
    const listener = eventEmitter.addListener(
      'CGBANNER_FINAL_HEIGHT',
      (data) => setHeight(parseFloat(data.height))
    );
    return () => listener.remove();
  }, []);

  return (
    <View style={{ height }}>
      <BannerWidget
        bannerId="my-banner-id"
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}`}
            notes={[
              'Banner height updates via CGBANNER_FINAL_HEIGHT event',
              'Banner load completion via CUSTOMERGLU_BANNER_LOADED event',
              'Requires SDK initialization and device registration',
              'Height updates automatically - listen to events to adjust container'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Display a horizontal banner campaign with auto-adjusted height
        </Text>
        <Text style={styles.helperText}>
          Enter a valid banner ID from your CustomerGlu dashboard
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Banner ID (e.g., my-banner-id)"
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
            <Text style={styles.buttonText}>Show Banner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.halfButton, styles.secondaryButton]}
            onPress={handleHideBanner}
          >
            <Text style={styles.buttonText}>Hide Banner</Text>
          </TouchableOpacity>
        </View>

        {showBanner && bannerId && (
          <View style={styles.widgetContainer}>
            <Text style={styles.widgetInfo}>
              Current Height: {bannerHeight.toFixed(0)}px (updates automatically)
            </Text>
            <View style={[styles.widget, { height: bannerHeight }]}>
              <BannerWidget
                bannerId={bannerId}
                style={styles.bannerWidget}
              />
            </View>
          </View>
        )}

        <ResponseLog logs={bannerLogs} maxHeight={250} />
      </View>

      {/* 2. Embed Widget */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>Embed Widget</Text>
          <InfoButton
            title="<EmbedBannerWidget embedId={string} />"
            description="A native component that displays an embedded campaign view. Similar to Banner Widget but designed for full embedded experiences. The embed automatically adjusts its height based on content."
            parameters={[
              {
                name: 'embedId',
                type: 'string',
                description: 'Unique identifier of the embed campaign to display',
                required: true
              },
              {
                name: 'style',
                type: 'StyleProp<ViewStyle>',
                description: 'React Native style object for the embed container',
                required: false
              }
            ]}
            returns="React.ReactElement"
            codeExample={`import { EmbedBannerWidget } from '@customerglu/react-native-customerglu';

function MyComponent() {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    const listener = eventEmitter.addListener(
      'CGEMBED_FINAL_HEIGHT',
      (data) => setHeight(parseFloat(data.height))
    );
    return () => listener.remove();
  }, []);

  return (
    <View style={{ height }}>
      <EmbedBannerWidget
        embedId="my-embed-id"
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}`}
            notes={[
              'Embed height updates via CGEMBED_FINAL_HEIGHT event',
              'Requires SDK initialization and device registration',
              'Suitable for full embedded campaign experiences',
              'Height updates automatically - listen to events to adjust container'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Display an embedded campaign view with auto-adjusted height
        </Text>
        <Text style={styles.helperText}>
          Enter a valid embed ID from your CustomerGlu dashboard
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Embed ID (e.g., my-embed-id)"
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
            <Text style={styles.buttonText}>Show Embed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.halfButton, styles.secondaryButton]}
            onPress={handleHideEmbed}
          >
            <Text style={styles.buttonText}>Hide Embed</Text>
          </TouchableOpacity>
        </View>

        {showEmbed && embedId && (
          <View style={styles.widgetContainer}>
            <Text style={styles.widgetInfo}>
              Current Height: {embedHeight.toFixed(0)}px (updates automatically)
            </Text>
            <View style={[styles.widget, { height: embedHeight }]}>
              <EmbedBannerWidget
                embedId={embedId}
                style={styles.embedWidget}
              />
            </View>
          </View>
        )}

        <ResponseLog logs={embedLogs} maxHeight={250} />
      </View>

      {/* 3. Widget Events Reference */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>3.</Text>
          <Text style={styles.sectionTitle}>Widget Events</Text>
          <InfoButton
            title="Widget Event Listeners"
            description="CustomerGlu widgets emit native events that you can listen to for height updates and load status. These events help you create responsive layouts that adapt to dynamic content."
            codeExample={`import { NativeEventEmitter, NativeModules } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

// Listen for banner height changes
const bannerListener = eventEmitter.addListener(
  'CGBANNER_FINAL_HEIGHT',
  (data) => {
    console.log('Banner height:', data.height);
    setBannerHeight(parseFloat(data.height));
  }
);

// Listen for embed height changes
const embedListener = eventEmitter.addListener(
  'CGEMBED_FINAL_HEIGHT',
  (data) => {
    console.log('Embed height:', data.height);
    setEmbedHeight(parseFloat(data.height));
  }
);

// Listen for banner load completion
const loadListener = eventEmitter.addListener(
  'CUSTOMERGLU_BANNER_LOADED',
  (data) => {
    console.log('Banner loaded!', data);
  }
);

// Clean up on unmount
return () => {
  bannerListener.remove();
  embedListener.remove();
  loadListener.remove();
};`}
            notes={[
              'CGBANNER_FINAL_HEIGHT - Banner height update (data.height)',
              'CGEMBED_FINAL_HEIGHT - Embed height update (data.height)',
              'CUSTOMERGLU_BANNER_LOADED - Banner load completion',
              'Always remove listeners in cleanup function',
              'Height values are in pixels as strings'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Available widget events and their usage
        </Text>
        <View style={styles.eventCard}>
          <Text style={styles.eventName}>CGBANNER_FINAL_HEIGHT</Text>
          <Text style={styles.eventDescription}>
            Emitted when banner height changes. Payload: {`{ height: string }`}
          </Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventName}>CGEMBED_FINAL_HEIGHT</Text>
          <Text style={styles.eventDescription}>
            Emitted when embed height changes. Payload: {`{ height: string }`}
          </Text>
        </View>
        <View style={styles.eventCard}>
          <Text style={styles.eventName}>CUSTOMERGLU_BANNER_LOADED</Text>
          <Text style={styles.eventDescription}>
            Emitted when banner loads successfully
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
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
  eventCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  eventName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Courier',
  },
  eventDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
