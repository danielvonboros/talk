import React from "react";

import CustomActions from "./CustomActions";

import { View, Platform, KeyboardAvoidingView } from "react-native";

// Gifted Chat
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
// Map View for messages
import MapView from "react-native-maps";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import firebase from "firebase";
import("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCgPoqVSMpvLoKdTdlSA-pbYtr6cl2HVhE",
  authDomain: "talk-7fc4c.firebaseapp.com",
  projectId: "talk-7fc4c",
  storageBucket: "talk-7fc4c.appspot.com",
  messagingSenderId: "30242663855",
};

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Check for updates in Firestore
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.referenceMessageUser = null;

    this.state = {
      messages: [],
      uid: 0,
      loggedInText: "Logging in...",
      user: {
        _id: "",
        name: "",
      },
      isConnected: false,
    };
  }

  async getMessages() {
    let messages = "";
    let uid = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      uid = await AsyncStorage.getItem("uid");

      this.setState({
        // Set uid and messages from asyncStorage
        messages: JSON.parse(messages),
        uid: JSON.parse(uid),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessage() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessage() {
    const message = this.state.messages[0];
    // add the new messages to the collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // saves message to localStorage
        this.saveMessage();
        this.addMessage();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        image: data.image || null,
        location: data.location || null,
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#1b064c",
            // Background color for my own chat window. Could be adjusted to fit the color concept to a greenish tone
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  }

  // hides the Input toolbar when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  // shows the Action menu (imagePicker, Camera, Location) sub-menu in Chat window
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //renders a Map View when the message is a location
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  componentDidMount() {
    const name = this.props.route.params.username;
    this.props.navigation.setOptions({ title: name });

    // Check online status of user
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // online
        console.log("online");
        this.setState({
          isConnected: true,
        });

        this.getMessages();
        this.renderInputToolbar();

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            },
          });

          // Create reference to messages of active users
          this.referenceMessagesUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);

          // Listen for collection changes
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        // offline
        console.log("offline");
        this.setState({
          isConnected: false,
        });
        // hide Input Toolbar to prevent new messages in offline mode
        this.renderInputToolbar();

        // get messages from offline storage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    if (this.state.isConnected == false) {
    } else {
      // stop online authentication
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: this.props.route.params.backgroundColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behaviour="height" />
        ) : null}
        {/* This part is important for Issues with Android Keyboard covering Chat window */}
      </View>
      // </View>
    );
  }
}
