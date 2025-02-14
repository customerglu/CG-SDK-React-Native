module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@customerglu/react-native-customerglu': '../src/index',
          // Add other aliases if needed
          'tests': './__tests__',
        },
      },
    ],
    // Add any additional plugins needed for testing
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
