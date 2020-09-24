import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../assets/colors';

export default class DrawerMenuItem extends React.Component {
  render() {
    const {iconName, title, onPress} = this.props;
    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => onPress()}>
        <Ionicons
          name={iconName}
          title={title}
          size={42}
          color={PRIMARY_COLOR}
        />
        <Text style={styles.itemTitleText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  itemTitleText: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    paddingLeft: 10,
  },
});
