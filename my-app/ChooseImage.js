import React from 'react';
import { Button, Image, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import { ImagePicker } from 'expo';
import {navigation, NavigationActions} from 'react-navigation';
import ImgToBase64 from 'react-native-image-base64';

// var base64Img = require('base64-img');

const navigateAction = NavigationActions.navigate({
  routeName: 'ParsedView',
  params: {},
  action: NavigationActions.navigate({ routeName: 'ParsedView' }),
});

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
    text: "Enter Email",
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
        <View>
            <TextInput
            style={{width: 300, height: 40, borderColor: 'gray', borderWidth: 1, alignItems: "center"}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
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
              onPress={() => {
                this.uploadImageAndNavigate();
              }}/>
          }
        </View>
      </View>
    );
  }

  uploadImageAndNavigate() {
    console.log("start");
    this.uploadImage();
    this.props.navigation.dispatch(navigateAction);
    console.log("end");
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
        formData.append('user', this.state.text);
    const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
    return fetch(apiUrl, options)
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
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

