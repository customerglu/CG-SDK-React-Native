import React from 'react';
import { render, act } from '@testing-library/react-native';
import { TurboModuleRegistry } from 'react-native';
import {
  BannerWidget,
  EmbedBannerWidget,
  initCGSDK,
  registerDevice,
  loadCampaignById,
  type NudgeConfiguration,
} from '@customerglu/react-native-customerglu';

// Define mock module type
interface MockModule {
  initCGSDK: jest.Mock;
  registerDevice: jest.Mock;
  loadCampaignById: jest.Mock;
}

describe('New Architecture Migration', () => {
  const mockModule: MockModule = {
    initCGSDK: jest.fn(),
    registerDevice: jest.fn(),
    loadCampaignById: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (TurboModuleRegistry.getEnforcing as jest.Mock).mockReturnValue(mockModule);
  });

  describe('TurboModule Integration', () => {
    it('should initialize SDK with new architecture', async () => {
      mockModule.initCGSDK.mockResolvedValue(true);
      const result = await initCGSDK('development');

      expect(result).toBe(true);
      expect(mockModule.initCGSDK).toHaveBeenCalledWith('development');
    });

    it('should register device with new architecture', async () => {
      const userData = { userId: 'test-user' };
      mockModule.registerDevice.mockResolvedValue(true);
      const result = await registerDevice(userData);

      expect(result).toBe(true);
      expect(mockModule.registerDevice).toHaveBeenCalledWith(userData);
    });

    it('should load campaign with new architecture', async () => {
      const campaignId = 'test-campaign';
      const config = {
        nudgeConfiguration: { layout: 'default' } as NudgeConfiguration,
      };
      mockModule.loadCampaignById.mockResolvedValue(true);
      const result = await loadCampaignById(campaignId, config);

      expect(result).toBe(true);
      expect(mockModule.loadCampaignById).toHaveBeenCalledWith(
        campaignId,
        config
      );
    });
  });

  describe('Fabric Components', () => {
    it('should render BannerWidget with Fabric', () => {
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" />
      );

      const banner = getByTestId('banner');
      expect(banner).toBeTruthy();
    });

    it('should render EmbedBannerWidget with Fabric', () => {
      const { getByTestId } = render(
        <EmbedBannerWidget testID="embed" bannerId="test-embed" />
      );

      const embed = getByTestId('embed');
      expect(embed).toBeTruthy();
    });

    it('should handle banner props correctly', () => {
      const style = { width: 200, height: 100 };
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" style={style} />
      );

      const banner = getByTestId('banner');
      expect(banner.props.style).toMatchObject(style);
    });

    it('should handle embed banner props correctly', () => {
      const style = { width: 300, height: 200 };
      const { getByTestId } = render(
        <EmbedBannerWidget testID="embed" bannerId="test-embed" style={style} />
      );

      const embed = getByTestId('embed');
      expect(embed.props.style).toMatchObject(style);
    });
  });

  describe('End-to-End Flow', () => {
    it('should handle complete user journey', async () => {
      // Initialize SDK
      mockModule.initCGSDK.mockResolvedValue(true);
      await act(async () => {
        const result = await initCGSDK('development');
        expect(result).toBe(true);
      });

      // Register user
      const userData = { userId: 'test-user' };
      mockModule.registerDevice.mockResolvedValue(true);
      await act(async () => {
        const result = await registerDevice(userData);
        expect(result).toBe(true);
      });

      // Load campaign
      const campaignId = 'test-campaign';
      const config = {
        nudgeConfiguration: { layout: 'default' } as NudgeConfiguration,
      };
      mockModule.loadCampaignById.mockResolvedValue(true);
      await act(async () => {
        const result = await loadCampaignById(campaignId, config);
        expect(result).toBe(true);
      });

      // Render UI components
      const { getByTestId } = render(
        <>
          <BannerWidget testID="banner" bannerId={campaignId} />
          <EmbedBannerWidget testID="embed" bannerId={campaignId} />
        </>
      );

      expect(getByTestId('banner')).toBeTruthy();
      expect(getByTestId('embed')).toBeTruthy();
    });
  });
});
