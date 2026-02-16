# CustomerGlu React Native SDK

In-app gamification, rewards, and engagement campaigns for React Native — unified API across iOS and Android.

**Version:** `4.0.0`

> **All CustomerGlu SDKs share the same version number.**
> iOS `4.0.0` · Android `4.0.0` · React Native `4.0.0`

## Requirements

| Platform | Minimum |
|----------|---------|
| iOS | 14.0+ / Xcode 13+ |
| Android | API 21 (Android 5.0)+ |
| React Native | 0.71+ |

## Installation

```bash
npm install @customerglu/react-native-customerglu
```

```bash
# or with yarn
yarn add @customerglu/react-native-customerglu
```

### iOS Setup

```bash
cd ios && pod install
```

The React Native SDK automatically pulls in the native iOS SDK (`CustomerGlu 4.0.0`) via CocoaPods.

### Android Setup

The native Android SDK (`com.customerglu:CustomerGluLibrary:4.0.0`) is pulled automatically via Maven Central. Ensure `mavenCentral()` is in your project-level `build.gradle`:

```gradle
allprojects {
    repositories {
        mavenCentral()
    }
}
```

## Quick Start

### 1. Configure Write Key

#### iOS — `Info.plist`
```xml
<key>CUSTOMERGLU_WRITE_KEY</key>
<string>YOUR_WRITE_KEY</string>
```

#### Android — `AndroidManifest.xml`
```xml
<meta-data
    android:name="CUSTOMERGLU_WRITE_KEY"
    android:value="YOUR_WRITE_KEY" />
```

### 2. Initialize & Use

```typescript
import { CustomerGlu } from '@customerglu/react-native-customerglu';

// Register user
await CustomerGlu.registerDevice('user-123');

// Open the rewards wallet
CustomerGlu.openWallet();

// Load all campaigns
CustomerGlu.loadAllCampaigns();

// Send a custom event
CustomerGlu.sendEventData({
  eventName: 'purchase',
  eventProperties: { amount: 99 }
});

// Update user attributes
CustomerGlu.updateProfile({ plan: 'premium' });
```

## Features

| Feature | Description |
|---------|-------------|
| Cross-platform | Single TypeScript API for iOS and Android |
| Entry Points | Floating buttons, banners, embedded views |
| Campaigns | Bottom sheets, popups, full-screen campaigns |
| Real-time | SSE-based live nudges |
| Deep Linking | Campaign navigation handling |
| Analytics | Event tracking and diagnostics |

## What's New in 4.0.0

- **DYNAMIC_MULTISTEP native rendering** — three widget variants rendered natively on both iOS and Android (no WebView)
- **`clipsToBounds = NO`** on iOS bridge — enables MS3 expand/collapse overflow without clipping
- **Auto-height bridge** — native widgets broadcast measured height via `CGBANNER_FINAL_HEIGHT` to resize RN containers dynamically

## Native SDKs

The React Native SDK wraps the native SDKs. For advanced native customization, refer to:

| Platform | Package | Install |
|----------|---------|---------|
| **iOS** | `CustomerGlu` | [CocoaPods](https://cocoapods.org/pods/CustomerGlu) · [SPM](https://github.com/customerglu/CG-iOS-SDK) |
| **Android** | `com.customerglu:CustomerGluLibrary:4.0.0` | [Maven Central](https://central.sonatype.com/artifact/com.customerglu/CustomerGluLibrary) |

## Documentation

[https://docs.customerglu.com/sdk/mobile-sdks#react-native](https://docs.customerglu.com/sdk/mobile-sdks#react-native)
