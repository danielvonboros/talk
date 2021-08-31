import React from "react";

import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import firebase from "firebase";
import firestore from "firebase";

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }
  // Pick an image from the camera roll
  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result.uri,
        });
      }
    }
  };

  // take a picture with a built in camera
  takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // share your location in the chat
  getLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
    let locationResult = await Location.getCurrentPositionAsync({}).catch(
      (error) => console.log(error)
    );
    const longitude = JSON.stringify(locationResult.coords.longitude);
    const latitude = JSON.stringify(locationResult.coords.latitude);
    if (locationResult) {
      this.props.onSend({
        location: {
          longitude: locationResult.coords.longitude,
          latitude: locationResult.coords.latitude,
        },
      });
    }
  };

  // upload images to the google storage firebase servers
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
          default:
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
