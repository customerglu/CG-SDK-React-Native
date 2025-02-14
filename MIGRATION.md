# Migration Guide to New Architecture

This guide helps you migrate your application to use the new React Native architecture (Fabric & TurboModules) with CustomerGlu SDK.

## Requirements

- React Native 0.71.0 or newer
- Node.js 18 or newer
- Xcode 14 or newer (for iOS)
- Android Studio Flamingo or newer (for Android)
- CocoaPods 1.12 or newer (for iOS)

## Steps to Migrate

### 1. Update Dependencies

Update your package.json:

```json
{
  "dependencies": {
    "@customerglu/react-native-customerglu": "latest",
    "react": "18.2.0",
    "react-native": "0.73.1"
  }
}
```

### 2. Enable New Architecture

#### For iOS:

1. Update your Podfile:
```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '15.0'
prepare_react_native_project!

# Enable the New Architecture
ENV['RCT_NEW_ARCH_ENABLED'] = '1'

target 'YourApp' do
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true,
    :fabric_enabled => true,
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
end

post_install do |installer|
  react_native_post_install(installer)
  __apply_Xcode_12_5_M1_post_install_workaround(installer)
  
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
      config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'RCT_NEW_ARCH_ENABLED=1'
    end
  end
end
```

2. Run pod install:
```bash
cd ios && pod install && cd ..
```

#### For Android:

1. Update android/gradle.properties:
```properties
newArchEnabled=true
```

2. Clean and rebuild:
```bash
cd android && ./gradlew clean && cd ..
```

### 3. Update Code

#### Previous Usage:
```typescript
import CustomerGlu from '@customerglu/react-native-customerglu';

// Initialize SDK
await CustomerGlu.initCGSDK('development');

// Register user
await CustomerGlu.registerDevice({
  userId: 'user123',
  userName: 'John Doe'
});

// Load campaign
await CustomerGlu.loadCampaignById('campaign123');
```

#### New Usage:
```typescript
import {
  initCGSDK,
  registerDevice,
  loadCampaignById,
  type NudgeConfiguration
} from '@customerglu/react-native-customerglu';

// Initialize SDK
await initCGSDK('development');

// Register user
await registerDevice({
  userId: 'user123',
  userName: 'John Doe'
});

// Load campaign with configuration
const config = {
  nudgeConfiguration: {
    layout: 'default'
  }
};
await loadCampaignById('campaign123', config);
```

### 4. Update Banner Components

#### Previous Usage:
```jsx
import { BannerWidget } from '@customerglu/react-native-customerglu';

function MyComponent() {
  return <BannerWidget bannerId="banner123" />;
}
```

#### New Usage:
```jsx
import { BannerWidget } from '@customerglu/react-native-customerglu';

function MyComponent() {
  return (
    <BannerWidget
      bannerId="banner123"
      style={{ width: '100%', height: 200 }}
    />
  );
}
```

### 5. Testing

1. Run the example app:
```bash
cd example
npm install
npm run ios   # or npm run android
```

2. Verify functionality:
- SDK initialization
- User registration
- Campaign loading
- Banner rendering
- Analytics events
- Deep linking

### Common Issues

1. Pod install fails:
   - Clean the build: `cd ios && rm -rf Pods Podfile.lock build && pod install`
   - Update CocoaPods: `gem install cocoapods`

2. Android build fails:
   - Clean the build: `cd android && ./gradlew clean`
   - Update Gradle: Check android/gradle/wrapper/gradle-wrapper.properties

3. TypeScript errors:
   - Update tsconfig.json to support new architecture
   - Run `npm install @types/react-native@latest`

### Need Help?

If you encounter any issues during migration:
1. Check our [GitHub issues](https://github.com/customerglu/CG-SDK-React-Native/issues)
2. Join our [Discord community](https://discord.gg/customerglu)
3. Contact support@customerglu.com

## Breaking Changes

1. Module methods are now individually imported
2. Configuration objects are strictly typed
3. Banner components require explicit styling
4. All async methods return Promises
5. Event data requires specific formats

## New Features

1. Improved type safety
2. Better performance with TurboModules
3. Reduced bundle size
4. Enhanced debugging capabilities
5. Native animations with Fabric

## Rollback

If you need to rollback:
1. Disable new architecture flags
2. Revert dependency versions
3. Clean and rebuild
4. Use previous SDK version

Remember to test thoroughly in both development and production environments after migration.
