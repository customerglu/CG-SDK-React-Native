#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const ROOT_DIR = path.resolve(__dirname, "..");
const EXAMPLE_DIR = path.join(ROOT_DIR, "example");

function runCommand(command, options = {}) {
  try {
    execSync(command, {
      stdio: "inherit",
      ...options,
    });
    return true;
  } catch (error) {
    if (!options.ignoreError) {
      console.error(chalk.red(`Error executing command: ${command}`));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
    return false;
  }
}

function checkPrerequisites() {
  console.log(chalk.blue("🔍 Checking prerequisites..."));

  // Check Node.js version
  const nodeVersion = process.version;
  if (parseInt(nodeVersion.slice(1)) < 18) {
    throw new Error("Node.js 18 or newer is required");
  }
  console.log(chalk.green("✓ Node.js version:", nodeVersion));

  // Check npm version
  const npmVersion = execSync("npm --version").toString().trim();
  if (parseInt(npmVersion.split(".")[0]) < 9) {
    throw new Error("npm 9 or newer is required");
  }
  console.log(chalk.green("✓ npm version:", npmVersion));

  // Check for Xcode (macOS only)
  if (process.platform === "darwin") {
    try {
      execSync("xcodebuild -version");
      console.log(chalk.green("✓ Xcode installed"));
    } catch (error) {
      throw new Error("Xcode is required for iOS development");
    }
  }

  // Check for Android SDK
  try {
    const androidHome =
      process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
    if (!androidHome) {
      throw new Error(
        "ANDROID_HOME or ANDROID_SDK_ROOT environment variable not set"
      );
    }
    console.log(chalk.green("✓ Android SDK found:", androidHome));
  } catch (error) {
    throw new Error("Android SDK is required for Android development");
  }

  console.log(chalk.green("✓ All prerequisites met\n"));
}

function setupSDK() {
  console.log(chalk.blue("🛠 Setting up SDK..."));

  // Install dependencies
  console.log(chalk.blue("Installing SDK dependencies..."));
  runCommand("npm install --legacy-peer-deps", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ SDK dependencies installed\n"));

  // Generate codegen artifacts
  console.log(chalk.blue("Generating codegen artifacts..."));
  runCommand("npm run generate-codegen", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ Codegen artifacts generated\n"));

  // Build SDK
  console.log(chalk.blue("Building SDK..."));
  runCommand("npm run prepare", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ SDK built\n"));
}

function setupExample() {
  console.log(chalk.blue("🚀 Setting up example app..."));

  // Install example app dependencies
  console.log(chalk.blue("Installing example app dependencies..."));
  runCommand("npm install --legacy-peer-deps", { cwd: EXAMPLE_DIR });
  console.log(chalk.green("✓ Example app dependencies installed\n"));

  // Install iOS pods
  if (process.platform === "darwin") {
    console.log(chalk.blue("Installing iOS pods..."));
    runCommand("npm run pods", { cwd: ROOT_DIR });
    console.log(chalk.green("✓ iOS pods installed\n"));
  }
}

function setupGitHooks() {
  console.log(chalk.blue("🔧 Setting up Git hooks..."));

  const hooksDir = path.join(ROOT_DIR, ".git/hooks");
  const preCommitPath = path.join(hooksDir, "pre-commit");

  const preCommitScript = `#!/bin/sh
npm run typecheck
npm run lint
npm test
`;

  fs.writeFileSync(preCommitPath, preCommitScript);
  fs.chmodSync(preCommitPath, "755");

  console.log(chalk.green("✓ Git hooks installed\n"));
}

function setupVSCode() {
  console.log(chalk.blue("💻 Setting up VSCode configuration..."));

  const vscodePath = path.join(ROOT_DIR, ".vscode");
  if (!fs.existsSync(vscodePath)) {
    fs.mkdirSync(vscodePath);
  }

  // settings.json
  const settingsPath = path.join(vscodePath, "settings.json");
  const settings = {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    },
    "typescript.tsdk": "node_modules/typescript/lib",
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
  };
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

  // launch.json
  const launchPath = path.join(vscodePath, "launch.json");
  const launch = {
    version: "0.2.0",
    configurations: [
      {
        name: "Debug iOS",
        type: "reactnative",
        request: "launch",
        platform: "ios",
        target: "iPhone 14",
        cwd: "${workspaceFolder}/example",
      },
      {
        name: "Debug Android",
        type: "reactnative",
        request: "launch",
        platform: "android",
        cwd: "${workspaceFolder}/example",
      },
    ],
  };
  fs.writeFileSync(launchPath, JSON.stringify(launch, null, 2));

  console.log(chalk.green("✓ VSCode configuration set up\n"));
}

async function main() {
  console.log(chalk.yellow("🚀 Starting development environment setup...\n"));

  try {
    checkPrerequisites();
    setupSDK();
    setupExample();
    setupGitHooks();
    setupVSCode();

    console.log(
      chalk.green("\n✨ Development environment setup completed successfully!")
    );
    console.log(chalk.blue("\nNext steps:"));
    console.log("1. Start the example app:");
    console.log("   cd example && npm start");
    console.log("2. In another terminal:");
    console.log("   npm run ios    # or npm run android");
    console.log("3. Start developing!\n");
  } catch (error) {
    console.error(chalk.red("\n❌ Development environment setup failed:"));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

// Handle errors
process.on("unhandledRejection", (error) => {
  console.error(chalk.red("An error occurred during setup:"));
  console.error(error);
  process.exit(1);
});

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});
