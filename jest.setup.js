// Mock the TurboModuleRegistry
jest.mock('react-native', () => ({
  TurboModuleRegistry: {
    getEnforcing: jest.fn(),
    get: jest.fn(),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
}));

// Mock console methods to avoid noise in test output
global.console = {
  ...console,
  // Uncomment to debug tests
  // log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock native event emitter
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Add custom matchers if needed
expect.extend({
  toBeValidTurboModule(received) {
    const pass = received && typeof received === 'object';
    return {
      pass,
      message: () => `expected ${received} to be a valid TurboModule object`,
    };
  },
});

// Global test timeout
jest.setTimeout(10000);

// Mock native modules that might be used in tests
jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
  RncustomergluModule: {
    registerDevice: jest.fn(),
    sendData: jest.fn(),
    dataClear: jest.fn(),
    testIntegration: jest.fn(),
    loadCampaignById: jest.fn(),
    loadCampaignWithUrl: jest.fn(),
    openWallet: jest.fn(),
    initCGSDK: jest.fn(),
  },
}));

// Add any additional test environment setup here
process.env.NODE_ENV = 'test';
