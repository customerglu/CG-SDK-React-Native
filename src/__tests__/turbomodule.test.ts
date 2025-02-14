import { TurboModuleRegistry } from 'react-native';
import type { Spec } from '../NativeCustomerGlu';

// Add Jest types
declare const jest: any;
declare const describe: any;
declare const beforeEach: any;
declare const it: any;
declare const expect: any;

// Mock TurboModuleRegistry
jest.mock('react-native', () => ({
  TurboModuleRegistry: {
    getEnforcing: jest.fn(),
  },
}));

describe('CustomerGlu TurboModule', () => {
  const mockModule = {
    initCGSDK: jest.fn(),
    registerDevice: jest.fn(),
    sendEventData: jest.fn(),
    sendData: jest.fn(),
    dataClear: jest.fn(),
    testIntegration: jest.fn(),
    loadCampaignById: jest.fn(),
    loadCampaignWithUrl: jest.fn(),
    openWallet: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (TurboModuleRegistry.getEnforcing as jest.Mock).mockReturnValue(mockModule);
  });

  it('should initialize SDK', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const env = 'development';

    mockModule.initCGSDK.mockResolvedValue(true);
    const result = await module.initCGSDK(env);

    expect(result).toBe(true);
    expect(mockModule.initCGSDK).toHaveBeenCalledWith(env);
  });

  it('should register device', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const userData = { userId: 'test-user' };

    mockModule.registerDevice.mockResolvedValue(true);
    const result = await module.registerDevice(userData);

    expect(result).toBe(true);
    expect(mockModule.registerDevice).toHaveBeenCalledWith(userData);
  });

  it('should send event data', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const eventName = 'test_event';
    const eventProperties = { key: 'value' };

    mockModule.sendEventData.mockResolvedValue(true);
    const result = await module.sendEventData(eventName, eventProperties);

    expect(result).toBe(true);
    expect(mockModule.sendEventData).toHaveBeenCalledWith(
      eventName,
      eventProperties
    );
  });

  it('should send data', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const data = { eventName: 'test_event', properties: { key: 'value' } };

    mockModule.sendData.mockResolvedValue(true);
    const result = await module.sendData(data);

    expect(result).toBe(true);
    expect(mockModule.sendData).toHaveBeenCalledWith(data);
  });

  it('should load campaign by ID', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const campaignId = 'test-campaign';
    const config = { nudgeConfiguration: { layout: 'default' } };

    mockModule.loadCampaignById.mockResolvedValue(true);
    const result = await module.loadCampaignById(campaignId, config);

    expect(result).toBe(true);
    expect(mockModule.loadCampaignById).toHaveBeenCalledWith(
      campaignId,
      config
    );
  });

  it('should load campaign with URL', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const url = 'https://example.com/campaign';
    const config = { nudgeConfiguration: { layout: 'default' } };

    mockModule.loadCampaignWithUrl.mockResolvedValue(true);
    const result = await module.loadCampaignWithUrl(url, config);

    expect(result).toBe(true);
    expect(mockModule.loadCampaignWithUrl).toHaveBeenCalledWith(url, config);
  });

  it('should open wallet', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
    const config = { nudgeConfiguration: { layout: 'default' } };

    mockModule.openWallet.mockResolvedValue(true);
    const result = await module.openWallet(config);

    expect(result).toBe(true);
    expect(mockModule.openWallet).toHaveBeenCalledWith(config);
  });

  it('should clear data', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');

    mockModule.dataClear.mockResolvedValue(undefined);
    await module.dataClear();

    expect(mockModule.dataClear).toHaveBeenCalled();
  });

  it('should test integration', async () => {
    const module = TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');

    mockModule.testIntegration.mockResolvedValue(true);
    const result = await module.testIntegration();

    expect(result).toBe(true);
    expect(mockModule.testIntegration).toHaveBeenCalled();
  });
});
