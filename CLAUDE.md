# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the CustomerGlu React Native SDK - a turbo module that bridges the native CustomerGlu iOS (Swift) and Android (Kotlin) SDKs to React Native applications. The SDK provides campaign management, analytics events, notifications, banner widgets, and wallet functionality.

**Package**: `@customerglu/react-native-customerglu`
**Current Version**: 3.1.2
**Native Dependencies**:
- Android: `CustomerGluLibrary:3.1.2` (Maven Central)
  - Source: `/Users/prateek/Documents/GitHub/CG-android-SDK-Demo`
  - GitHub: https://github.com/customerglu/CG-Android-SDK
- iOS: `CustomerGlu:3.1.6` (CocoaPods)
  - Source: `/Users/prateek/Documents/GitHub/CG-iOS-SDK`
  - GitHub: https://github.com/customerglu/CG-iOS-SDK

## Development Commands

### Building and Testing

```bash
# Build the library (required before publishing)
yarn prepare

# Run type checking
yarn typecheck

# Run linting
yarn lint

# Run tests
yarn test

# Clean build artifacts
yarn clean
```

### Example App Development

```bash
# Run example app on Android
yarn example android

# Run example app on iOS
yarn example ios

# Start Metro bundler for example app
yarn example start
```

### Publishing

```bash
# Create a new release (handles versioning, changelog, git tags, npm publish, GitHub release)
yarn release
```

## Architecture

### Module Structure

The SDK uses React Native's New Architecture (Turbo Modules with Codegen):

1. **JavaScript Layer** (`src/`):
   - `index.tsx` - Main entry point, exports all SDK functions and components
   - `NativeReactNativeCustomerglu.ts` - TurboModule spec (generated code interfaces)

2. **Native Android Layer** (`android/src/main/java/com/customerglu/reactnativecustomerglu/`):
   - `RncustomergluModule.kt` - Main native module implementing all SDK methods
   - `BannerView.kt` / `BannerViewManager.kt` - Banner widget view component
   - `CGEmbededView.kt` / `CGEmbededViewManager.kt` - Embed widget view component
   - `RncustomergluPackage.kt` - Package registration

3. **Native iOS Layer** (`ios/`):
   - `Rncustomerglu.mm` - Main native module (Objective-C++)
   - `IosBannerView.mm` / `IosBannerViewManager.mm` - Banner widget view component
   - `ReactNativeCustomerglu-Bridging-Header.h` - Swift bridging header
   - `generated/` - Codegen output for New Architecture

### Key Concepts

#### Event Bridge Pattern
The SDK uses native event emitters to communicate asynchronously from native to JavaScript:

**Events emitted**:
- `CUSTOMERGLU_ANALYTICS_EVENT` - Analytics/tracking events from campaigns
- `CUSTOMERGLU_DEEPLINK_EVENT` - Deep link navigation requests
- `CGBANNER_FINAL_HEIGHT` - Banner height updates for layout
- `CGEMBED_FINAL_HEIGHT` - Embed widget height updates
- `CUSTOMERGLU_BANNER_LOADED` - Banner load completion
- `CG_INVALID_CAMPAIGN_ID` - Invalid campaign error
- `CG_UNI_DEEPLINK_EVENT` - Universal deep link events

**Android**: Uses `BroadcastReceiver` + `DeviceEventManagerModule`
**iOS**: Uses `NSNotificationCenter` + `RCTEventEmitter`

#### Native Components
Two custom view components are exposed:
- `BannerWidget` - Campaign banner display (requires `bannerId` prop)
- `EmbedBannerWidget` - Embedded campaign view (requires `embedId` prop)

These components handle their own height calculation and emit height update events.

#### SSE (Server-Sent Events)
The SDK includes SSE connection management for real-time updates:
- `startSSEOnForeground()` - Resume SSE when app comes to foreground
- `disconnectSSEOnBackground()` - Disconnect SSE when app goes to background
- `setSSETimeout(time)` - Configure SSE timeout

Should be integrated with React Native's `AppState` for proper lifecycle management.

#### Region Configuration
The SDK supports three regions:
- `us` - United States → `https://api-us.customerglu.com`
- `me` - Middle East → `https://api-me.customerglu.com`
- `in` - India (default) → `https://api.customerglu.com`

Pass the region code to `initCGSDK(region)` during initialization. The native SDKs will configure all endpoints (API, events, stream, analytics, diagnostics) for the specified region.

## Common Workflows

