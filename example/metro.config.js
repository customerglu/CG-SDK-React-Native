const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const pak = require('../package.json');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    '@customerglu/react-native-customerglu': path.resolve(__dirname, '../src'),
  };

  config.resolver.assetExts = [
    ...config.resolver.assetExts, 
    'png', 
    'jpg', 
    'jpeg', 
    'gif', 
    'svg'
  ];

  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
  config.watchFolders = [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../node_modules'),
  ];
  return config;
})();