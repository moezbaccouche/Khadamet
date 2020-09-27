import React, {useEffect} from 'react';
import Splash from './Screens/Splash';
import {AuthContext} from './Contexts/authContext';
import AsyncStorage from '@react-native-community/async-storage';
import {loginReducer} from './Store/reducers/loginReducer';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';
import {ActivityIndicator, LogBox, View} from 'react-native';
import DrawerNavigator from './Navigation/DrawerNavigation';
import RegisterStackNavigator from './Navigation/RegisterNavigation';

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    loggedUserId: null,
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = await foundUser.token;
        const id = await foundUser.userId;
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('loggedUserId', id);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', token: userToken, userId: id});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('loggedUserId');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      })
      .catch((e) => console.error(e));
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size="large" color="black" />
        {/* <Splash /> */}
      </View>
    );
  }

  LogBox.ignoreLogs([
    'DrawerLayoutAndroid drawerPosition',
    'VirtualizedList',
    'componentWillReceiveProps has been renamed',
    'Require cycle',
    'componentWillMount has been renamed',
    'In most cases you should not have more MenuProviders in your app',
  ]);

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? (
        <Provider store={Store}>
          <DrawerNavigator />
        </Provider>
      ) : (
        <RegisterStackNavigator />
      )}
    </AuthContext.Provider>
  );
};

export default App;
