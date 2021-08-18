import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Chat from "./Chat";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return (
      <View style={styles.background}>
        <ImageBackground
          style={styles.backgroundImageStart}
          source={require("../assets/Background-Image.png")}>
          <Text style={styles.appName}>talk</Text>
        </ImageBackground>

        {/* View Component for Chat-Username */}
        <View style={styles.container}>
          <TextInput
            style={styles.inputField}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            placeholder='Type in your name'
          />
          {/* View Component for Chat Background Color Selector */}
          <View>
            <Text style={styles.text}>Choose Background Color:</Text>
            <View style={styles.chatBackgroundColor}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => this.setState({ backgroundColor: "#EFEFEF" })}
              />
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.setState({ backgroundColor: "#64B8B4" })}
              />
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.setState({ backgroundColor: "#C4E1FF" })}
              />
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.setState({ backgroundColor: "#5E6B61" })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                username: this.state.username,
                backgroundColor: this.state.backgroundColor,
              })
            }>
            <Text style={styles.chatButtonText}>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImageStart: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  appName: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: "80%",
    flex: 0.5,
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    width: "88%",
    height: "44%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    marginBottom: "5.5%",
    fontSize: 16,
    flex: 0.8,
  },
  inputField: {
    alignItems: "center",
    width: "88%",
    height: 40,
    color: "#5E6B61",
    fontSize: 16,
    borderColor: "#5E6B61",
    borderWidth: 1,
  },
  text: {
    color: "#5E6B61",
    fontSize: 16,
  },
  chatBackgroundColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  color1: {
    backgroundColor: "#EFEFEF",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  color2: {
    backgroundColor: "#64B8B4",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  color3: {
    backgroundColor: "#C4E1FF",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  color4: {
    backgroundColor: "#5E6B61",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatButton: {
    alignItems: "center",
    width: "88%",
    height: 40,
    backgroundColor: "#5E6B61",
  },
  chatButtonText: {
    fontSize: 20,
    color: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
});