### Adding a New SDK Method

1. Add method signature to `src/NativeReactNativeCustomerglu.ts` TurboModule spec
2. Implement in `android/.../RncustomergluModule.kt` with `@ReactMethod` annotation
3. Implement in `ios/Rncustomerglu.mm` with `RCT_EXPORT_METHOD` macro
4. Export from `src/index.tsx`
5. Run `yarn prepare` to regenerate codegen
6. Test in example app

### Working with Native Dependencies

**Android**: Update version in `android/build.gradle` line 104:
```gradle
implementation 'com.customerglu:CustomerGluLibrary:3.1.2'
```

**iOS**: Update version in `ReactNativeCustomerglu.podspec` line 22:
```ruby
s.dependency "CustomerGlu", "3.1.6"
```

After updating, test thoroughly in example app before releasing.

### Debugging Native Events

Events may fail silently if listeners aren't properly registered. Check:

1. **Android**: Verify `BroadcastReceiver` registration in module init
2. **iOS**: Verify `startObserving` is called and `hasListeners` flag is true
3. **JavaScript**: Ensure `NativeEventEmitter` is created with correct module reference
4. Check event name spelling matches exactly between native and JS

## Build Configuration

### TypeScript

- `tsconfig.json` - Development config with strict mode enabled
- `tsconfig.build.json` - Build config (extends main, excludes example/lib)

### React Native Builder Bob

Outputs to `lib/` with multiple targets:
- CommonJS (`lib/commonjs/`)
- ES Modules (`lib/module/`)
- TypeScript declarations (`lib/typescript/`)
- Codegen output

### New Architecture Support

Enabled via `codegenConfig` in package.json. Generated code outputs to:
- Android: `android/generated/`
- iOS: `ios/generated/`

The module works with both Old and New Architecture via compatibility layer.

## Example App

Located in `example/` directory - a workspace-based monorepo setup using Yarn workspaces.

Key files:
- `example/src/App.tsx` - Full integration example showing:
  - SDK initialization with `initCGSDK(region)`
  - Device registration with `RegisterDevice(userData)`
  - Event listener setup for analytics and deep links
  - Banner component usage with dynamic height
  - SSE lifecycle management with AppState
  - Campaign loading and wallet opening

## Testing Checklist

Before releasing changes:

1. Test both Android and iOS in example app
2. Verify all event listeners work (analytics, deeplinks, banner height)
3. Test banner/embed widget rendering and height updates
4. Verify SSE connections (foreground/background transitions)
5. Test with both Old and New Architecture if possible
6. Run `yarn typecheck` and `yarn lint`
7. Update version in package.json
8. Update native dependency versions if needed

## Known Implementation Details

- **Module Name**: Native module must be accessed as `NativeModules.Rncustomerglu` (note capitalization)
- **Banner Height**: Banners emit height as percentage or absolute value depending on native SDK configuration
- **Platform Differences**: iOS requires data parsing in deeplink events (`data.data`), Android doesn't
- **Min Versions**: iOS 12.0+, Android API 21+
- **Workspaces**: This is a Yarn workspace; the example app references the SDK via workspace protocol

## Related Repositories

### Native SDKs (Dependencies)

**iOS Native SDK:**
- Local Path: `/Users/prateek/Documents/GitHub/CG-iOS-SDK`
- GitHub: https://github.com/customerglu/CG-iOS-SDK
- Version: 3.1.6
- Language: Swift 5.0
- Distribution: CocoaPods as "CustomerGlu"
- Min iOS: 14.0
- Dependencies: lottie-ios >= 4.0.0

**Android Native SDK:**
- Local Path: `/Users/prateek/Documents/GitHub/CG-android-SDK-Demo`
- GitHub: https://github.com/customerglu/CG-Android-SDK
- Version: 3.1.2
- Language: Kotlin/Java
- Distribution: Maven Central as "com.customerglu:CustomerGluLibrary"
- Min API: 21

### Backend & Related Services

Per your global CLAUDE.md context:
- Paint-API: `/Users/prateek/Github/Paint-Api` - Template/fragment processing
- Reward-API: `/Users/prateek/Github/Reward-API` - Activities processing
- Constellation: `/Users/prateek/customerglu/FE-repos/New constellation/constellation` - iframe preview components
- Action Executor: `/Users/prateek/Documents/GitHub/action-executor` - Process segmentation
- Central Schema: `/Users/prateek/Github/central-schema` - Shared interfaces for backend services
