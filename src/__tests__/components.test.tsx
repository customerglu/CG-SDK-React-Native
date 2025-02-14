import React from 'react';
import { render } from '@testing-library/react-native';
import BannerWidget from '../specs/BannerWidget';
import EmbedBannerWidget from '../specs/EmbedBannerWidget';

// Mock the native components
jest.mock('../specs/BannerWidget', () => {
  const MockBannerWidget =
    require('react-native/Libraries/Components/View/View').default;
  return MockBannerWidget;
});

jest.mock('../specs/EmbedBannerWidget', () => {
  const MockEmbedBannerWidget =
    require('react-native/Libraries/Components/View/View').default;
  return MockEmbedBannerWidget;
});

describe('CustomerGlu UI Components', () => {
  describe('BannerWidget', () => {
    it('should render with bannerId prop', () => {
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" />
      );

      const banner = getByTestId('banner');
      expect(banner).toBeTruthy();
    });

    it('should handle style prop', () => {
      const style = { width: 200, height: 100 };
      const { getByTestId } = render(
        <BannerWidget testID="banner" bannerId="test-banner" style={style} />
      );

      const banner = getByTestId('banner');
      expect(banner.props.style).toEqual(expect.objectContaining(style));
    });
  });

  describe('EmbedBannerWidget', () => {
    it('should render with bannerId prop', () => {
      const { getByTestId } = render(
        <EmbedBannerWidget testID="embed-banner" bannerId="test-embed" />
      );

      const embedBanner = getByTestId('embed-banner');
      expect(embedBanner).toBeTruthy();
    });

    it('should handle style prop', () => {
      const style = { width: 300, height: 150 };
      const { getByTestId } = render(
        <EmbedBannerWidget
          testID="embed-banner"
          bannerId="test-embed"
          style={style}
        />
      );

      const embedBanner = getByTestId('embed-banner');
      expect(embedBanner.props.style).toEqual(expect.objectContaining(style));
    });

    it('should handle accessibility props', () => {
      const { getByTestId } = render(
        <EmbedBannerWidget
          testID="embed-banner"
          bannerId="test-embed"
          accessible={true}
          accessibilityLabel="Test Banner"
        />
      );

      const embedBanner = getByTestId('embed-banner');
      expect(embedBanner.props.accessible).toBe(true);
      expect(embedBanner.props.accessibilityLabel).toBe('Test Banner');
    });
  });
});
