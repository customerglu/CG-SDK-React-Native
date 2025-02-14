cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)

project(rncustomerglu)

# Include paths for React Native dependencies
include_directories(
    "${NODE_MODULES_DIR}/react-native/ReactCommon"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/turbomodule/core"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/react/nativemodule/core"
    "${PODS_ROOT}/Headers/Public/React-Core"
    "${PODS_ROOT}/Headers/Public/React-callinvoker"
    "${PODS_ROOT}/Headers/Public/React-jsi"
    "${PODS_ROOT}/boost"
    "${PODS_ROOT}/DoubleConversion"
    "${PODS_ROOT}/fmt/include"
    "${PODS_ROOT}/RCT-Folly"
)

# Add source files
add_library(rncustomerglu
    SHARED
    cpp/RncustomergluTurboModule.cpp
    cpp/OnLoad.cpp
)

# Link against required libraries
target_link_libraries(rncustomerglu
    ReactCommon
    folly_runtime
    glog
    react_nativemodule_core
    jsi
    react_codegen_rncore
    react_debug
    react_render_core
    react_render_graphics
    react_render_imagemanager
    yoga
)

# Set properties
set_target_properties(rncustomerglu
    PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    POSITION_INDEPENDENT_CODE ON
)

# Add compile definitions
target_compile_definitions(rncustomerglu
    PRIVATE
    FOLLY_NO_CONFIG
    FOLLY_MOBILE=1
    FOLLY_USE_LIBCPP=1
)

# Set include directories
target_include_directories(rncustomerglu
    PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)
