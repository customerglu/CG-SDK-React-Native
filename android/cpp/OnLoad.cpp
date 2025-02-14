#include <fbjni/fbjni.h>
#include "rncustomerglu.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
    return facebook::jni::initialize(vm, [] {
        // Initialize any C++ classes here
        facebook::react::RncustomergluTurboModule::registerNatives();
    });
}
