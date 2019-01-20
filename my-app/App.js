import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import ChooseImage from './ChooseImage';
import ParsedView from './ParsedView';

const RootStack = createStackNavigator({
  Home: {
    screen: ChooseImage,
    routeName: 'ChooseImage',
    navigationOptions: ({ navigation }) => ({
      title: "Choose Image",
      headerStyle: {
        backgroundColor: '#f4511e',
        height: 30
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center'
      },
    }),
  },
  ParsedView: {
    screen: ParsedView,
    routeName: 'ParsedView',
    navigationOptions: ({ navigation }) => ({
      title: "Parsed Results",
      headerStyle: {
        backgroundColor: '#f4511e',
        height: 30
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center'
      },
    }),
  },
},
{
  initialRouteName: 'Home',
}
);

const App = createAppContainer(RootStack);

export default App;