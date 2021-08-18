import React from "react";
import { View, Platform, Button, KeyboardAvoidingView } from "react-native";

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      messages: [],
    }
  }

  componentDidMount() {
    let username = this.props.route.params.username;
    this.props.navigation.setOptions({ title: username });
    this.setState({
      messages: [
        {
          _id:1,
          createdAt: new Date(),
          text: 'Hello Developer',
          user: {
            _id:4,
            name: 'React Feedback',
            avatar: 'https://placeimg.com/140/140/any',
          }
        },
        {
          _id:2,
          text: 'Welcome to the "talk" Chat App, it is ' + new Date() + ' Welcome! For additional help visit the docs at https://#.github.io/talk ',
          createdAt: new Date(),
          user: {
            _id:3,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text:'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            }
          }}
      />
    );
  }

  render() {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     justifyContent: "center",
      //     alignItems: "center",
      //     backgroundColor: this.props.route.params.backgroundColor,
      //   }}>
      //   <Button
      //     title='Go to Start'
      //     onPress={() => this.props.navigation.navigate("Start")}
        // />
        <View  style={{
          flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: this.props.route.params.backgroundColor,
        }}>
          <GiftedChat 
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id:1,
            }}
          />
          {Platform.OS === 'android' ? <KeyboardAvoidingView behaviour='height' /> : null }
        </View>
      // </View>
    );
  }
}
