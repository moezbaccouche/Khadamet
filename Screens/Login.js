import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LogoBig from '../Components/LogoBig';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import {FormInput} from '../Components/FormInput';
import LargeSquareButton from '../Components/LargeSquareButton';
import {login} from '../API/users.service';
import {AuthContext} from '../Contexts/authContext';

const Login = (props) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const displaySignInButton = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator
            color={SECONDARY_COLOR}
            size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.viewButton}>
        <Text style={styles.textLogin}>Inscription</Text>
        <LargeSquareButton
          action={() => {
            loginHandle(data.email, data.password);
          }}
        />
      </View>
    );
  };

  const loginHandle = (email, password) => {
    if (data.email.length !== 0 && data.password.length !== 0) {
      setLoading(true);
      login({email, password}).then((foundUser) => {
        if (!foundUser.correctCredentials) {
          alert('Email ou mot de passe incorrect.');
          setLoading(false);
          return;
        }
        signIn(foundUser);
      });
    } else {
      alert("Veuillez saisir l'email et le mot de passe.");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      resizeMode="stretch"
      style={styles.mainContainer}>
      <StatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        translucent={true}
      />

      <LogoBig />
      <View style={styles.viewFormLogin}>
        <FormInput
          placeholder="Email..."
          iconName="ios-mail-sharp"
          secureTextEntry={false}
          autoCapitalize="none"
          onChangeText={(text) => handleEmailChange(text)}
        />
        <FormInput
          placeholder="Mot de passe..."
          iconName="ios-lock-closed"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(text) => handlePasswordChange(text)}
        />
      </View>
      <View style={styles.viewButton}>{displaySignInButton()}</View>
      <View style={styles.viewBottom}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.textBottom}>Inscription</Text>
        </TouchableOpacity>
        {/* <Text
          style={styles.textBottom}
          onPress={() => props.navigation.navigate('Register')}>
          Mot de passe oublié
        </Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader: {
    height: 56,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewFormLogin: {
    marginHorizontal: 10,
    marginTop: 50,
    alignSelf: 'stretch',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  textLogin: {
    fontSize: 22,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    paddingRight: 40,
  },
  textBottom: {
    color: SECONDARY_COLOR,
    textDecorationLine: 'underline',
  },
  viewBottom: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 40,
  },
});

export default Login;
