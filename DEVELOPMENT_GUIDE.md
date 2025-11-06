# CustomerGlu React Native SDK - Development Guide

## 🎯 Quick Start for Taking Over Development

Since you're taking over from a developer who left, this guide will help you understand the complete development chain and get productive quickly.

## 📦 Understanding the Stack

### Dependency Chain
```
Your React Native App
    ↓
@customerglu/react-native-customerglu (this repo - version 3.1.2)
    ↓                           ↓
Android Native SDK         iOS Native SDK
CustomerGluLibrary 3.1.2   CustomerGlu 3.1.6
(Maven Central)            (CocoaPods)
    ↓                           ↓
        CustomerGlu Backend API
        (api-us/eu/in.customerglu.com)
```

### What Each Layer Does

**1. React Native SDK (This Repo)**
- **Purpose**: Bridge between React Native JS and native iOS/Android SDKs
- **Location**: `/Users/prateek/Documents/GitHub/CG-SDK-React-Native`
- **Technology**: TurboModule (New Architecture) with backward compatibility
- **Key Files**:
  - `src/index.tsx` - Public API that developers use
  - `src/NativeReactNativeCustomergluSpec.ts` - TurboModule type definitions
  - `android/src/.../RncustomergluModule.kt` - Android implementation
  - `ios/Rncustomerglu.mm` - iOS implementation

**2. Android Native SDK**
- **Package**: `com.customerglu:CustomerGluLibrary:3.1.2` (Maven)
- **Local Source**: `/Users/prateek/Documents/GitHub/CG-android-SDK-Demo`
- **GitHub**: https://github.com/customerglu/CG-Android-SDK
- **Language**: Kotlin/Java
- **Used in**: `android/build.gradle` line 104

**3. iOS Native SDK**
- **Package**: `CustomerGlu` pod version `3.1.6` (CocoaPods)
- **Local Source**: `/Users/prateek/Documents/GitHub/CG-iOS-SDK`
- **GitHub**: https://github.com/customerglu/CG-iOS-SDK
- **Language**: Swift (with Objective-C bridging)
- **Used in**: `ReactNativeCustomerglu.podspec` line 22

## 🌍 Region Configuration

### How Regions Work

When you initialize the SDK:
```javascript
initCGSDK('us');  // or 'me', 'in'
```

**What happens:**
1. JavaScript calls native module
2. Native SDK configures base URL:
   - `us` → `https://api-us.customerglu.com`
   - `me` → `https://api-me.customerglu.com` (Middle East)
   - `in` → `https://api.customerglu.com` (India - default)

**Code Flow:**
- **Android**: `RncustomergluModule.kt:326` → `CustomerGlu.getInstance().initializeSdk(context, "us")`
- **iOS**: `Rncustomerglu.mm:327` → `CustomerGlu.initializeSdk(myenv: "us")`

## 🛠️ Development Environment Setup

### Prerequisites
- Node.js >= 18
- Yarn 3.6.1
- Xcode 12+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS: `gem install cocoapods`)

### Initial Setup

```bash
# 1. Clone and install dependencies
cd /Users/prateek/Documents/GitHub/CG-SDK-React-Native
yarn install

# 2. Build the SDK
yarn prepare

# 3. Set up example app
cd example
yarn install

# 4. Install iOS pods
cd ios
pod install
cd ../..
```

## 🔄 Development Workflow

### Daily Development Cycle

```bash
# Terminal 1: Start Metro (React Native bundler)
yarn example start

# Terminal 2: Run the app
yarn example android  # For Android
yarn example ios      # For iOS
```

### When You Make Changes

