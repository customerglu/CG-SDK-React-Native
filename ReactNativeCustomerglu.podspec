require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "ReactNativeCustomerglu"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/customerglu/CG-SDK-React-Native.git", :tag => "#{s.version}" }
  
  s.swift_version = '5.0'
  
  s.static_framework = true

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"
  s.private_header_files = "ios/generated/**/*.h"
  s.dependency "CustomerGlu", "3.0.7"

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
  
    # Add Swift module name and other build settings
    s.pod_target_xcconfig = {
      'SWIFT_OBJC_INTERFACE_HEADER_NAME' => 'ReactNativeCustomerglu-Swift.h',
      'DEFINES_MODULE' => 'YES',
      'SWIFT_COMPILATION_MODE' => 'wholemodule',
      'CLANG_CXX_LANGUAGE_STANDARD' => 'c++20',
      'CLANG_CXX_LIBRARY' => 'libc++',
      'OTHER_CPLUSPLUSFLAGS' => '$(inherited) -std=c++20 -DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1',
      'GCC_PREPROCESSOR_DEFINITIONS' => ['$(inherited)', 'RCT_NEW_ARCH_ENABLED=1'],
      'HEADER_SEARCH_PATHS' => [
        '$(inherited)',
        '$(PODS_ROOT)/Headers/Public/React-RCTFabric',
        '$(PODS_ROOT)/Headers/Public/React-Fabric',
        '$(PODS_ROOT)/Headers/Public/React-Core',
        '${PODS_ROOT}/../../node_modules/react-native/React/Fabric/Surface',
        '${PODS_ROOT}/../../node_modules/react-native/React'
      ]
    }

    # Always include these dependencies regardless of architecture
    # s.dependency "React-Core"
    s.dependency "React-Fabric"
    s.dependency "React-RCTFabric"
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"

    # Additional configuration for new architecture
    if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    end
  end
end
