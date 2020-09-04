import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';

export default class LargeSquareButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => this.props.action()}>
        <Ionicons
          color={PRIMARY_COLOR}
          name="ios-arrow-forward-sharp"
          size={60}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    transform: [{rotate: '45deg'}],
    elevation: 25,
    borderRadius: 5,
  },
  icon: {
    transform: [{rotate: '-45deg'}],
  },
});
