#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the script is executable
try {
  fs.chmodSync(__filename, '755');
} catch (error) {
  console.warn('Could not make script executable:', error.message);
}

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const CODEGEN_DIR = path.join(ROOT_DIR, 'node_modules', 'react-native', 'scripts');
const CODEGEN_CONFIG = path.join(ROOT_DIR, 'package.json');

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
    execSync(command, { stdio: 'inherit', cwd: ROOT_DIR });
    return true;
  } catch (error) {
    log(`Error: ${errorMessage}`, COLORS.red);
    log(error.message, COLORS.red);
    return false;
  }
}

async function main() {
  log('\n🚀 Starting codegen for CustomerGlu SDK...', COLORS.bright + COLORS.blue);

  // Check if package.json exists and has codegen config
  if (!fs.existsSync(CODEGEN_CONFIG)) {
    log('Error: package.json not found!', COLORS.red);
    process.exit(1);
  }

  const packageJson = require(CODEGEN_CONFIG);
  if (!packageJson.codegenConfig) {
    log('Error: codegenConfig not found in package.json!', COLORS.red);
    process.exit(1);
  }

  // Clean previous build
  log('\n🧹 Cleaning previous build...', COLORS.yellow);
  executeCommand('rm -rf lib', 'Failed to clean lib directory');

  // Generate code for iOS
  log('\n🍎 Generating code for iOS...', COLORS.yellow);
  if (executeCommand(
    'node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ./ios/generated',
    'Failed to generate iOS code'
  )) {
    log('✅ iOS codegen completed successfully', COLORS.green);
  }

  // Generate code for Android
  log('\n🤖 Generating code for Android...', COLORS.yellow);
  if (executeCommand(
    'node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ./android/generated',
    'Failed to generate Android code'
  )) {
    log('✅ Android codegen completed successfully', COLORS.green);
  }

  // Run TypeScript build
  log('\n📦 Building TypeScript...', COLORS.yellow);
  if (executeCommand('yarn tsc --build', 'Failed to build TypeScript')) {
    log('✅ TypeScript build completed successfully', COLORS.green);
  }

  log('\n✨ Codegen completed!', COLORS.bright + COLORS.green);
  log('\nNext steps:', COLORS.bright);
  log('1. For iOS: Run `cd ios && pod install`');
  log('2. For Android: Run `cd android && ./gradlew clean`');
  log('3. Rebuild your app\n');
}

// Run the script
main().catch((error) => {
  log('\n❌ Codegen failed!', COLORS.bright + COLORS.red);
  log(error.message, COLORS.red);
  process.exit(1);
});
