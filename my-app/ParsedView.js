import React from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { ImagePicker } from 'expo';
import {navigation} from 'react-navigation';

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

export default class ParsedView extends React.Component {
    constructor(props) {
        super(props);
        this.state.bodyData = "default";
        }
    state = {
        image: null,
        bodyData: "empty"
    };


  render() {
    let { image } = this.state;
    const { navigation } = this.props;
    const temp = navigation.getParam('bodyData', 'default');
    console.log("temp!!!!");
    this.state.bodyData = temp;
    console.log(this.state.bodyData);
    console.log("done");
    return (
      <View style={styles.viewStyle}>
        <View
          style={{
          flexDirection: 'row',
          }}>
            {this.state.bodyData && 
            <Button 
                // style={styles.button}
                color="red"
                title="press me"
                onPress={this.tester}
            />}
            {this.state.bodyData && 
            <Text>{this.state.bodyData}</Text>
            // PROBLEM: sometimes it assumes its a string sometimes its an object so maybe instead pass in the params as just dinnerdaddy
            }
        </View>
      </View>
    );
  }

  tester(){
    console.log("beep");
  }
  uploadImage(source){
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
  pickImage = async () => {
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

