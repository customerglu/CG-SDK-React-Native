import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  addMarginsForPIP,
  addDelayForPIP,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { type LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

export default function PiPVideoScreen() {
  const [horizontalMargin, setHorizontalMargin] = useState('16');
  const [verticalMargin, setVerticalMargin] = useState('16');
  const [pipType, setPipType] = useState('dp'); // 'dp' (default) or 'px'
  const [pipDelay, setPipDelay] = useState('0');

  // Log states
  const [marginLogs, setMarginLogs] = useState<LogEntry[]>([]);
  const [delayLogs, setDelayLogs] = useState<LogEntry[]>([]);

  // Loading states
  const [isSettingMargins, setIsSettingMargins] = useState(false);
  const [isSettingDelay, setIsSettingDelay] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: 'success' | 'error' | 'info' | 'request',
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

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
        type: pipType
      });

      addMarginsForPIP(horizontal, vertical, pipType);
      addLog(setMarginLogs, 'success', `PiP margins applied successfully`, {
        horizontal,
        vertical,
        type: pipType
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

  const presetMargins = [
    { label: 'Small (8px)', horizontal: '8', vertical: '8' },
    { label: 'Medium (16px)', horizontal: '16', vertical: '16' },
    { label: 'Large (24px)', horizontal: '24', vertical: '24' },
    { label: 'Extra Large (32px)', horizontal: '32', vertical: '32' },
  ];

  const presetDelays = [
    { label: 'No delay', value: '0' },
    { label: '500ms', value: '500' },
    { label: '1 second', value: '1000' },
    { label: '2 seconds', value: '2000' },
    { label: '3 seconds', value: '3000' },
  ];

  const applyPresetMargin = (horizontal: string, vertical: string) => {
    setHorizontalMargin(horizontal);
    setVerticalMargin(vertical);
    addLog(setMarginLogs, 'info', `Preset margins applied: ${horizontal}px x ${vertical}px`, {
      horizontal,
      vertical
    });
  };

  const applyPresetDelay = (delay: string) => {
    setPipDelay(delay);
    addLog(setDelayLogs, 'info', `Preset delay selected: ${delay}ms`, { delay });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Picture-in-Picture (PiP)</Text>
      <Text style={styles.subtitle}>
        Configure PiP video positioning and appearance timing
      </Text>

      {/* 1. PiP Video Margins */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>1.</Text>
          <Text style={styles.sectionTitle}>PiP Margins</Text>
          <InfoButton
            title="addMarginsForPIP(horizontal, vertical, type)"
            description="Configures the margins (spacing from screen edges) for the Picture-in-Picture video player. This controls where the floating video appears on the screen relative to the edges."
            parameters={[
              {
                name: 'horizontal',
                type: 'number',
                description: 'Horizontal margin in pixels (distance from left/right edge)',
                required: true
              },
              {
                name: 'vertical',
                type: 'number',
                description: 'Vertical margin in pixels (distance from top/bottom edge)',
                required: true
              },
              {
                name: 'type',
                type: 'string',
                description: 'Unit type: "dp" (density-independent pixels) or "px" (pixels)',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { addMarginsForPIP } from '@customerglu/react-native-customerglu';

// Set PiP margins using DP (density-independent pixels)
addMarginsForPIP(16, 16, 'dp');

// Set PiP margins using absolute pixels
addMarginsForPIP(16, 16, 'px');

// Asymmetric margins
addMarginsForPIP(8, 24, 'dp');`}
            notes={[
              'Type "dp" = density-independent pixels (recommended, scales with screen density)',
              'Type "px" = absolute pixels (may vary on different screen densities)',
              'Controls distance from screen edges',
              'Default is DP on Android if type doesn\'t match "px"',
              'Use presets below for quick configuration'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Set spacing from screen edges for the floating PiP video
        </Text>
        <Text style={styles.helperText}>
          Enter horizontal margin (distance from left/right edges)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Horizontal margin (px)"
          value={horizontalMargin}
          onChangeText={setHorizontalMargin}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.helperText}>
          Enter vertical margin (distance from top/bottom edges)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Vertical margin (px)"
          value={verticalMargin}
          onChangeText={setVerticalMargin}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.helperText}>
          Unit type: "dp" (density-independent pixels, default) or "px" (pixels)
        </Text>
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

        <Text style={styles.presetLabel}>Quick Presets:</Text>
        <View style={styles.presetContainer}>
          {presetMargins.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={styles.presetButton}
              onPress={() => applyPresetMargin(preset.horizontal, preset.vertical)}
            >
              <Text style={styles.presetButtonText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ResponseLog logs={marginLogs} />
      </View>

      {/* 2. PiP Appearance Delay */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>2.</Text>
          <Text style={styles.sectionTitle}>PiP Delay</Text>
          <InfoButton
            title="addDelayForPIP(delay)"
            description="Sets a delay before the PiP video appears after being triggered. This is useful for creating smooth transitions or preventing the video from appearing too quickly."
            parameters={[
              {
                name: 'delay',
                type: 'number',
                description: 'Delay duration in milliseconds before PiP appears',
                required: true
              }
            ]}
            returns="void"
            codeExample={`import { addDelayForPIP } from '@customerglu/react-native-customerglu';

// No delay - appear immediately
addDelayForPIP(0);

// Half second delay
addDelayForPIP(500);

// 2 second delay
addDelayForPIP(2000);`}
            notes={[
              'Delay is in milliseconds',
              'Controls timing of PiP appearance',
              '0 = immediate, higher values = more delay',
              'Useful for smooth transitions'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Configure delay before PiP video appears after trigger
        </Text>
        <Text style={styles.helperText}>
          Enter delay in milliseconds (1000ms = 1 second)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Delay in milliseconds"
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

        <Text style={styles.presetLabel}>Quick Presets:</Text>
        <View style={styles.presetContainer}>
          {presetDelays.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={styles.presetButton}
              onPress={() => applyPresetDelay(preset.value)}
            >
              <Text style={styles.presetButtonText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ResponseLog logs={delayLogs} />
      </View>

      {/* 3. Current Configuration */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>3.</Text>
          <Text style={styles.sectionTitle}>Current Settings</Text>
          <InfoButton
            title="PiP Configuration Summary"
            description="Displays the current Picture-in-Picture configuration settings. These values show what will be applied when you tap the Apply buttons above."
            notes={[
              'Values update as you type',
              'Settings are applied when you tap Apply buttons',
              'Use presets for quick configuration',
              'All measurements shown in current units'
            ]}
          />
        </View>
        <Text style={styles.description}>
          Preview of current PiP configuration (not yet applied)
        </Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Horizontal Margin:</Text>
          <Text style={styles.configValue}>{horizontalMargin}px</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Vertical Margin:</Text>
          <Text style={styles.configValue}>{verticalMargin}px</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Unit Type:</Text>
          <Text style={styles.configValue}>{pipType.toUpperCase()}</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Appearance Delay:</Text>
          <Text style={styles.configValue}>{pipDelay}ms</Text>
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
  presetLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  configLabel: {
    fontSize: 15,
    color: '#666',
  },
  configValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
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
});
