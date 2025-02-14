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
  log('\n🧪 Testing CustomerGlu Example App...', COLORS.bright + COLORS.blue);

  // Step 1: Verify new architecture is enabled
  log('\n📝 Checking new architecture configuration...', COLORS.yellow);

  // Check Android configuration
  const androidGradleProps = path.join(
    __dirname,
    '../android/gradle.properties'
  );
  if (fs.existsSync(androidGradleProps)) {
    const content = fs.readFileSync(androidGradleProps, 'utf8');
    if (!content.includes('newArchEnabled=true')) {
      log('❌ New architecture not enabled in Android', COLORS.red);
      log(
        'Add newArchEnabled=true to android/gradle.properties',
        COLORS.yellow
      );
      process.exit(1);
    }
  }

  // Check iOS configuration
  const podfile = path.join(__dirname, '../ios/Podfile');
  if (fs.existsSync(podfile)) {
    const content = fs.readFileSync(podfile, 'utf8');
    if (!content.includes("ENV['RCT_NEW_ARCH_ENABLED'] = '1'")) {
      log('❌ New architecture not enabled in iOS', COLORS.red);
      log(
        "Add ENV['RCT_NEW_ARCH_ENABLED'] = '1' to ios/Podfile",
        COLORS.yellow
      );
      process.exit(1);
    }
  }

  log('✅ New architecture configuration verified', COLORS.green);

  // Step 2: Install dependencies
  log('\n📦 Installing dependencies...', COLORS.yellow);
  if (
    !executeCommand(
      'npm install --legacy-peer-deps',
      'Failed to install dependencies'
    )
  ) {
    process.exit(1);
  }
  log('✅ Dependencies installed', COLORS.green);

  // Step 3: Run TypeScript checks
  log('\n📝 Running TypeScript checks...', COLORS.yellow);
  if (!executeCommand('npm run typescript', 'TypeScript checks failed')) {
    process.exit(1);
  }
  log('✅ TypeScript checks passed', COLORS.green);

  // Step 4: Run tests
  log('\n🧪 Running tests...', COLORS.yellow);
  if (!executeCommand('npm test', 'Tests failed')) {
    process.exit(1);
  }
  log('✅ Tests passed', COLORS.green);

  // Step 5: Build Android (if platform is available)
  if (fs.existsSync(path.join(__dirname, '../android'))) {
    log('\n🤖 Building Android...', COLORS.yellow);
    if (
      !executeCommand(
        'cd android && ./gradlew clean build',
        'Android build failed'
      )
    ) {
      process.exit(1);
    }
    log('✅ Android build completed', COLORS.green);
  }

  // Step 6: Build iOS (if platform is available and on macOS)
  if (
    process.platform === 'darwin' &&
    fs.existsSync(path.join(__dirname, '../ios'))
  ) {
    log('\n🍎 Building iOS...', COLORS.yellow);
    if (!executeCommand('cd ios && pod install', 'Pod installation failed')) {
      process.exit(1);
    }
    log('✅ iOS build completed', COLORS.green);
  }

  log(
    '\n✨ Example app tests completed successfully!',
    COLORS.bright + COLORS.green
  );
  log('\nNext steps:', COLORS.bright);
  log('1. Run the example app:');
  log('   - Android: npm run android');
  log('   - iOS: npm run ios');
  log('2. Test the CustomerGlu SDK features');
  log('3. Check the migration guide for any additional steps\n');
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
  log('\n❌ Example app tests failed!', COLORS.bright + COLORS.red);
  log(error.message, COLORS.red);
  process.exit(1);
});
