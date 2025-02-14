cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Define the library name
project(rncustomerglu)

# This is required for Windows to avoid symbol collision
set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)

# React Native dependencies
set(PACKAGE_NAME "rncustomerglu")
set(BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set(RN_SO_DIR ${CMAKE_SOURCE_DIR}/android/build/intermediates/library_jni/debug/jni)

# Find dependencies
find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)

# Include directories
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/jni
    ${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/jni
    ${NODE_MODULES_DIR}/react-native/ReactCommon
    ${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker
    ${NODE_MODULES_DIR}/react-native/ReactCommon/jsi
    ${NODE_MODULES_DIR}/react-native/ReactCommon/react/renderer/components/view
    ${NODE_MODULES_DIR}/react-native/ReactCommon/react/renderer/core
    ${NODE_MODULES_DIR}/react-native/ReactCommon/react/renderer/graphics
    ${NODE_MODULES_DIR}/react-native/ReactCommon/react/renderer/mapbuffer
    ${NODE_MODULES_DIR}/react-native/ReactCommon/runtimeexecutor
    ${NODE_MODULES_DIR}/react-native/ReactCommon/yoga
    ${NODE_MODULES_DIR}/hermes-engine/android/include
)

# Add source files
add_library(
    ${PACKAGE_NAME}
    SHARED
    react-native-customerglu.cpp
)

# Link against required libraries
target_link_libraries(
    ${PACKAGE_NAME}
    ReactAndroid::jsi
    ReactAndroid::reactnativejni
    fbjni::fbjni
    android
    ReactAndroid::folly_runtime
    ReactAndroid::glog
    ReactAndroid::react_nativemodule_core
    ReactAndroid::react_render_core
    ReactAndroid::react_render_graphics
    ReactAndroid::react_render_mapbuffer
    ReactAndroid::rrc_view
    ReactAndroid::turbomodulejsijni
    ReactAndroid::yoga
)

# Set properties
set_target_properties(
    ${PACKAGE_NAME}
    PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    POSITION_INDEPENDENT_CODE ON
)

# Add compile definitions
target_compile_definitions(${PACKAGE_NAME} PRIVATE
    FOLLY_NO_CONFIG
    FOLLY_MOBILE=1
    FOLLY_USE_LIBCPP=1
)

if(${REACT_NATIVE_VERSION} GREATER_EQUAL 71)
    # New architecture flags
    target_compile_definitions(${PACKAGE_NAME} PRIVATE
        RCT_NEW_ARCH_ENABLED=1
        REACT_NATIVE_VERSION=${REACT_NATIVE_VERSION}
    )
endif()

# Installation
install(
    TARGETS ${PACKAGE_NAME}
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
