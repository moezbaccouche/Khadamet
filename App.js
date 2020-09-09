import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Splash from './Screens/Splash';
import MainMenu from './Screens/MainMenu';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Register2 from './Screens/Register2';
import Home from './Screens/Home';
import NotificationItem from './Components/NotificationItem';
import Notifications from './Screens/Notifications';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import DrawerMenu from './Screens/DrawerMenu';
import WorkerProfile from './Screens/WorkerProfile';
import SkillRating from './Components/SkillRating';
import RatingBar from './Components/RatingBar';
import {PRIMARY_COLOR} from './assets/colors';
import Example from './Components/PopupMenu';
import NewRequest from './Screens/NewRequest';
import RequestSummary from './Screens/RequestSummary';
import RequestConfirmation from './Screens/RequestConfirmation';
import LoggedUserProfile from './Screens/LoggedUserProfile';
import RequestDetails from './Screens/RequestDetails';
import CategoryExperts from './Screens/CategoryExperts';
import Settings from './Screens/Settings';
import Messages from './Screens/Messages';
import Requests from './Screens/Requests';
import RequestOverviewItem from './Components/PendingRequestOverviewItem';
import TreatedRequests from './Components/TreatedRequests';
import {TreatedRequestOverviewItem} from './Components/TreatedRequestOverviewItem';
import ReceivedMsgItem from './Components/ReceivedMsgItem';
import SentMsgItem from './Components/SentMsgItem';
import ConversationInput from './Components/ConversationInput';
import Conversation from './Screens/Conversation';
import ProfessionalSkillItem from './Components/ProfessionalSkillItem';
import RegisterSkills from './Screens/RegisterSkills';
import {AuthContext} from './Contexts/authContext';
import AsyncStorage from '@react-native-community/async-storage';
import {loginReducer} from './reducers/loginReducer';
const App = () => {
  // const initialLoginState = {
  //   isLoading: true,
  //   userToken: null,
  // };

  // const [loginState, dispatch] = React.useReducer(
  //   loginReducer,
  //   initialLoginState,
  // );

  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async (foundUser) => {
  //       const userToken = await foundUser.token;
  //       try {
  //         await AsyncStorage.setItem('userToken', userToken);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       dispatch({type: 'LOGIN', token: userToken});
  //     },
  //     signOut: async () => {
  //       try {
  //         await AsyncStorage.removeItem('userToken');
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       dispatch({type: 'LOGOUT'});
  //     },
  //   }),
  //   [],
  // );

  // useEffect(() => {
  //   AsyncStorage.getItem('userToken')
  //     .then((userToken) => {
  //       dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  //     })
  //     .catch((e) => console.error(e));
  // }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }

  // return (
  //   <AuthContext.Provider value={authContext}>
  //     {loginState.userToken !== null ? <Home /> : <RegisterStackNavigator />}
  //   </AuthContext.Provider>
  // );

  return <HomeNavigator />;
};

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    CategoryExperts: {
      screen: CategoryExperts,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);

const RegisterStackNavigator = createStackNavigator(
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

export default App;

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const DrawerNavigator = createDrawerNavigator(
//       {Home: Home},
//       {
//         contentComponent: DrawerMenu,
//       },
//     );

//     const AppNavigator = createStackNavigator(
//       {
//         Home: {
//           screen: Home,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         Notifications: {
//           screen: Notifications,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         DrawerMenu: {
//           screen: DrawerMenu,
//           navigationOptions: {
//             header: null,
//           },
//         },
//       },
//       {
//         initialRouteName: 'Home',
//       },
//     );

//     const RegisterStackNavigator = createStackNavigator(
//       {
//         Login: {
//           screen: Login,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         Register: {
//           screen: Register,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         RegisterInfos: {
//           screen: Register2,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         RegisterSkills: {
//           screen: RegisterSkills,
//           navigationOptions: {
//             header: null,
//           },
//         },
//       },
//       {
//         initialRouteName: 'Register',
//       },
//     );

//     return <Login />;
//   }
// }
