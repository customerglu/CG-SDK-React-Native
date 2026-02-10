# CustomerGlu React Native SDK

CustomerGlu SDK for React Native provides in-app gamification, rewards, and engagement campaigns with a unified API across iOS and Android.

**Current Version:** 4.0.0

## Requirements

### iOS
- iOS 14.0+
- Xcode 13.0+

### Android
- API 21 (Android 5.0)+
- `minSdkVersion 21` in your app's `build.gradle`

## Installation

```bash
npm install @customerglu/react-native-customerglu
```

Or with yarn:

```bash
yarn add @customerglu/react-native-customerglu
```

### iOS Setup

```bash
cd ios && pod install
```

### Android Setup

Add to your project-level `build.gradle`:

```gradle
allprojects {
    repositories {
        mavenCentral()
    }
}
```

## Initialization

```typescript
import { CustomerGlu } from '@customerglu/react-native-customerglu';

// Register user
await CustomerGlu.registerDevice('user-123');

// Open wallet
CustomerGlu.openWallet();

// Load campaigns
CustomerGlu.loadAllCampaigns();

// Send custom event
CustomerGlu.sendEventData({ eventName: 'purchase', eventProperties: { amount: 99 } });
```

## Key Features

- **Cross-platform**: Single API for iOS and Android
- **Entry Points**: Floating buttons, banners, embedded views
- **Campaign Display**: Bottom sheets, popups, full-screen campaigns
- **Real-time Updates**: SSE-based live nudges
- **Deep Linking**: Handle campaign navigation
- **Analytics**: Event tracking and diagnostics

## Documentation

Full documentation: [https://docs.customerglu.com/sdk/mobile-sdks#react-native](https://docs.customerglu.com/sdk/mobile-sdks#react-native)
