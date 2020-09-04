import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoBig from '../Components/LogoBig';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import {FormInput} from '../Components/FormInput';
import LargeSquareButton from '../Components/LargeSquareButton';

export default class Login extends React.Component {
  render() {
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
          />
          <FormInput
            placeholder="Mot de passe..."
            iconName="ios-lock-closed"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.viewButton}>
          <Text style={styles.textLogin}>Connexion</Text>
          <LargeSquareButton />
        </View>
        <View style={styles.viewBottom}>
          <Text
            style={styles.textBottom}
            onPress={() => this.props.navigation.navigate('Register')}>
            Inscription
          </Text>
          <Text
            style={styles.textBottom}
            onPress={() => this.props.navigation.navigate('Register')}>
            Mot de passe oublié
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

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
    marginTop: 50,
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginTop: 40,
  },
});
