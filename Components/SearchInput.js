import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../assets/colors';

export default class SearchInput extends React.Component {
  render() {
    const {color} = this.props;
    const fieldColor = color ? color : PRIMARY_COLOR;
    return (
      <View style={[styles.mainContainer, {borderColor: fieldColor}]}>
        <Ionicons name="ios-search-sharp" color={fieldColor} size={20} />
        <TextInput
          placeholder="Recherche..."
          style={styles.textInput}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 10,
  },
});
