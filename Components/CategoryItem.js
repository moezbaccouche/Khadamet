import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../assets/colors';

export default class CategoryItem extends React.Component {
  render() {
    const {categoryTitle, categoryColor, categoryIcon, onPress} = this.props;
    return (
      <TouchableOpacity
        style={[styles.mainContainer, {backgroundColor: categoryColor}]}
        source={categoryIcon}
        onPress={() => onPress()}>
        <Image source={categoryIcon} style={styles.imageCategory} />
        <Text style={styles.textCategory}>{categoryTitle}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 130,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
  imageCategory: {
    height: 52,
    width: 52,
  },
  textCategory: {
    color: SECONDARY_COLOR,
    fontSize: 20,
  },
});
