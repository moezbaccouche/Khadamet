import React from 'react';
import {View, ImageBackground, StyleSheet, Image, Text} from 'react-native';

export default class LogoBig extends React.Component {
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/logo.png')}
          resizeMode="stretch"
          style={styles.imageLogo}
        />
        <Text style={styles.textLogo}>Khadamet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageLogo: {
    height: 120,
    width: 120,
  },
  textLogo: {
    fontSize: 28,
    color: 'white',
  },
});
