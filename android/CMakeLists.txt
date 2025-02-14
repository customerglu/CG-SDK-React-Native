cmake_minimum_required(VERSION 3.22.1)

project(rncustomerglu)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)

add_library(rncustomerglu
            SHARED
            cpp/rncustomerglu.cpp
            cpp/OnLoad.cpp)

target_include_directories(rncustomerglu
                         PUBLIC
                         "${NODE_MODULES_DIR}/react-native/ReactCommon"
                         "${NODE_MODULES_DIR}/react-native/ReactAndroid/src/main/jni/react/turbomodule")

target_link_libraries(rncustomerglu
                     android
                     fbjni
                     folly_runtime
                     glog
                     jsi
                     react_nativemodule_core
                     react_codegen_rncore
                     react_debug
                     react_render_core
                     react_render_graphics
                     react_nativemodule_core
                     react_render_mapbuffer
                     rrc_view
                     turbomodulejsijni
                     yoga)
