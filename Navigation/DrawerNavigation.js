import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import CategoryExperts from '../Screens/CategoryExperts';
import Conversation from '../Screens/Conversation';
import EditRequest from '../Screens/EditRequest';
import EditSkills from '../Screens/EditSkills';
import Home from '../Screens/Home';
import LoggedUserProfile from '../Screens/LoggedUserProfile';
import Messages from '../Screens/Messages';
import MyRequests from '../Screens/MyRequests';
import NewRequest from '../Screens/NewRequest';
import Notifications from '../Screens/Notifications';
import RequestConfirmation from '../Screens/RequestConfirmation';
import RequestDetails from '../Screens/RequestDetails';
import Requests from '../Screens/Requests';
import RequestSummary from '../Screens/RequestSummary';
import Review from '../Screens/Review';
import Settings from '../Screens/Settings';
import WorkerProfile from '../Screens/WorkerProfile';
import Search from '../Screens/Search';
import DrawerMenu from '../Screens/DrawerMenu';
import Splash from '../Screens/Splash';

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
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
    Review: {
      screen: Review,
      navigationOptions: {
        header: null,
      },
    },
    WorkerProfile: {
      screen: WorkerProfile,
      navigationOptions: {
        header: null,
      },
    },
    NewRequest: {
      screen: NewRequest,
      navigationOptions: {
        header: null,
      },
    },
    RequestSummary: {
      screen: RequestSummary,
      navigationOptions: {
        header: null,
      },
    },
    RequestDetails: {
      screen: RequestDetails,
      navigationOptions: {
        header: null,
      },
    },
    RequestConfirmation: {
      screen: RequestConfirmation,
      navigationOptions: {
        header: null,
      },
    },
    LoggedUserProfile: {
      screen: LoggedUserProfile,
      navigationOptions: {
        header: null,
      },
    },
    EditSkills: {
      screen: EditSkills,
      navigationOptions: {
        header: null,
      },
    },
    Requests: {
      screen: Requests,
      navigationOptions: {
        header: null,
      },
    },
    MyRequests: {
      screen: MyRequests,
      navigationOptions: {
        header: null,
      },
    },
    EditRequest: {
      screen: EditRequest,
      navigationOptions: {
        header: null,
      },
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        header: null,
      },
    },
    Conversation: {
      screen: Conversation,
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
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      },
    },
  },
  {initialRouteName: 'Home'},
);

export default DrawerNavigator = createDrawerNavigator(
  {
    Main: {screen: HomeNavigator},
  },
  {
    contentComponent: DrawerMenu,
  },
);
