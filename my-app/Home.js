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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={{padding:10}}>To upload a bill/receipt that generates a sharable verification code, press "Create Bill". </Text>
        <Text style={{padding:10}}>To pay someone else, press "Join Bill". </Text>
        <Button
          buttonStyle={{
           padding:10
          }}
          title="Join Bill"
          onPress={() => this.props.navigation.navigate('JoinBill')}
        />
        <Button
          buttonStyle={{
            padding:10,
          }}
          color='green'
          title="Create Bill"
          onPress={() => this.props.navigation.navigate('ChooseImage')}
        /> 
      </View>
    );
  }
}
