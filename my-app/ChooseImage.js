import React from 'react';
import { Modal, Button, Image, View, StyleSheet, Dimensions, TextInput, Text, TouchableHighlight } from 'react-native';
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
  constructor(props) {
    super(props);
  }

  state = {
    image: null,
    text: "Enter Email",
    filepath: null,
    data: null,
    dataBody: null,
    code: null,
    modalVisible: true,
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
              style={{width: 300, height: 20, borderColor: 'gray', borderWidth: 1, alignItems: "center"}}
              textAlign={'center'}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            {this.state.dataBody && this.state.code &&
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22, alignItems: 'center'}}>
                  <View>
                    <Text>Verification Code: {this.state.code}</Text>
                    <Text>Total: {this.state.dataBody.total}</Text>
                    <Text>Participant: {this.state.text}</Text>
          
                    <Button
                      title="Hide Modal"
                      onPress={() => {
                        this.setModalVisible(false);
                        this.state.code = null;
                        this.setModalVisible(true);
                      }}
                    /> 
                  </View>
                </View>
            </Modal>
            }
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
          {/* <Button 
            // style={styles.button}
            color="green"
            title="Go"
            onPress={() => this.props.navigation.navigate('ParsedView', { bodyData: this.state.dataBody["dinnerdaddy"]})}
          /> */}
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  uploadImageAndNavigate() {
    console.log("start");
    this.uploadImage();
    // this.props.navigation.dispatch(navigateAction);
    // this.getVerification(this.state.filepath);
    console.log("end");
  }

  goTo(screen){
    this.props.navigation.navigate('screen');
  }

  async getVerification(apiUrl) {
    fetch(apiUrl)
    .then(response => {
      console.log(response);
      console.log("Attached Data to Frontend");
      this.setState({ dataBody: JSON.parse(response._bodyText)});
      console.log(typeof this.state.dataBody);
      console.log(this.state.dataBody);
      return response.json();
    })
  }

  async uploadImage() {
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
    .then(response => 
      {console.log(response);
      this.state.code = response.code
      this.state.filepath = response.json_filepath;
      this.getVerification(this.state.filepath);
      // {console.log('Success:', response);
      })
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

