# @customerglu/react-native-customerglu

CustomerGlu React Native SDK with New Architecture (Fabric + TurboModules) Support

## Features

- Full support for React Native's New Architecture
- Optimized performance with TurboModules
- Native UI components built with Fabric
- TypeScript support
- Comprehensive event system
- Cross-platform support (iOS & Android)

## Installation

```sh
npm install @customerglu/react-native-customerglu
# or
yarn add @customerglu/react-native-customerglu
```

## Requirements

- React Native 0.74.0 or higher
- iOS 13.0 or higher
- Android API level 21 or higher
- Node.js 18 or higher
- Xcode 14 or higher (for iOS)
- Android Studio Hedgehog or higher
- JDK 11 or higher
- CMake 3.22.1
- NDK 25.1.8937393

## New Architecture Support

This version includes full support for React Native's New Architecture:
- TurboModules for better native module performance
- Fabric for native UI components
- JSI for direct native communication
- Codegen for type-safe interfaces

To enable the new architecture in your app:

### Android

In `android/gradle.properties`:
```properties
newArchEnabled=true
```

### iOS

In your Podfile:
```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

## Usage

```typescript
import {
  registerDevice,
  sendData,
  BannerWidget,
  EmbedBannerWidget,
} from '@customerglu/react-native-customerglu';

// Initialize SDK
const initializeSDK = async () => {
  await registerDevice({
    userId: 'user123',
    // ... other user data
  });
};

// Use Banner Component
const MyComponent = () => {
  return <BannerWidget bannerId="your-banner-id" />;
};

// Send Events
const sendCustomEvent = () => {
  sendData({
    eventName: 'custom_event',
    eventProperties: {
      // ... event properties
    },
  });
};
```

## Migration

If you're upgrading from an older version, please see our [Migration Guide](./MIGRATION.md) for detailed instructions on migrating to the new architecture.

## API Reference

### Core Methods

- `registerDevice(userData: Object): Promise<boolean>`
- `sendData(data: { eventName: string; eventProperties?: Object }): void`
- `dataClear(): void`
- `testIntegration(): void`

### Campaign Methods

- `loadCampaignById(id: string, config?: Object): void`
- `loadCampaignWithUrl(url: string, config?: Object): void`
- `openWallet(config?: Object): void`

### Configuration Methods

- `initCGSDK(env: string): void`
- `enableAnalytic(enabled: boolean): void`
- `allowAnonymousRegistration(enabled: boolean): void`
- `disableGluSdk(disabled: boolean): void`

### UI Components

#### BannerWidget
```typescript
<BannerWidget bannerId="your-banner-id" />
```

#### EmbedBannerWidget
```typescript
<EmbedBannerWidget bannerId="your-banner-id" />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Support

- Create a [GitHub issue](https://github.com/customerglu/CG-SDK-React-Native/issues) for bug reports, feature requests, or questions
- Follow [@customerglu](https://twitter.com/customerglu) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/customerglu/CG-SDK-React-Native) to support the project!

## Security

If you believe you have found a security vulnerability in CustomerGlu SDK, we encourage you to responsibly disclose this and not open a public issue. Please email security@customerglu.com to disclose any security vulnerabilities.
