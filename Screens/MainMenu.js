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

export default class MainMenu extends React.Component {
  render() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    }
    return (
      <ImageBackground
        style={styles.mainContainer}
        source={require('../assets/splash.png')}
        resizeMode="stretch">
        <LogoBig />
        <View style={styles.viewButtons}>
          <LargeButton
            borderColor="white"
            color="white"
            text="Connexion"
            backgroundColor="#27ae60"
            fontFamily="Montserrat-Bold"
          />
          <LargeButton
            color="white"
            text="Inscription"
            backgroundColor="#27ae60"
            borderColor="#27ae60"
            fontFamily="Montserrat-Regular"
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
