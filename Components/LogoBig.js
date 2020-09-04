import React from 'react';
import {View, ImageBackground, StyleSheet, Image, Text} from 'react-native';

export default class LogoBig extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={require('../assets/logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textLogo}>Khadamet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageLogo: {
    height: 165,
    width: 165,
  },
  textLogo: {
    fontSize: 36,
    color: 'white',
    fontStyle: 'italic',
  },
});
