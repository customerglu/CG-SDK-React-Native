# CustomerGlu

CustomerGlu SDK provides you lots of in-built stuff and make your integration faster with CustomerGlu
Our SDK provides you In-built functions you just need to use them.

# Prerequisite

iOS - Requires IOS 11.0 or above.

Xcode - Version 12.0 or above

Android - Requires minSdkVersion should be 21


# Installation

OPTION 1 -
Add the CustomerGlu React Native plugin in package.json file 
``` 
"@customerglu/react-native-customerglu": "^1.0.5"
``` 

OPTION 2 - 
Run this command With npm:
``` 
npm install @customerglu/react-native-customerglu
``` 

# Initialise CustomerGlu SDK 

Android Setup - 

Firstly add the permission of internet in Manifest file.
``` 
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />


WriteKey - Mandatory step and need to put your writeKey in meta-data .Write_key are provided by CustomerGlu

<meta-data android:name="CUSTOMERGLU_WRITE_KEY" //Don't Change Name
android:value="YOUR_WRITE_KEY" />

``` 
If Proguard is enabled in your app, Add the following  line in release build.


    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            signingConfig signingConfigs.debug
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 
            'proguard-rules.pro'
    
        }
    }

Create a Proguard rules file if not present and add the following rule in Proguard Rules file:


    -keep class com.customerglu.sdk.Modal.*{*;}

iOS Setup - 

Mandatory step and need to put CustomerGlu WRITE_KEY in Info.plist
``` 
<key>CUSTOMERGLU_WRITE_KEY</key>
<string>YOUR_WRITE_KEY</string>

```

# Functionalities

Please refer to the [React Native Docs](https://docs.customerglu.com/sdk/react-native)
