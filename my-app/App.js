import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import ChooseImage from './ChooseImage';
import ParsedView from './ParsedView';

const RootStack = createStackNavigator({
  home: {
    screen: ChooseImage,
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
  parsedView: {
    screen: ParsedView,
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
});

const App = createAppContainer(RootStack);

export default App;