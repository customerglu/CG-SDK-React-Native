
#!/bin/bash
set -e

GENERATED_DIR="${DERIVED_FILE_DIR}/generated/ios"
mkdir -p "$GENERATED_DIR"

node "${PODS_ROOT}/../node_modules/@react-native/codegen/lib/cli/combine/combine-js-to-schema-cli.js" \
  --platform ios \
  "${GENERATED_DIR}/schema.json" \
  "${PODS_ROOT}/../node_modules/@customerglu/react-native-customerglu/src"

node "${PODS_ROOT}/../node_modules/react-native/scripts/generate-specs-cli.js" \
  --platform ios \
  --schemaPath "${GENERATED_DIR}/schema.json" \
  --outputDir "${GENERATED_DIR}" \
  --libraryName "RNCCustomerGlu" \
  --libraryType modules
