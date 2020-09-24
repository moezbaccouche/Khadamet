import {createStackNavigator} from 'react-navigation';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Register2 from '../Screens/Register2';
import RegisterSkills from '../Screens/RegisterSkills';

export default RegisterStackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    RegisterInfos: {
      screen: Register2,
      navigationOptions: {
        header: null,
      },
    },
    RegisterSkills: {
      screen: RegisterSkills,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);