**JavaScript Changes (src/*.tsx):**
1. Edit files in `src/`
2. Hot reload works automatically
3. If adding new exports, run `yarn prepare`

**Native Code Changes (Android/iOS):**
1. Edit Kotlin files in `android/src/`
2. Edit Objective-C++/Swift files in `ios/`
3. Rebuild the app (hot reload won't work):
   ```bash
   # Android
   yarn example android

   # iOS
   yarn example ios
   ```

**Adding New SDK Methods:**
1. Add to `src/NativeReactNativeCustomergluSpec.ts` (TypeScript spec)
2. Implement in `android/.../RncustomergluModule.kt` (with `@ReactMethod`)
3. Implement in `ios/Rncustomerglu.mm` (with `RCT_EXPORT_METHOD`)
4. Export from `src/index.tsx`
5. Run `yarn prepare` to regenerate codegen
6. Test in `example/src/App.tsx`

## 🧪 Testing Your Changes

### Manual Testing Checklist

Use the example app at `example/src/App.tsx` to test:

1. **SDK Initialization:**
   ```javascript
   initCGSDK('us');  // Supported regions: 'us', 'me', 'in'
   ```

2. **User Registration:**
   ```javascript
   await RegisterDevice({
     userId: 'test-user-123',
     firebaseToken: 'fcm-token',
     apnsDeviceToken: '' // iOS only
   });
   ```

3. **Event Tracking:**
   ```javascript
   sendData({
     eventName: 'test_event',
     eventProperties: { key: 'value' }
   });
   ```

4. **Campaign Loading:**
   ```javascript
   loadCampaignById('campaign_id_123');
   ```

5. **Wallet Opening:**
   ```javascript
   openWallet();
   ```

6. **Banner Widget:**
   ```javascript
   <BannerWidget
     style={{height: 100}}
     bannerId="homescreen_banner"
   />
   ```

### Event Listeners to Test

Check that these events fire correctly:

```javascript
const eventEmitter = new NativeEventEmitter(NativeModules.Rncustomerglu);

// Analytics events
eventEmitter.addListener('CUSTOMERGLU_ANALYTICS_EVENT', (data) => {
  console.log('Analytics:', data);
});

// Deep links
eventEmitter.addListener('CUSTOMERGLU_DEEPLINK_EVENT', (data) => {
  console.log('Deeplink:', data);
});

// Banner height updates
eventEmitter.addListener('CGBANNER_FINAL_HEIGHT', (data) => {
  console.log('Banner height:', data);
});
```

### Automated Testing

```bash
# Type checking
yarn typecheck

# Linting
yarn lint

# Unit tests (if any)
yarn test
```

## 🐛 Debugging Tips

### Viewing Logs

**Android:**
```bash
# View all logs
adb logcat

# Filter CustomerGlu logs only
adb logcat | grep CUSTOMERGLU

# Filter React Native logs
adb logcat | grep ReactNative
```

**iOS:**
```bash
# Use Xcode console or
xcrun simctl spawn booted log stream --predicate 'processImagePath contains "example"'
```

### Common Issues

**1. Events not firing:**
- Check `hasListeners` flag in iOS (Rncustomerglu.mm:44)
- Verify BroadcastReceiver registration in Android (RncustomergluModule.kt:73)
- Ensure NativeEventEmitter is created with correct module reference

**2. Native module not found:**
- Check module name is exactly `Rncustomerglu` (case-sensitive)
- Verify native code is linked (run `pod install` for iOS)
- Clean and rebuild: `yarn clean && yarn prepare`

**3. Banner height issues:**
- Listen to `CGBANNER_FINAL_HEIGHT` event
- Update state with received height value
- Check both percentage and absolute values

**4. SSE disconnections:**
- Implement AppState listeners properly:
  ```javascript
  AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'background') {
      disconnectSSEOnBackground();
    } else if (nextAppState === 'active') {
      startSSEOnForeground();
    }
  });
  ```

## 📝 Code Quality

Before committing:

```bash
# 1. Type check
yarn typecheck

# 2. Lint
yarn lint

# 3. Test on both platforms
yarn example android
yarn example ios

# 4. Verify events work
# Check analytics, deeplinks, banner heights

# 5. Test SSE lifecycle
# Background/foreground app transitions
```

## 🚀 Publishing a New Version

### Version Bump Process

```bash
# 1. Update version in package.json (e.g., 3.1.2 → 3.1.3)

# 2. If native SDK versions changed:
#    - Update android/build.gradle line 104
#    - Update ReactNativeCustomerglu.podspec line 22

# 3. Build and test
yarn prepare
yarn example android
yarn example ios

# 4. Commit changes
git add .
git commit -m "chore: bump version to 3.1.3"

# 5. Create release (handles git tag, changelog, npm publish, GitHub release)
yarn release

# This will:
# - Create git tag v3.1.3
# - Generate CHANGELOG.md
# - Push to GitHub
# - Publish to npm
# - Create GitHub release
```

### Publishing to npm

The SDK is published as: `@customerglu/react-native-customerglu`

Registry: https://registry.npmjs.org/ (line 64 in package.json)

## 📚 Accessing Related Repos

Since you're in the same org, you have access to:

1. **Native iOS SDK**
   - Local: `/Users/prateek/Documents/GitHub/CG-iOS-SDK`
   - GitHub: https://github.com/customerglu/CG-iOS-SDK
   - Version: 3.1.6
   - Language: Swift 5.0
   - Published to CocoaPods as "CustomerGlu"

2. **Native Android SDK**
   - Local: `/Users/prateek/Documents/GitHub/CG-android-SDK-Demo`
   - GitHub: https://github.com/customerglu/CG-Android-SDK
   - Version: 3.1.2
   - Language: Kotlin/Java
   - Published to Maven as "com.customerglu:CustomerGluLibrary"

3. **Backend APIs & Services** (from global CLAUDE.md):
   - Paint-API: `/Users/prateek/Github/Paint-Api` - Template/fragment processing
   - Reward-API: `/Users/prateek/Github/Reward-API` - Activities processing
   - Constellation: `/Users/prateek/customerglu/FE-repos/New constellation/constellation` - iframe preview
   - Action Executor: `/Users/prateek/Documents/GitHub/action-executor` - Process segmentation
   - Central Schema: `/Users/prateek/Github/central-schema` - Shared interfaces

## 🆘 Getting Help

### Understanding Native SDK APIs

If you need to add a method that exists in the native SDKs:

1. **For Android**: Look up the method in `CustomerGlu.getInstance()` class
2. **For iOS**: Look up the method in `CustomerGlu` Swift framework
3. Add the bridge method following the pattern in existing code

### Testing with Production API

Use this curl to test user initialization:
```bash
curl --location 'https://api-us.customerglu.com/user/v1/user/sdk?token=true' \
--header 'Content-Type: application/json' \
--data '{
    "userId":"glutest-percentage-reset-test",
    "writeKey":"10666d4bf2ed9519c6ac245e6943ec2717afa042"
}'
```

## 🎓 Understanding the Architecture

### Event Flow (Native → JavaScript)

**Android:**
```
Native SDK Event
    ↓
BroadcastReceiver (RncustomergluModule.kt:76)
    ↓
DeviceEventManagerModule.emit()
    ↓
JavaScript NativeEventEmitter
    ↓
Your listener callback
```

**iOS:**
```
Native SDK Event
    ↓
NSNotificationCenter.post (in CustomerGlu SDK)
    ↓
handleEvent: (Rncustomerglu.mm:37)
    ↓
sendEventWithName:body:
    ↓
JavaScript NativeEventEmitter
    ↓
Your listener callback
```

### Method Call Flow (JavaScript → Native)

**JavaScript:**
```javascript
import { loadCampaignById } from '@customerglu/react-native-customerglu';
loadCampaignById('campaign_123');
```

**Bridge Layer:**
```
src/index.tsx exports →
src/NativeReactNativeCustomergluSpec.ts (TurboModule interface) →
Native implementation (Android/iOS) →
CustomerGlu native SDK method
```

## 📊 Key Metrics to Monitor

When testing, watch for:
- Event emission latency
- Banner rendering time
- SSE connection stability
- Memory usage with multiple banners
- Deep link handling accuracy

## 🔧 Advanced: Updating Native Dependencies

### When Native SDK Updates

**Example: iOS SDK 3.1.6 → 3.1.7**

1. Update podspec:
   ```ruby
   # ReactNativeCustomerglu.podspec line 22
   s.dependency "CustomerGlu", "3.1.7"
   ```

2. Test in example:
   ```bash
   cd example/ios
   pod install
   cd ../..
   yarn example ios
   ```

3. Verify all features still work
4. Update version compatibility in README

**Example: Android SDK 3.1.2 → 3.1.3**

1. Update build.gradle:
   ```gradle
   // android/build.gradle line 104
   implementation 'com.customerglu:CustomerGluLibrary:3.1.3'
   ```

2. Gradle will auto-download on next build
3. Test: `yarn example android`

## 🎯 Next Steps

Now that you understand the complete chain:

1. ✅ Run the example app successfully
2. ✅ Make a small change to verify your setup
3. ✅ Test all event listeners
4. ✅ Review the native SDK docs (if available internally)
5. ✅ Identify what the previous dev was working on (check git log)

Good luck! The SDK is well-structured and you have everything you need to continue development.
