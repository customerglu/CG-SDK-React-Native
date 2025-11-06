#!/bin/bash
set -e

echo "📦 Installing CocoaPods dependencies..."
cd ios
/opt/homebrew/bin/pod install
cd ..

echo "🏗️  Building iOS app..."
xcodebuild -workspace ios/ReactNativeCustomergluExample.xcworkspace \
  -scheme ReactNativeCustomergluExample \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -derivedDataPath ios/build \
  -quiet

echo "📱 Installing and launching app..."
xcrun simctl install booted ios/build/Build/Products/Debug-iphonesimulator/ReactNativeCustomergluExample.app
xcrun simctl launch booted customerglu.reactnativecustomerglu.example

echo "✅ App launched successfully!"
