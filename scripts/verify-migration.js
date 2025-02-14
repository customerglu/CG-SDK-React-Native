#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

const ROOT_DIR = path.resolve(__dirname, '..');
const EXAMPLE_DIR = path.join(ROOT_DIR, 'example');

function checkEnvironment() {
  console.log(chalk.blue('🔍 Checking environment...'));

  // Check Node.js version
  const nodeVersion = process.version;
  if (parseInt(nodeVersion.slice(1)) < 18) {
    throw new Error('Node.js 18 or newer is required');
  }
  console.log(chalk.green('✓ Node.js version:', nodeVersion));

  // Check React Native version
  const packageJson = require(path.join(ROOT_DIR, 'package.json'));
  const rnVersion = packageJson.dependencies['react-native'];
  if (parseFloat(rnVersion) < 0.71) {
    throw new Error('React Native 0.71 or newer is required');
  }
  console.log(chalk.green('✓ React Native version:', rnVersion));
}

function checkNewArchitectureFlags() {
  console.log(chalk.blue('\n🔍 Checking New Architecture flags...'));

  // Check iOS flags
  const podfilePath = path.join(EXAMPLE_DIR, 'ios', 'Podfile');
  const podfileContent = fs.readFileSync(podfilePath, 'utf8');

  if (!podfileContent.includes("ENV['RCT_NEW_ARCH_ENABLED'] = '1'")) {
    throw new Error('New Architecture not enabled in Podfile');
  }
  console.log(chalk.green('✓ iOS New Architecture flag set'));

  // Check Android flags
  const gradlePropsPath = path.join(
    EXAMPLE_DIR,
    'android',
    'gradle.properties'
  );
  const gradlePropsContent = fs.readFileSync(gradlePropsPath, 'utf8');

  if (!gradlePropsContent.includes('newArchEnabled=true')) {
    throw new Error('New Architecture not enabled in gradle.properties');
  }
  console.log(chalk.green('✓ Android New Architecture flag set'));
}

function verifyTypeScript() {
  console.log(chalk.blue('\n🔍 Verifying TypeScript setup...'));

  // Check tsconfig.json
  const tsconfigPath = path.join(ROOT_DIR, 'tsconfig.json');
  const tsconfig = require(tsconfigPath);

  const requiredCompilerOptions = [
    'composite',
    'declaration',
    'declarationMap',
    'sourceMap',
  ];

  for (const option of requiredCompilerOptions) {
    if (!tsconfig.compilerOptions[option]) {
      throw new Error(`Missing required compiler option: ${option}`);
    }
  }
  console.log(chalk.green('✓ TypeScript configuration valid'));

  // Run type check
  try {
    execSync('tsc --noEmit', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(chalk.green('✓ TypeScript compilation successful'));
  } catch (error) {
    throw new Error('TypeScript compilation failed');
  }
}

function verifyNativeCode() {
  console.log(chalk.blue('\n🔍 Verifying native code setup...'));

  // Check iOS TurboModule implementation
  const iosTurboModulePath = path.join(
    ROOT_DIR,
    'ios/cpp/RncustomergluTurboModule.h'
  );
  if (!fs.existsSync(iosTurboModulePath)) {
    throw new Error('iOS TurboModule implementation missing');
  }
  console.log(chalk.green('✓ iOS TurboModule implementation found'));

  // Check Android TurboModule implementation
  const androidTurboModulePath = path.join(
    ROOT_DIR,
    'android/src/newarch/java/com/reactnativerncustomerglu/RncustomergluTurboModule.java'
  );
  if (!fs.existsSync(androidTurboModulePath)) {
    throw new Error('Android TurboModule implementation missing');
  }
  console.log(chalk.green('✓ Android TurboModule implementation found'));
}

function verifyTests() {
  console.log(chalk.blue('\n🔍 Running tests...'));

  try {
    // Run unit tests
    execSync('npm test', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(chalk.green('✓ Unit tests passed'));

    // Run example app tests
    execSync('npm test', { stdio: 'inherit', cwd: EXAMPLE_DIR });
    console.log(chalk.green('✓ Example app tests passed'));
  } catch (error) {
    throw new Error('Tests failed');
  }
}

async function main() {
  console.log(chalk.yellow('🚀 Starting migration verification...\n'));

  try {
    checkEnvironment();
    checkNewArchitectureFlags();
    verifyTypeScript();
    verifyNativeCode();
    verifyTests();

    console.log(chalk.green('\n✨ Migration verification successful!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log('1. Run the example app');
    console.log('2. Test all SDK features');
    console.log('3. Update your app documentation');
    process.exit(0);
  } catch (error) {
    console.error(chalk.red('\n❌ Migration verification failed:'));
    console.error(chalk.red(error.message));
    console.log(
      chalk.blue('\nPlease check MIGRATION.md for troubleshooting steps.')
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
});
