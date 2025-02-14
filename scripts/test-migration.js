#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
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

async function main() {
  console.log(chalk.yellow("🚀 Starting migration testing...\n"));

  // Build the SDK
  console.log(chalk.blue("📦 Building SDK..."));
  runCommand("npm run clean && npm run prepare", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ SDK built successfully\n"));

  // Setup example app
  console.log(chalk.blue("🛠 Setting up example app..."));
  runCommand("npm install --legacy-peer-deps", { cwd: EXAMPLE_DIR });
  console.log(chalk.green("✓ Example app dependencies installed\n"));

  // Install iOS pods
  console.log(chalk.blue("🍎 Installing iOS pods..."));
  runCommand("npm run pods", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ iOS pods installed\n"));

  // Run tests
  console.log(chalk.blue("🧪 Running tests..."));

  // SDK tests
  console.log(chalk.blue("\nRunning SDK tests:"));
  runCommand("npm test", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ SDK tests passed\n"));

  // Example app tests
  console.log(chalk.blue("Running example app tests:"));
  runCommand("npm test", { cwd: EXAMPLE_DIR });
  console.log(chalk.green("✓ Example app tests passed\n"));

  // Build Android
  console.log(chalk.blue("🤖 Building Android..."));
  runCommand("npm run build:android", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ Android build successful\n"));

  // Build iOS
  console.log(chalk.blue("🍎 Building iOS..."));
  runCommand("npm run build:ios", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ iOS build successful\n"));

  // Type checking
  console.log(chalk.blue("📝 Running type checks..."));
  runCommand("npm run typecheck", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ Type checks passed\n"));

  // Lint
  console.log(chalk.blue("🧹 Running linter..."));
  runCommand("npm run lint", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ Linting passed\n"));

  // Verify migration
  console.log(chalk.blue("🔍 Verifying migration..."));
  runCommand("npm run verify-migration", { cwd: ROOT_DIR });
  console.log(chalk.green("✓ Migration verification passed\n"));

  console.log(chalk.green("\n✨ Migration testing completed successfully!"));
  console.log(chalk.blue("\nNext steps:"));
  console.log("1. Run the example app:");
  console.log("   cd example && npm start");
  console.log("2. In another terminal:");
  console.log("   npm run ios    # or npm run android");
  console.log("3. Test all SDK features manually");
  console.log("4. Check MIGRATION.md for any additional steps\n");
}

// Handle errors
process.on("unhandledRejection", (error) => {
  console.error(chalk.red("An error occurred during migration testing:"));
  console.error(error);
  process.exit(1);
});

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});
