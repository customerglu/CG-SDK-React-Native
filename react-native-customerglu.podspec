require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-customerglu"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/customerglu/CG-SDK-React-Native.git", :tag => "#{s.version}" }

  s.source_files = [
    "ios/**/*.{h,m,mm,cpp,swift}",
    "ios/cpp/**/*.{h,cpp}"
  ]

  # Dependencies for new architecture
  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\" \"$(PODS_ROOT)/boost-for-react-native\" \"$(PODS_ROOT)/RCT-Folly\" \"$(PODS_ROOT)/Headers/Public/React-Codegen/react/renderer/components\" \"$(PODS_ROOT)/Headers/Private/React-Fabric\" \"$(PODS_ROOT)/Headers/Public/React-RCTFabric\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
    "CLANG_CXX_LIBRARY" => "libc++",
    "GCC_PREPROCESSOR_DEFINITIONS" => "RCT_NEW_ARCH_ENABLED=1"
  }

  s.dependency "React"
  s.dependency "React-Core"
  s.dependency "React-RCTFabric"
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
  
  # CustomerGlu SDK dependency
  s.dependency 'CustomerGlu'

  # Compile settings for new architecture
  s.script_phases = [
    {
      :name => "Build React Native New Architecture",
      :script => 'set -e; WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"; REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"; /bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"',
      :execution_position => :before_compile
    }
  ]
end
