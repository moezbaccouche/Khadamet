import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LogoBig from '../Components/LogoBig';
import LargeButton from '../Components/LargeButton';
import {PRIMARY_COLOR} from '../assets/colors';

export default class MainMenu extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.mainContainer}
        source={require('../assets/splash.png')}
        resizeMode="stretch">
        <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
        <LogoBig />
        <View style={styles.viewButtons}>
          <LargeButton
            borderColor="white"
            color="white"
            text="Connexion"
            backgroundColor="#27ae60"
            fontFamily="Montserrat-Bold"
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <LargeButton
            color="white"
            text="Inscription"
            backgroundColor="#27ae60"
            borderColor="#27ae60"
            fontFamily="Montserrat-Regular"
            onPress={() => this.props.navigation.navigate('Register')}
          />
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

  viewButtons: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 30,
  },
});
