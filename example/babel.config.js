const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.tsx', '.ts', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif'],
        alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
          '@assets': './assets', // Optional: create an assets alias
        },
      },
    ],
  ],
};