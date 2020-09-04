import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import LogoBig from '../Components/LogoBig';

export default class Splash extends React.Component {
  render() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    }
    return (
      <ImageBackground
        style={styles.mainContainer}
        resizeMode="stretch"
        source={require('../assets/splash.png')}>
        <LogoBig />
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
});
