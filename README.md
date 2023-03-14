### What's included and not included:

#### Included

- User login screen.
  - username: ask@iswanjumat.
  - password: iswan@1987
- Home screen displaying total score, a link to the leaderboard, and a button to start the game.
- Category selection screen.
- Game screen where five random words are given for the user to type.

#### Not included:

- User registration
- Unit tests are not completed.

### Build and run a development version (android)

To build and run the app for local development, simply run:

```bash
yarn android
```

This will build a "debug" (as opposed to a "release") version of the app, and attempt to install it onto any connected Android devices.
Note that this command will fail if you do not have any connected devices (either physical or emulated).

You can inspect the output of the generated build at `android/app/build/outputs/apk/*`. Since it is a debug build, you debug the JS remotely in [Chrome](https://facebook.github.io/react-native/docs/debugging.html#chrome-developer-tools)

### Build and run a development version (IOS)

To build and run the app for local development on ios emulator, simply run:

```bash
yarn ios
```

### Deploying to the App Store (iOS):

1. Generate an iOS distribution certificate and provisioning profile using Apple Developer account.
2. Open Xcode and select your app's target.
3. Set the build configuration to "Release" and choose your distribution certificate and provisioning profile.
4. Archive the build and validate it for distribution.
5. Once validation is complete, upload the build to App Store Connect using Xcode or Application Loader.
6. Fill out the necessary information about your app, such as description, screenshots, and pricing.
7. Submit the app for review and wait for approval.
8. Once approved, your app will be available on the App Store.

### Deploying to the Play Store (Android):

1.  Generate a signed APK using Android Studio or by running `react-native run-android --variant=release` in your project directory.
2.  Create a Google Play Console account and create a new app listing.
3.  Upload the signed APK to the app listing.
4.  Fill out the necessary information about your app, such as description, screenshots, and pricing.
5.  Submit the app for review and wait for approval.
6.  Once approved, your app will be available on the Play Store.
