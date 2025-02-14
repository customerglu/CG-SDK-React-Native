// Mock TurboModuleRegistry
jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn((obj) => obj.default),
  },
  TurboModuleRegistry: {
    getEnforcing: jest.fn(),
  },
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  requireNativeComponent: jest.fn(),
  UIManager: {
    getViewManagerConfig: jest.fn(),
  },
}));

// Mock react-native reanimated
jest.mock('react-native-reanimated', () => ({
  useAnimatedStyle: () => ({}),
  withTiming: jest.fn(),
  withSpring: jest.fn(),
  withRepeat: jest.fn(),
  withSequence: jest.fn(),
  useSharedValue: jest.fn(() => ({
    value: 0,
  })),
  createAnimatedComponent: (component) => component,
}));

// Mock react-native gesture handler
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  PinchGestureHandler: 'PinchGestureHandler',
  State: {},
  Directions: {},
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
  SafeAreaProvider: ({ children }) => children,
}));

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock @react-native-firebase/messaging
jest.mock('@react-native-firebase/messaging', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(),
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(),
  })),
}));

// Mock react-native-share
jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

// Global setup
global.window = {};
global.window.addEventListener = jest.fn();
global.window.removeEventListener = jest.fn();

// Console error/warn mocks
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    /Warning.*Cannot update a component/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    /Warning.*Cannot update a component/.test(args[0])
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};

// Cleanup
afterEach(() => {
  jest.clearAllMocks();
});
