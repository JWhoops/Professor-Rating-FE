import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RateScreen from './components/screen/RateScreen';
import LoginScreen from './components/screen/user/LoginScreen';
import SignUpScreen from './components/screen/user/SignupScreen';
import CommentScreen from './components/screen/CommentScreen';
import SavedScreen from './components/screen/SavedScreen';
import SearchResultScreen from './components/screen/SearchResultScreen';
import SearchScreen from './components/screen/SearchScreen';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Comment: { screen: CommentScreen },
  Result: { screen: SearchResultScreen },
  Search: { screen: SearchScreen },
  SignUp: { screen: SignUpScreen },
  Saved: { screen: SavedScreen },
  Rate: { screen: RateScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
