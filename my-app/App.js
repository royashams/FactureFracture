import React from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { ImagePicker } from 'expo';

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
});

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button 
          // style={styles.button}
          color="red"
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Button
            title="Upload Image"
            onPress={this._uploadImage}/>
        }
        {image &&
          <Image 
          source={{ uri: image }} style={styles.container}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height-100} />
          }
          
          
      </View>
    );
  }

  _uploadImage(source){
    const data = new FormData();
    data.append('name', 'testName'); // you can append anyone.
    data.append('photo', {
        uri: source.uri,
        type: 'image/jpeg', // or photo.type
        name: 'testPhotoName'
    });

    fetch('https://xxx/react_image', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data,
    }).then((response) => response.json())
        .then((responseJson) => {

           console.log(responseJson);

        }).catch((error) => {
        console.log("An error occured My Dude");
    });

}
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

