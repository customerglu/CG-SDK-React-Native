import React from 'react';
import { render, act } from '@testing-library/react-native';
import { TurboModuleRegistry } from 'react-native';
import type { Spec } from '../NativeCustomerGlu';
import BannerWidget from '../specs/BannerWidget';
import EmbedBannerWidget from '../specs/EmbedBannerWidget';

describe('CustomerGlu Integration', () => {
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

  describe('Module and UI Integration', () => {
    it('should initialize SDK and render banner', async () => {
      const module =
        TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
      const bannerId = 'test-banner';

      // Initialize SDK
      mockModule.initCGSDK.mockResolvedValue(true);
      await act(async () => {
        const result = await module.initCGSDK('development');
        expect(result).toBe(true);
      });

      expect(mockModule.initCGSDK).toHaveBeenCalledWith('development');

      // Render banner
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId={bannerId} />
      );

      const banner = getByTestId('banner');
      expect(banner).toBeTruthy();
    });

    it('should handle campaign loading with embed banner', async () => {
      const module =
        TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
      const campaignId = 'test-campaign';
      const config = { nudgeConfiguration: { layout: 'default' } };

      // Load campaign
      mockModule.loadCampaignById.mockResolvedValue(true);
      await act(async () => {
        const result = await module.loadCampaignById(campaignId, config);
        expect(result).toBe(true);
      });

      expect(mockModule.loadCampaignById).toHaveBeenCalledWith(
        campaignId,
        config
      );

      // Render embed banner
      const { getByTestId } = render(
        <EmbedBannerWidget testID="embed-banner" bannerId={campaignId} />
      );

      const embedBanner = getByTestId('embed-banner');
      expect(embedBanner).toBeTruthy();
    });

    it('should handle user registration and event tracking', async () => {
      const module =
        TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
      const userData = { userId: 'test-user' };
      const eventName = 'banner_click';
      const eventProperties = { bannerId: 'test-banner' };

      // Register user
      mockModule.registerDevice.mockResolvedValue(true);
      const registerResult = await module.registerDevice(userData);
      expect(registerResult).toBe(true);
      expect(mockModule.registerDevice).toHaveBeenCalledWith(userData);

      // Track event
      mockModule.sendEventData.mockResolvedValue(true);
      const eventResult = await module.sendEventData(
        eventName,
        eventProperties
      );
      expect(eventResult).toBe(true);
      expect(mockModule.sendEventData).toHaveBeenCalledWith(
        eventName,
        eventProperties
      );

      // Render banner after registration
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" />
      );

      const banner = getByTestId('banner');
      expect(banner).toBeTruthy();
    });

    it('should handle error scenarios gracefully', async () => {
      const module =
        TurboModuleRegistry.getEnforcing<Spec>('NativeCustomerGlu');
      const userData = { userId: 'invalid-user' };

      // Simulate registration failure
      mockModule.registerDevice.mockResolvedValue(false);
      const registerResult = await module.registerDevice(userData);
      expect(registerResult).toBe(false);

      // Should still render banner even if registration failed
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" />
      );

      const banner = getByTestId('banner');
      expect(banner).toBeTruthy();
    });
  });
});
