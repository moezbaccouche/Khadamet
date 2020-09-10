import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class LargeButton extends React.Component {
  render() {
    const {
      backgroundColor,
      color,
      borderColor,
      text,
      fontFamily,
      fontWeight,
    } = this.props;
    return (
      <TouchableOpacity
        style={{
          height: 50,
          alignSelf: 'stretch',
          backgroundColor,
          borderColor,
          borderWidth: 2,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          ...this.props,
        }}>
        <Text
          style={{
            fontSize: 18,
            color,
            textTransform: 'uppercase',
            fontFamily,
            fontWeight: fontWeight,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
