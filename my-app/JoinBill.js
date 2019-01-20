import React from 'react';
import { Modal, Button, Image, View, StyleSheet, Dimensions, TextInput, Text, TouchableHighlight } from 'react-native';


// const navigateAction = NavigationActions.navigate({
//   routeName: 'ParsedView',
//   params: {},
//   action: NavigationActions.navigate({ routeName: 'ParsedView' }),
// });

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
    margin: 10
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:25,
    flexDirection: 'column'
  }
});

export default class JoinBill extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
  code: "Enter Verification",
  user: "Enter User (Email)"
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Please type in your Verification Number Below</Text>
        <TextInput
              style={{margin:5, width: 300, height: 20, borderColor: 'gray', borderWidth: 1, alignItems: "center"}}
              textAlign={'center'}
              onChangeText={(code) => this.setState({code})}
              value={this.state.code}
            />

        <Text>Please type in your User Below</Text>
        <TextInput
              style={{margin:5, width: 300, height: 20, borderColor: 'gray', borderWidth: 1, alignItems: "center"}}
              textAlign={'center'}
              onChangeText={(user) => this.setState({user})}
              value={this.state.user}
            />
        <Button
          title='confirm'
          onPress={() => {
            this.addUser();
          }}/>
      </View>
    );
  }

  async addUser(){
    const apiUrl = 'https://facturefracture.azurewebsites.net/add_participant';
    // const formData = new FormData();
    // formData.append('user', this.state.user);
    // formData.append('code', this.state.code);
    const options = {
          method: 'POST',
          body: JSON.stringify(
            {code: this.state.code,
             user: this.state.user
            }
          ),
          // body:
          //   {code: this.state.code,
          //    user: this.state.user
          //   },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
    console.log(options);
    return fetch(apiUrl, options)
    .then((res) => res.json())
    .then((response) => 
      {console.log(response.json());
      // {console.log('Success:', response);
      })
    .catch(error => console.error('Error:', error));
  }
}
