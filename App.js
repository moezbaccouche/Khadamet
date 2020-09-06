import React from 'react';
import {View, Text} from 'react-native';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const DrawerNavigator = createDrawerNavigator(
      {Home: Home},
      {
        contentComponent: DrawerMenu,
      },
    );

    const AppNavigator = createStackNavigator(
      {
        Home: {
          screen: Home,
          navigationOptions: {
            header: null,
          },
        },
        Notifications: {
          screen: Notifications,
          navigationOptions: {
            header: null,
          },
        },
        DrawerMenu: {
          screen: DrawerMenu,
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        initialRouteName: 'Home',
      },
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
        initialRouteName: 'Register',
      },
    );

    return <RegisterStackNavigator />;
  }
}
