#!/bin/bash

# Create directories if they don't exist
mkdir -p ~/Library/Caches/CocoaPods/Pods/External/boost
cd ~/Library/Caches/CocoaPods/Pods/External/boost

# Download using the exact URL from the podspec
curl -L -o boost_1_83_0.tar.bz2 https://boostorg.jfrog.io/artifactory/main/release/1.83.0/source/boost_1_83_0.tar.bz2

# Verify the checksum
CHECKSUM=$(shasum -a 256 boost_1_83_0.tar.bz2 | awk '{print $1}')
EXPECTED="6478edfe2f3305127cffe8caf73ea0176c53769f4bf1585be237eb30798c3b8e"

if [ "$CHECKSUM" = "$EXPECTED" ]; then
    echo "Checksum verified successfully"
else
    echo "Checksum verification failed"
    echo "Got: $CHECKSUM"
    echo "Expected: $EXPECTED"
    exit 1
fi

# Clean up old installation
rm -rf ~/Library/Caches/CocoaPods/Pods/Release/boost

# Extract to the correct location (note: using bzip2 extraction)
mkdir -p ~/Library/Caches/CocoaPods/Pods/Release/boost
tar -xjf boost_1_83_0.tar.bz2 -C ~/Library/Caches/CocoaPods/Pods/Release/boost --strip-components=1
