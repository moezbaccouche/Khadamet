import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from '../assets/colors';

export class FormInput extends React.Component {
  render() {
    const {iconName} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Ionicons
          style={styles.icon}
          name={iconName}
          color={PRIMARY_COLOR}
          size={20}
        />
        <TextInput style={styles.textInput} {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: TERTIARY_COLOR,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
