import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';

export default class HomeSearchInput extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Ionicons
          name="ios-search-sharp"
          size={20}
          color={PRIMARY_COLOR}
          style={{paddingHorizontal: 10}}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Cherchez un service, un expert, ..."
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 5,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center',
    marginHorizontal: 40,
    alignSelf: 'stretch',
  },
  textInput: {
    flex: 1,
  },
});
