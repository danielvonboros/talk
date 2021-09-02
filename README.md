![alt talkLogo](https://github.com/danielvonboros/talk/blob/main/assets/talkLogo.png?raw=true)
<br>
talk Chat App is a React Native Chat Application

<hr>

### Setting up the Development Environment:

<ul>

#### Required tools:

<ul>
<li>VisualStudio Code</li>
<li>Expo</li>
<li>Android Studio (for Android Emulator)</li>
</ul>

#### Not necessary but useful:

<ul>
<li>(Xcode for iOS Simulator)</li>
<li>(Smartphone running ExpoGo)</li>
</ul>

#### Project Dependencies:

<ul>
<li>react-native</li>
<li>expo</li>
<li>react-gifted-chat</li>
<li>firestore firebase (Database & Storage)</li>
</ul>

### Setting up the tools:

First up, make sure you have expo installed globally.
Do this by typing

```
$ npm install --global expo-cli
```

in your terminal

While expo is being installed to your local machine, now is the perfect time to get <a href="https://developer.android.com/studio">Android Studio</a> and start the installation for Android Studio in order to be able to emulate the project on your computer. Be sure to choose the custom options while installing and selecting 'Android Virtual Device' if not
checked already. If you need help getting started with setting up the emulator, try this <a href="https://developer.android.com/studio/run/emulator">guide</a>

Now it's to create a new expo project with

```
$ expo init my-project
```

in your terminal
To start with a blank project, like we intend to do, choose "blank" from the menu when asked.

If you haven't done so already, install 'Expo Go' to your mobile device. Check these links for <a href='https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en'>Android</a> and <a href="https://apps.apple.com/de/app/expo-go/id982107779">iPhone</a> if you need help.

Now start the development server by typing

```
expo start
```

your browser should open with the 'Metro Bundler', showing you the QR code to open the app on your mobile device. There's also shortcuts **i** for **iOs**, **a** for **Android** (both simulators/emulators), **w** for **web** (provides web emulators, but you have to queue to simulate the app and it's slow)

Most recommended is to run the app on the 'Expo Go' application on your smartphone.

To let your phone run the application,

- on Android: open up the app and select "Scan QR code", confirm Camera Usage to scan the QR code and the project will load.
- on iOs: use the camera app to scan the QR code and confirm the launch of the "Expo Go" application, then the project will load.

Once having checked the basic functionality of "Expo" on both your computer and "Expo Go" on your smartphone, you're good to go for getting the application set up.

You can now download the repo to your computer, install the necessary modules by running:

```
$ npm install
```

### Cloud Storage Configuration

Once you have your computer (and probably phone) prepared to run projects with expo, you can start using the application or modify it.

To use Cloud Storage for the application, you need to have a Firebase account and inside <a href="https://firebase.google.com">Firebase</a> first create a new project. Then create a database in 'test mode' and to make sure data can be stored, enable at least "Anonymous Authentication" in "Authentication > Sign-in method" menu.

add firebase to your local machine by typing

```
$ npm install firebase
```

in your terminal. In your Application file (the one where you want the online usage from) you should add a configuration, that looks like this:

```
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "aRandomApiKeyGeneratedForYourApp",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "12345678901",
  appId: "1:12345678901:web:1234567890abcdef12345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

You access this data by clicking on the 'cog'-symbol, next to project overview, and then click on 'Project settings'.

### Run the app

```
$ expo start
```

and choose if you want to emulate/simulate the application on your computer or if you want to run it on your smartphone using "Expo Go".

You're done! Happy hacking!

<hr>
