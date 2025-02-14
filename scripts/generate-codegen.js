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

function generateCodegenConfig() {
  console.log(chalk.blue("📝 Generating codegen configuration..."));

  const codegenConfig = {
    name: "RNCCustomerGlu",
    type: "modules",
    jsSrcsDir: "src",
    android: {
      javaPackageName: "com.reactnativerncustomerglu",
    },
  };

  const configPath = path.join(ROOT_DIR, "react-native.config.js");
  const configContent = `
module.exports = {
  dependency: {
    platforms: {
      android: {
        libraryName: "rncustomerglu",
        componentDescriptors: [
          "BannerWidgetComponentDescriptor",
          "EmbedBannerWidgetComponentDescriptor",
        ],
      },
      ios: {
        scriptPhases: [
          {
            name: "[CustomerGlu] Generate Codegen Artifacts",
            path: "./scripts/generate-codegen.sh",
            execution_position: "before_compile",
          },
        ],
      },
    },
  },
  codegenConfig: ${JSON.stringify(codegenConfig, null, 2)},
};
`;

  fs.writeFileSync(configPath, configContent);
  console.log(chalk.green("✓ Codegen configuration generated\n"));
}

function generateiOSCodegen() {
  console.log(chalk.blue("🍎 Generating iOS codegen artifacts..."));

  // Create codegen script for iOS
  const iosScriptPath = path.join(ROOT_DIR, "scripts/generate-codegen.sh");
  const iosScriptContent = `
#!/bin/bash
set -e

GENERATED_DIR="\${DERIVED_FILE_DIR}/generated/ios"
mkdir -p "$GENERATED_DIR"

node "\${PODS_ROOT}/../node_modules/@react-native/codegen/lib/cli/combine/combine-js-to-schema-cli.js" \\
  --platform ios \\
  "\${GENERATED_DIR}/schema.json" \\
  "\${PODS_ROOT}/../node_modules/@customerglu/react-native-customerglu/src"

node "\${PODS_ROOT}/../node_modules/react-native/scripts/generate-specs-cli.js" \\
  --platform ios \\
  --schemaPath "\${GENERATED_DIR}/schema.json" \\
  --outputDir "\${GENERATED_DIR}" \\
  --libraryName "RNCCustomerGlu" \\
  --libraryType modules
`;

  fs.writeFileSync(iosScriptPath, iosScriptContent);
  fs.chmodSync(iosScriptPath, "755");
  console.log(chalk.green("✓ iOS codegen script generated\n"));
}

function generateAndroidCodegen() {
  console.log(chalk.blue("🤖 Generating Android codegen artifacts..."));

  // Create codegen task for Android
  const androidTaskPath = path.join(ROOT_DIR, "android/codegen.gradle");
  const androidTaskContent = `
def codegenDir = new File(buildDir, "generated/source/codegen")

task generateCodegenArtifacts(type: Exec) {
    workingDir rootDir
    commandLine "node",
            "\${rootDir}/node_modules/@react-native/codegen/lib/cli/combine/combine-js-to-schema-cli.js",
            "--platform", "android",
            "\${codegenDir}/schema.json",
            "\${rootDir}/src"

    doFirst {
        codegenDir.mkdirs()
    }
}

task generateSpec(type: Exec) {
    dependsOn generateCodegenArtifacts
    workingDir rootDir
    commandLine "node",
            "\${rootDir}/node_modules/react-native/scripts/generate-specs-cli.js",
            "--platform", "android",
            "--schemaPath", "\${codegenDir}/schema.json",
            "--outputDir", "\${codegenDir}",
            "--libraryName", "RNCCustomerGlu",
            "--libraryType", "modules"
}

preBuild.dependsOn generateSpec
`;

  fs.writeFileSync(androidTaskPath, androidTaskContent);
  console.log(chalk.green("✓ Android codegen task generated\n"));
}

function updateBuildFiles() {
  console.log(chalk.blue("🔧 Updating build files..."));

  // Update Android build.gradle
  const androidBuildPath = path.join(ROOT_DIR, "android/build.gradle");
  const androidBuildContent = fs.readFileSync(androidBuildPath, "utf8");
  if (!androidBuildContent.includes("apply from: 'codegen.gradle'")) {
    fs.appendFileSync(androidBuildPath, "\napply from: 'codegen.gradle'\n");
  }

  // Update iOS podspec
  const podspecPath = path.join(ROOT_DIR, "react-native-customerglu.podspec");
  const podspecContent = fs.readFileSync(podspecPath, "utf8");
  if (!podspecContent.includes("s.dependency 'React-Codegen'")) {
    const updatedPodspec = podspecContent.replace(
      "s.dependency 'React-Core'",
      "s.dependency 'React-Core'\n  s.dependency 'React-Codegen'"
    );
    fs.writeFileSync(podspecPath, updatedPodspec);
  }

  console.log(chalk.green("✓ Build files updated\n"));
}

async function main() {
  console.log(chalk.yellow("🚀 Starting codegen setup...\n"));

  try {
    generateCodegenConfig();
    generateiOSCodegen();
    generateAndroidCodegen();
    updateBuildFiles();

    console.log(chalk.green("\n✨ Codegen setup completed successfully!"));
    console.log(chalk.blue("\nNext steps:"));
    console.log("1. Clean and rebuild the project:");
    console.log("   npm run clean && npm run prepare");
    console.log("2. For iOS, reinstall pods:");
    console.log("   cd example/ios && pod install");
    console.log("3. For Android, clean and rebuild:");
    console.log("   cd example/android && ./gradlew clean\n");
  } catch (error) {
    console.error(chalk.red("\n❌ Codegen setup failed:"));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

// Handle errors
process.on("unhandledRejection", (error) => {
  console.error(chalk.red("An error occurred during codegen setup:"));
  console.error(error);
  process.exit(1);
});

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});
