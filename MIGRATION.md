# Migration Guide to React Native New Architecture

This guide will help you migrate your app to use the new React Native architecture with CustomerGlu SDK.

## Prerequisites

- React Native 0.74.0 or higher
- Node.js 18 or higher
- Xcode 14 or higher (for iOS)
- Android Studio Hedgehog or higher (for Android)
- JDK 11 or higher
- CMake 3.22.1
- NDK 25.1.8937393

## Steps to Migrate

### 1. Update Dependencies

Update your app's package.json to include the latest version of CustomerGlu SDK:

```json
{
  "dependencies": {
    "@customerglu/react-native-customerglu": "^2.1.1"
  }
}
```

### 2. Enable New Architecture

#### For Android:

1. In `android/gradle.properties`, add:
```properties
newArchEnabled=true
```

2. Update your Android Gradle Plugin version in `android/build.gradle`:
```gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
    }
}
```

#### For iOS:

1. In your Podfile, enable the new architecture:
```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

2. Update your deployment target to iOS 13.0 or higher:
```ruby
platform :ios, '13.0'
```

### 3. Update Import Statements

Replace old imports with new ones:

```typescript
// Old import
import CustomerGlu from 'react-native-customerglu';

// New import
import {
  registerDevice,
  sendData,
  BannerWidget,
  EmbedBannerWidget,
  // ... other methods you need
} from '@customerglu/react-native-customerglu';
```

### 4. Update Method Calls

The methods remain the same, but they're now individually imported:

```typescript
// Old way
await CustomerGlu.registerDevice(userData);

// New way
await registerDevice(userData);
```

### 5. Update Banner Components

```typescript
// Old way
<CustomerGlu.BannerWidget bannerId="your-banner-id" />

// New way
<BannerWidget bannerId="your-banner-id" />
```

### 6. Clean and Rebuild

1. Clean your project:
```bash
# For iOS
cd ios && pod deintegrate && pod cache clean --all
rm -rf ~/Library/Developer/Xcode/DerivedData
pod install

# For Android
cd android && ./gradlew clean
```

2. Rebuild your project:
```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Breaking Changes

1. The default export is removed. All methods and components must be imported individually.
2. Event handling now uses the new architecture's event system.
3. Native UI components (BannerWidget, EmbedBannerWidget) are now Fabric components.

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Make sure all native dependencies are compatible with the new architecture
   - Clean build folders and reinstall dependencies

2. **Runtime Errors**:
   - Verify all imports are updated to the new format
   - Check that event listeners are properly migrated

3. **Native Module Not Found**:
   - Ensure proper linking
   - Rebuild the project

### Getting Help

If you encounter any issues:
1. Check our [GitHub issues](https://github.com/customerglu/CG-SDK-React-Native/issues)
2. Contact CustomerGlu support
3. Join our [Discord community](https://discord.gg/customerglu)

## Additional Resources

- [React Native New Architecture Documentation](https://reactnative.dev/docs/new-architecture-intro)
- [CustomerGlu Documentation](https://docs.customerglu.com)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
