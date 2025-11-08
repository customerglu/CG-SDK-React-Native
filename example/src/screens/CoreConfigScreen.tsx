import { useState } from 'react';
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
  RegisterDevice,
  UpdateUserAttributes,
  initCGSDK,
  setAdPopupFont,
  UpdateProfile,
  allowAnonymousRegistration,
  gluSDKDebuggingMode,
  setOpenWalletAsFallback,
  SetCurrentClassName,
} from '@customerglu/react-native-customerglu';
import ResponseLog, { LogEntry } from '../components/ResponseLog';
import InfoButton from '../components/InfoButton';

export default function CoreConfigScreen() {
  const [userId, setUserId] = useState('');
  const [region, setRegion] = useState('me');
  const [attribute, setAttribute] = useState('');
  const [fontName, setFontName] = useState('');
  const [profileKey, setProfileKey] = useState('');
  const [profileValue, setProfileValue] = useState('');
  const [className, setClassName] = useState('');
  const [anonymousReg, setAnonymousReg] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [walletFallback, setWalletFallback] = useState(false);

  // Response logs for each function
  const [initLogs, setInitLogs] = useState<LogEntry[]>([]);
  const [registerLogs, setRegisterLogs] = useState<LogEntry[]>([]);
  const [attributesLogs, setAttributesLogs] = useState<LogEntry[]>([]);
  const [fontLogs, setFontLogs] = useState<LogEntry[]>([]);
  const [profileLogs, setProfileLogs] = useState<LogEntry[]>([]);
  const [classNameLogs, setClassNameLogs] = useState<LogEntry[]>([]);

  // Loading states
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    type: LogEntry['type'],
    message: string,
    data?: any
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [...prev.slice(-2), { type, message, data, timestamp }]);
  };

  const handleInitSDK = async () => {
    if (!region.trim()) {
      addLog(setInitLogs, 'error', 'Please enter a region', null);
      return;
    }

    setIsInitializing(true);
    addLog(setInitLogs, 'request', `Initializing SDK with region: ${region}`, { region });

    try {
      initCGSDK(region);
      // Wait a moment for initialization
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addLog(setInitLogs, 'success', `SDK initialized successfully for ${region} region`, {
        region,
        baseUrl: region === 'us' ? 'https://api-us.customerglu.com' :
                 region === 'me' ? 'https://api-me.customerglu.com' :
                 'https://api.customerglu.com'
      });
    } catch (error) {
      addLog(setInitLogs, 'error', `Failed to initialize SDK: ${error}`, { error: String(error) });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleRegisterDevice = async () => {
    if (!userId.trim()) {
      addLog(setRegisterLogs, 'error', 'Please enter a user ID', null);
      return;
    }

    setIsRegistering(true);
    const userData = { userId: userId.trim() };
    addLog(setRegisterLogs, 'request', 'Registering device...', userData);

    try {
      const result = await RegisterDevice(userData);
      addLog(setRegisterLogs, 'success', 'Device registered successfully', {
        result,
        userId: userData.userId
      });
    } catch (error) {
      addLog(setRegisterLogs, 'error', `Registration failed: ${error}`, { error: String(error) });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleUpdateAttributes = () => {
    if (!attribute.trim()) {
      addLog(setAttributesLogs, 'error', 'Please enter attribute data', null);
      return;
    }

    try {
      const attrData = JSON.parse(attribute);
      addLog(setAttributesLogs, 'request', 'Updating user attributes...', attrData);
      UpdateUserAttributes(attrData);
      addLog(setAttributesLogs, 'success', 'User attributes updated', attrData);
    } catch (error) {
      addLog(setAttributesLogs, 'error', `Failed: ${error}`, { error: String(error) });
    }
  };

  const handleSetFont = () => {
    if (!fontName.trim()) {
      addLog(setFontLogs, 'error', 'Please enter a font name', null);
      return;
    }

    try {
      addLog(setFontLogs, 'request', `Setting font to: ${fontName}`, { fontName });
      setAdPopupFont(fontName);
      addLog(setFontLogs, 'success', `Font set successfully`, { fontName });
    } catch (error) {
      addLog(setFontLogs, 'error', `Failed: ${error}`, { error: String(error) });
    }
  };

  const handleUpdateProfile = () => {
    if (!profileKey.trim() || !profileValue.trim()) {
      addLog(setProfileLogs, 'error', 'Please enter both key and value', null);
      return;
    }

    try {
      const profileData = { [profileKey]: profileValue };
      addLog(setProfileLogs, 'request', 'Updating profile...', profileData);
      UpdateProfile(profileData);
      addLog(setProfileLogs, 'success', 'Profile updated', profileData);
    } catch (error) {
      addLog(setProfileLogs, 'error', `Failed: ${error}`, { error: String(error) });
    }
  };

  const handleSetClassName = async () => {
    if (!className.trim()) {
      addLog(setClassNameLogs, 'error', 'Please enter a class name', null);
      return;
    }

    try {
      addLog(setClassNameLogs, 'request', `Setting class name to: ${className}`, { className });
      const result = await SetCurrentClassName(className);
      addLog(setClassNameLogs, 'success', 'Class name set successfully', { result, className });
    } catch (error) {
      addLog(setClassNameLogs, 'error', `Failed: ${error}`, { error: String(error) });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Core & Configuration</Text>
      <Text style={styles.subtitle}>Essential SDK initialization and setup functions</Text>

      {/* Initialize SDK */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>1. Initialize SDK</Text>
          <InfoButton
            title="initCGSDK(region)"
            description="Initializes the CustomerGlu SDK with the specified region. This must be called before any other SDK functions. The region determines which API endpoints the SDK will use."
            parameters={[
              { name: 'region', type: 'string', description: 'Region code: "us" (United States), "me" (Middle East), or "in" (India)', required: true }
            ]}
            returns="void"
            codeExample={`import { initCGSDK } from '@customerglu/react-native-customerglu';

// Initialize for Middle East region
initCGSDK('me');

// Or for US region
initCGSDK('us');`}
            notes={[
              'Must be called before RegisterDevice or any other SDK function',
              'Configures all API endpoints based on region',
              'Only needs to be called once per app launch'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Choose your region: us, me, or in</Text>
        <TextInput
          style={styles.input}
          placeholder="Region (us/me/in)"
          value={region}
          onChangeText={setRegion}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isInitializing && styles.buttonDisabled]}
          onPress={handleInitSDK}
          disabled={isInitializing}
        >
          {isInitializing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Initialize SDK</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={initLogs} />
      </View>

      {/* Register Device */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>2. Register Device</Text>
          <InfoButton
            title="RegisterDevice(userData)"
            description="Registers the current device and user with CustomerGlu. This creates a user session and must be called after SDK initialization. Returns a promise that resolves when registration is complete."
            parameters={[
              { name: 'userData', type: 'object', description: 'User data object', required: true },
              { name: 'userData.userId', type: 'string', description: 'Unique identifier for the user', required: true }
            ]}
            returns="Promise<Boolean>"
            codeExample={`import { RegisterDevice } from '@customerglu/react-native-customerglu';

const userData = {
  userId: 'user_12345'
};

try {
  const result = await RegisterDevice(userData);
  console.log('Registered:', result);
} catch (error) {
  console.error('Registration failed:', error);
}`}
            notes={[
              'Must be called after initCGSDK',
              'Creates a persistent user session',
              'Required before accessing campaigns or wallet'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Enter a unique user ID for your test user</Text>
        <TextInput
          style={styles.input}
          placeholder="User ID (e.g., test_user_123)"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, isRegistering && styles.buttonDisabled]}
          onPress={handleRegisterDevice}
          disabled={isRegistering}
        >
          {isRegistering ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Register Device</Text>
          )}
        </TouchableOpacity>
        <ResponseLog logs={registerLogs} />
      </View>

      {/* Update User Attributes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>3. Update User Attributes</Text>
          <InfoButton
            title="UpdateUserAttributes(attributes)"
            description="Updates custom attributes for the current user. These attributes can be used for campaign targeting and personalization."
            parameters={[
              { name: 'attributes', type: 'object', description: 'Key-value pairs of user attributes', required: true }
            ]}
            returns="void"
            codeExample={`import { UpdateUserAttributes } from '@customerglu/react-native-customerglu';

UpdateUserAttributes({
  age: 25,
  city: 'Dubai',
  membershipLevel: 'gold'
});`}
            notes={[
              'Attributes are stored and synced with the server',
              'Can be used for campaign targeting',
              'Accepts any valid JSON object'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Enter JSON object (e.g., {`{"age": 25, "city": "Dubai"}`})</Text>
        <TextInput
          style={styles.textArea}
          placeholder='{"key": "value"}'
          value={attribute}
          onChangeText={setAttribute}
          multiline
          numberOfLines={3}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateAttributes}>
          <Text style={styles.buttonText}>Update Attributes</Text>
        </TouchableOpacity>
        <ResponseLog logs={attributesLogs} />
      </View>

      {/* Set Font */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>4. Set Ad Popup Font</Text>
          <InfoButton
            title="setAdPopupFont(fontName)"
            description="Sets the font family for ad popups and campaign displays. The font must be available in your app."
            parameters={[
              { name: 'fontName', type: 'string', description: 'Name of the font family', required: true }
            ]}
            returns="void"
            codeExample={`import { setAdPopupFont } from '@customerglu/react-native-customerglu';

setAdPopupFont('Arial');
// or
setAdPopupFont('Helvetica-Bold');`}
            notes={[
              'Font must be loaded in your app',
              'Applies to all campaign displays',
              'iOS and Android may have different font names'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Enter font name (e.g., Arial, Helvetica)</Text>
        <TextInput
          style={styles.input}
          placeholder="Font Name"
          value={fontName}
          onChangeText={setFontName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleSetFont}>
          <Text style={styles.buttonText}>Set Font</Text>
        </TouchableOpacity>
        <ResponseLog logs={fontLogs} />
      </View>

      {/* Update Profile */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>5. Update Profile</Text>
          <InfoButton
            title="UpdateProfile(profileData)"
            description="Updates the user's profile information. Similar to UpdateUserAttributes but specifically for profile data."
            parameters={[
              { name: 'profileData', type: 'object', description: 'Profile data key-value pairs', required: true }
            ]}
            returns="void"
            codeExample={`import { UpdateProfile } from '@customerglu/react-native-customerglu';

UpdateProfile({
  name: 'John Doe',
  email: 'john@example.com'
});`}
            notes={[
              'Profile data is synced with the server',
              'Can be accessed in campaign personalization'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Enter a single profile field</Text>
        <TextInput
          style={styles.input}
          placeholder="Key (e.g., name)"
          value={profileKey}
          onChangeText={setProfileKey}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Value (e.g., John Doe)"
          value={profileValue}
          onChangeText={setProfileValue}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <ResponseLog logs={profileLogs} />
      </View>

      {/* Set Class Name */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>6. Set Current Class Name</Text>
          <InfoButton
            title="SetCurrentClassName(className)"
            description="Sets the current screen/class name for analytics and tracking purposes."
            parameters={[
              { name: 'className', type: 'string', description: 'Name of the current screen', required: true }
            ]}
            returns="Promise<string>"
            codeExample={`import { SetCurrentClassName } from '@customerglu/react-native-customerglu';

const result = await SetCurrentClassName('HomeScreen');
console.log(result);`}
            notes={[
              'Helps track user journey',
              'Used for analytics',
              'Call when navigating between screens'
            ]}
          />
        </View>
        <Text style={styles.helperText}>Enter screen/class name for tracking</Text>
        <TextInput
          style={styles.input}
          placeholder="Class Name (e.g., HomeScreen)"
          value={className}
          onChangeText={setClassName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleSetClassName}>
          <Text style={styles.buttonText}>Set Class Name</Text>
        </TouchableOpacity>
        <ResponseLog logs={classNameLogs} />
      </View>

      {/* Configuration Toggles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Configuration Toggles</Text>
        <Text style={styles.helperText}>Quick settings for SDK behavior</Text>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Anonymous Registration</Text>
              <Text style={styles.toggleDescription}>Allow users without login</Text>
            </View>
            <Switch
              value={anonymousReg}
              onValueChange={(value) => {
                setAnonymousReg(value);
                allowAnonymousRegistration(value);
              }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Debug Mode</Text>
              <Text style={styles.toggleDescription}>Enable verbose logging</Text>
            </View>
            <Switch
              value={debugMode}
              onValueChange={(value) => {
                setDebugMode(value);
                gluSDKDebuggingMode(value);
              }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Wallet as Fallback</Text>
              <Text style={styles.toggleDescription}>Open wallet if campaign fails</Text>
            </View>
            <Switch
              value={walletFallback}
              onValueChange={(value) => {
                setWalletFallback(value);
                setOpenWalletAsFallback(value);
              }}
            />
          </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
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
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Courier',
    minHeight: 80,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    marginTop: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  toggleDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});
