import { useEffect } from 'react';
import { Platform, Text, TouchableOpacity, AppState, type AppStateStatus, Alert, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  disconnectSSEOnBackground,
  startSSEOnForeground,
  dataClear,
} from '@customerglu/react-native-customerglu';

const { DevSettings } = NativeModules;

// Import screens
import QuickstartScreen from './screens/QuickstartScreen';
import TestingScreen from './screens/TestingScreen';
import AdvancedScreen from './screens/AdvancedScreen';

const Tab = createBottomTabNavigator();

// Simple icon component using emoji
const TabIcon = ({ emoji, focused }: { emoji: string; focused: boolean }) => (
  <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
);

export default function App() {
  // Clear all cached SDK data
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all cached SDK data (user info, tokens, etc.) and reload the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear & Reload',
          style: 'destructive',
          onPress: () => {
            dataClear();
            // Reload the app to reset all states
            if (__DEV__ && DevSettings) {
              DevSettings.reload();
            }
          },
        },
      ]
    );
  };

  // SSE lifecycle management (background/foreground)
  // Note: SSE auto-starts after RegisterDevice - we only manage reconnection here
  useEffect(() => {
    let previousState = AppState.currentState;

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // Only act on actual state transitions
      if (previousState === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('📱 App backgrounded - disconnecting SSE');
        disconnectSSEOnBackground();
      } else if (previousState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('📱 App foregrounded - resuming SSE');
        startSSEOnForeground();

        // Assume connected after 3 seconds
        setTimeout(() => {
          console.log('📱 SSE assumed reconnected after foreground');
        }, 3000);
      }
      previousState = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
            paddingTop: 5,
            paddingBottom: Platform.OS === 'ios' ? 20 : 5,
            height: Platform.OS === 'ios' ? 85 : 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={handleClearData}
              style={{ marginRight: 16 }}
            >
              <Text style={{ color: 'white', fontSize: 28 }}>🗑️</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Tab.Screen
          name="Quickstart"
          component={QuickstartScreen}
          options={{
            title: 'Quickstart Guide',
            tabBarLabel: 'Quickstart',
            tabBarIcon: ({ focused }) => <TabIcon emoji="🚀" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Testing"
          component={TestingScreen}
          options={{
            title: 'Feature Testing',
            tabBarLabel: 'Testing',
            tabBarIcon: ({ focused }) => <TabIcon emoji="🧪" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Advanced"
          component={AdvancedScreen}
          options={{
            title: 'Advanced',
            tabBarLabel: 'Advanced',
            tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
