# Cars Project Mobile App

> A native application built with NativeScript-Vue

## Usage
Run iOS emulator: `tns run ios`

To run on Android device:
```
tns build android
adb install "path/to/apk"
```
### Build release
Generate new app icons: `tns resources generate icons PATH`
Generate splashes: `tns resources generate splashes <Path to image> --background "#000000"`
Generate keystore: `keytool -genkey -v -keystore dillish.keystore -alias dillish_key -keyalg RSA -keysize 2048 -validity 10000`
Build for Android: `tns build android --release --key-store-path KEYSTORE_PATH --key-store-password KEYSTORE_PASSWORD --key-store-alias dillish_key --key-store-alias-password KEYSTORE_PASSWORD --aab --copy-to .`, before make sure to update version No in `AndroidManiffest.xml`.
