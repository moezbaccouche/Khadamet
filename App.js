import React, {useEffect} from 'react';
import Splash from './Screens/Splash';
import {AuthContext} from './Contexts/authContext';
import AsyncStorage from '@react-native-community/async-storage';
import {loginReducer} from './Store/reducers/loginReducer';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';
import {LogBox} from 'react-native';
import DrawerNavigator from './Navigation/DrawerNavigation';
import RegisterStackNavigator from './Navigation/RegisterNavigation';

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

  LogBox.ignoreLogs([
    'DrawerLayoutAndroid drawerPosition',
    'VirtualizedList',
    'componentWillReceiveProps has been renamed',
    'Require cycle',
    'componentWillMount has been renamed',
    'In most cases you should not have more MenuProviders in your app',
  ]);

  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
