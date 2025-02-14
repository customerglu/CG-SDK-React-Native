#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = COLORS.reset) {
  console.log(color + message + COLORS.reset);
}

function executeCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`Error: ${errorMessage}`, COLORS.red);
    log(error.message, COLORS.red);
    return false;
  }
}

async function main() {
  log(
    '\n🚀 Starting codegen for CustomerGlu SDK...',
    COLORS.bright + COLORS.blue
  );

  // Clean previous generated files
  log('\n🧹 Cleaning previous generated files...', COLORS.yellow);
  const paths = [
    'lib',
    'android/build',
    'android/generated',
    'ios/build',
    'ios/generated',
  ];

  paths.forEach((p) => {
    try {
      if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
        log(`✅ Cleaned ${p}`, COLORS.green);
      }
    } catch (error) {
      log(`⚠️  Failed to clean ${p}: ${error.message}`, COLORS.yellow);
    }
  });

  // Generate TypeScript definitions
  log('\n📝 Generating TypeScript definitions...', COLORS.yellow);
  if (
    !executeCommand(
      'npx tsc --emitDeclarationOnly --declaration --declarationDir lib/typescript',
      'Failed to generate TypeScript definitions'
    )
  ) {
    process.exit(1);
  }
  log('✅ TypeScript definitions generated', COLORS.green);

  // Generate Android codegen
  log('\n🤖 Generating Android codegen...', COLORS.yellow);
  if (
    !executeCommand(
      'node node_modules/react-native/scripts/generate-codegen-artifacts.js \
        --path . \
        --outputPath ./android/generated \
        --libraryName customerglu \
        --javaPackageName com.reactnativerncustomerglu',
      'Failed to generate Android codegen'
    )
  ) {
    process.exit(1);
  }
  log('✅ Android codegen generated', COLORS.green);

  // Generate iOS codegen
  log('\n🍎 Generating iOS codegen...', COLORS.yellow);
  if (
    !executeCommand(
      'node node_modules/react-native/scripts/generate-codegen-artifacts.js \
        --path . \
        --outputPath ./ios/generated \
        --libraryName Rncustomerglu \
        --libraryType modules',
      'Failed to generate iOS codegen'
    )
  ) {
    process.exit(1);
  }
  log('✅ iOS codegen generated', COLORS.green);

  // Build the library
  log('\n📦 Building library...', COLORS.yellow);
  if (!executeCommand('npm run prepare', 'Failed to build library')) {
    process.exit(1);
  }
  log('✅ Library built', COLORS.green);

  log('\n✨ Codegen completed successfully!', COLORS.bright + COLORS.green);
  log('\nNext steps:', COLORS.bright);
  log('1. For iOS: Run `cd ios && pod install`');
  log('2. For Android: Run `cd android && ./gradlew clean`');
  log('3. Rebuild your app\n');
}

// Make script executable
try {
  fs.chmodSync(__filename, '755');
} catch (error) {
  log('⚠️  Could not make script executable:', COLORS.yellow);
  log(error.message, COLORS.yellow);
}

// Run the script
main().catch((error) => {
  log('\n❌ Codegen failed!', COLORS.bright + COLORS.red);
  log(error.message, COLORS.red);
  process.exit(1);
});
