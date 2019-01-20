import React from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { ImagePicker } from 'expo';
// import {NavigationActions} from 'react-navigation';
import ImgToBase64 from 'react-native-image-base64';

// var base64Img = require('base64-img');

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 10,
    borderColor: '#d6d7da',
    // width:200,
    // height:200
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  button: {
    color: 'red',
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:25
  }
});

export default class ChooseImage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.viewStyle}>
        {image &&
          <Image 
          source={{ uri: image }} style={styles.container}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height-100} />
          }
        <View
          style={{
          flexDirection: 'row',
          }}>
          <Button 
            // style={styles.button}
            color="red"
            title="Choose Image"
            onPress={this.pickImage}
          />
          {image &&
            <Button
              title="Upload Image"
              onPress={() => this.uploadImage()}/>
          }
        </View>
      </View>
    );
  }

  goTo(){
    navigate('ParsedView');
  }

  uploadImage() {
    const apiUrl = 'https://facturefracture.azurewebsites.net/create_bill';
    const uri = this.state.image;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
    const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
    return fetch(apiUrl, options);
      }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

