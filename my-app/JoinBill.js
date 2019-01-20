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
    text: "Enter Verification",
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Please type in your Verification Number Below</Text>
        <TextInput
              style={{margin:5, width: 300, height: 20, borderColor: 'gray', borderWidth: 1, alignItems: "center"}}
              textAlign={'center'}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
        <Button
          title='confirm'/>
      </View>
    );
  }
}
