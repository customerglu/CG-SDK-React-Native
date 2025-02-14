const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,

    blacklistRE: exclusionList(
      modules.map(
        (m) =>
          new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
      )
    ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),

    // Add additional module resolution configurations
    resolveRequest: (context, moduleName, platform) => {
      // Handle CustomerGlu SDK special cases
      if (moduleName === '@customerglu/react-native-customerglu') {
        return {
          filePath: path.resolve(__dirname, '../src/index'),
          type: 'sourceFile',
        };
      }
      // Let Metro handle other cases
      return context.resolveRequest(context, moduleName, platform);
    },

    // Add support for native module source maps
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },

  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  // Add any necessary serializer configurations
  serializer: {
    ...defaultConfig.serializer,
    // Enable source maps in development
    sourceMapUrl: '/index.map',
    sourcemapUseAbsolutePath: true,
  },
};
