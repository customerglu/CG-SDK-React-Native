require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-customerglu"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.0" }  # Match Podfile iOS version
  s.source       = { :git => "https://github.com/customerglu/CG-SDK-React-Native.git", :tag => "#{s.version}" }

  s.source_files = [
    "ios/**/*.{h,m,mm,cpp,swift}",
    "ios/cpp/**/*.{h,cpp}"
  ]

  # Updated xcconfig for RN 0.73.1
  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\" \"$(PODS_ROOT)/RCT-Folly\" \"$(PODS_ROOT)/Headers/Public/React-Codegen/react/renderer/components\" \"$(PODS_ROOT)/Headers/Private/React-Fabric\" \"$(PODS_ROOT)/Headers/Public/React-RCTFabric\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
    "CLANG_CXX_LIBRARY" => "libc++",
    "GCC_PREPROCESSOR_DEFINITIONS" => "RCT_NEW_ARCH_ENABLED=1"
  }

  # Core dependencies with versions
  s.dependency "React-Core"
  s.dependency "React-RCTFabric"
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", "2022.05.16.00"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
  
  # Hermes dependencies
  s.dependency "React-hermes"
  s.dependency "hermes-engine"
  
  # CustomerGlu SDK dependency - add version if possible
  s.dependency 'CustomerGlu', '~> 1.0' # Replace with actual minimum version
end