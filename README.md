<p align="center">
  <h1 align="center">CustomerGlu React Native SDK</h1>
  <p align="center">In-app gamification, rewards, and engagement campaigns for React Native — unified API across iOS and Android.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@customerglu/react-native-customerglu"><img src="https://img.shields.io/npm/v/@customerglu/react-native-customerglu?label=npm&color=blue" alt="npm"></a>
  <a href="https://docs.customerglu.com/sdk/mobile-sdks#react-native"><img src="https://img.shields.io/badge/docs-customerglu.com-green" alt="Documentation"></a>
  <a href="https://github.com/customerglu/CG-SDK-React-Native/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="License"></a>
</p>

<p align="center">
  <b>All CustomerGlu SDKs share the same version number.</b><br>
  iOS <code>4.1.0</code> · Android <code>4.1.0</code> · React Native <code>4.1.0</code>
</p>

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Banner Widgets](#banner-widgets)
- [Features](#features)
- [What's New in 4.1.0](#whats-new-in-400)
- [Troubleshooting](#troubleshooting)
- [Native SDKs](#native-sdks)
- [Documentation](#documentation)

---

## Requirements

| Platform | Minimum |
|----------|---------|
| React Native | 0.71+ |
| iOS | 14.0+ / Xcode 13+ |
| Android | API 21 (Android 5.0)+ |
| Node.js | 16+ |

---

## Installation

### npm

```bash
npm install @customerglu/react-native-customerglu
```

### Yarn

```bash
yarn add @customerglu/react-native-customerglu
```

### iOS Setup

Install the native CocoaPods dependency:

```bash
cd ios && pod install && cd ..
```

The React Native SDK automatically pulls in the native iOS SDK (`CustomerGlu 4.1.0`) via CocoaPods.

### Android Setup

The native Android SDK (`com.customerglu:CustomerGluLibrary:4.1.0`) is resolved automatically via Maven Central.

Ensure `mavenCentral()` is in your **project-level** `build.gradle` (or `settings.gradle`):

```gradle
// build.gradle (project)
allprojects {
    repositories {
        mavenCentral()
    }
}
```

```gradle
// OR settings.gradle (newer projects)
dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}
```

No additional Android configuration is required.

---

## Quick Start

### 1. Configure Your Write Key

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

You can find your write key in the [CustomerGlu Dashboard](https://dashboard.customerglu.com) under **Settings → SDK Keys**.

### 2. Register a User

```typescript
import { CustomerGlu } from '@customerglu/react-native-customerglu';

// Register user (call once after login / app launch)
await CustomerGlu.registerDevice('user-123');
```

### 3. Common Operations

```typescript
// Open the rewards wallet
CustomerGlu.openWallet();

// Load all campaigns
CustomerGlu.loadAllCampaigns();

// Send a custom event
CustomerGlu.sendEventData({
  eventName: 'purchase',
  eventProperties: { amount: 99 },
});

// Update user attributes
CustomerGlu.updateProfile({ plan: 'premium' });
```

---

## Banner Widgets

Embed native banner widgets in your React Native views using `CGBannerWidget`:

```tsx
import { CGBannerWidget } from '@customerglu/react-native-customerglu';

function HomeScreen() {
  return (
    <CGBannerWidget
      bannerId="home_rewards_banner"
      style={{ width: '100%' }}
    />
  );
}
```

The SDK handles rendering, styling, native widget inflation, and click actions automatically based on your dashboard configuration. Banner height is managed dynamically — native widgets measure their content and resize the React Native container.

---

## Features

| Feature | Description |
|---------|-------------|
| **Cross-platform** | Single TypeScript API for iOS and Android |
| **Entry Points** | Floating buttons, banners, embedded views |
| **Native Widgets** | DYNAMIC_MULTISTEP progress widgets rendered natively (no WebView) |
| **Campaigns** | Bottom sheets, popups, full-screen campaigns |
| **Real-time** | SSE-based live nudges and state updates |
| **Deep Linking** | Campaign navigation handling |
| **Analytics** | Event tracking and diagnostics |
| **Multi-region** | ME, US, and default API endpoints — resolved automatically |

---

## What's New in 4.1.0

- **DYNAMIC_MULTISTEP native rendering** — three widget variants (MS1, MS2, MS3) rendered natively on both iOS and Android instead of WebView for better performance and native feel
- **Auto-height bridge** — native widgets broadcast measured height via `CGBANNER_FINAL_HEIGHT` to resize React Native containers dynamically
- **iOS overflow support** — `clipsToBounds = NO` on the bridge view enables MS3 expand/collapse animation overflow
- **19 configurable nativeStyle fields** — colors, fonts, border radius, shimmer, and more — all controlled via dashboard

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `pod install` fails | Run `pod repo update` then retry; ensure Xcode CLT is installed |
| Android build error | Verify `mavenCentral()` in repositories; ensure Java 17+ |
| Banner not showing | Check `bannerId` matches dashboard config; ensure `registerDevice` succeeded |
| Height not updating | Confirm `CGBannerWidget` has `overflow: 'visible'` in its style if using MS3 expand |
| Module not found | Clear caches: `npx react-native start --reset-cache` |

---

## Native SDKs

The React Native SDK wraps the native SDKs. For advanced customization or standalone native apps:

| Platform | Package | Install |
|----------|---------|---------|
| **iOS** | `CustomerGlu` | [CocoaPods](https://cocoapods.org/pods/CustomerGlu) · [SPM](https://github.com/customerglu/CG-iOS-SDK) |
| **Android** | `com.customerglu:CustomerGluLibrary:4.1.0` | [Maven Central](https://central.sonatype.com/artifact/com.customerglu/CustomerGluLibrary) |

---

## Documentation

Full SDK docs, guides, and API reference:

**[https://docs.customerglu.com/sdk/mobile-sdks#react-native](https://docs.customerglu.com/sdk/mobile-sdks#react-native)**

---

## License

[MIT](LICENSE)
