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
          podspecPath: "../react-native-customerglu.podspec",
        },
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
