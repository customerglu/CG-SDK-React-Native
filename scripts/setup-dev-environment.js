#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
    log('\n🚀 Setting up development environment for CustomerGlu SDK...', COLORS.bright + COLORS.blue);

    // Check Node.js version
    const nodeVersion = process.version;
    log(`\nNode.js version: ${nodeVersion}`, COLORS.yellow);
    if (nodeVersion.split('.')[0] < 'v18') {
        log('❌ Node.js 18 or higher is required', COLORS.red);
        process.exit(1);
    }
    log('✅ Node.js version check passed', COLORS.green);

    // Check for required build tools
    log('\n📦 Checking build tools...', COLORS.yellow);

    if (os.platform() === 'darwin') {  // macOS
        // Check Xcode
        try {
            execSync('xcodebuild -version');
            log('✅ Xcode is installed', COLORS.green);
        } catch (error) {
            log('❌ Xcode is not installed', COLORS.red);
            log('Please install Xcode from the App Store', COLORS.yellow);
        }

        // Check CocoaPods
        try {
            execSync('pod --version');
            log('✅ CocoaPods is installed', COLORS.green);
        } catch (error) {
            log('❌ CocoaPods is not installed', COLORS.red);
            log('Install CocoaPods: sudo gem install cocoapods', COLORS.yellow);
        }
    }

    // Check Android tools
    try {
        const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
        if (!androidHome) {
            throw new Error('ANDROID_HOME not set');
        }
        log('✅ Android SDK is configured', COLORS.green);

        // Check NDK
        const ndkVersion = '25.1.8937393';
        const ndkPath = path.join(androidHome, 'ndk', ndkVersion);
        if (!fs.existsSync(ndkPath)) {
            log(`❌ Android NDK ${ndkVersion} not found`, COLORS.red);
            log('Please install the NDK using Android Studio SDK Manager', COLORS.yellow);
        } else {
            log('✅ Android NDK is installed', COLORS.green);
        }

        // Check CMake
        try {
            execSync('cmake --version');
            log('✅ CMake is installed', COLORS.green);
        } catch (error) {
            log('❌ CMake is not installed', COLORS.red);
            log('Please install CMake using Android Studio SDK Manager', COLORS.yellow);
        }
    } catch (error) {
        log('❌ Android SDK setup incomplete', COLORS.red);
        log('Please install Android Studio and configure ANDROID_HOME', COLORS.yellow);
    }

    // Install dependencies
    log('\n📥 Installing dependencies...', COLORS.yellow);
    executeCommand('yarn install', 'Failed to install dependencies');

    // Generate codegen files
    log('\n🔧 Generating codegen files...', COLORS.yellow);
    executeCommand('yarn codegen', 'Failed to generate codegen files');

    log('\n✨ Setup complete!', COLORS.bright + COLORS.green);
    log('\nNext steps:', COLORS.bright);
    log('1. For iOS: Run `cd ios && pod install`');
    log('2. For Android: Run `cd android && ./gradlew clean`');
    log('3. Build your app with the new architecture enabled\n');
}

// Run the script
main().catch((error) => {
    log('\n❌ Setup failed!', COLORS.bright + COLORS.red);
    log(error.message, COLORS.red);
    process.exit(1);
});
