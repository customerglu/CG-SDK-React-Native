module.exports = {
  dependencies: {
    "react-native-customerglu": {
      platforms: {
        android: {
          libraryName: "rncustomerglu",
          componentDescriptors: [
            "BannerWidgetComponentDescriptor",
            "EmbedBannerWidgetComponentDescriptor",
          ],
        },
        ios: {
          project: null,
          podspecPath: null
        } // This disables auto-linking for iOS
      },
    },
  },
  codegenConfig: {
    name: "RNCCustomerGlu",
    type: "modules",
    jsSrcsDir: "src",
    android: {
      javaPackageName: "com.reactnativerncustomerglu",
    },
  },
};
