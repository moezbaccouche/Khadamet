import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, STAR_COLOR, SECONDARY_COLOR} from '../assets/colors';

export default class CategoryExpertItem extends React.Component {
  render() {
    const {name, field, rating, salary, picture} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: picture}} style={styles.employeeImage} />
        <View style={styles.descriptionView}>
          <Text style={[styles.descriptionText, styles.employeeNameText]}>
            {name}
          </Text>
          <Text style={[styles.descriptionText, styles.categoryText]}>
            {field}
          </Text>
          <View style={styles.ratingAndPriceView}>
            <Text style={[styles.descriptionText, styles.labelText]}>Note</Text>
            <Text style={[styles.descriptionText, styles.ratingAndPriceText]}>
              {rating !== 0 ? rating : 'N/A'}
            </Text>

            <Ionicons name="ios-star-sharp" color={STAR_COLOR} size={16} />
            <Text
              style={[
                styles.descriptionText,
                styles.labelText,
                {paddingLeft: 10},
              ]}>
              Prix
            </Text>
            <Text style={[styles.descriptionText, styles.ratingAndPriceText]}>
              {salary} DT/h
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    borderRadius: 13,
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  employeeImage: {
    height: 90,
    width: 90,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  ratingAndPriceView: {
    flexDirection: 'row',
  },
  descriptionText: {
    color: SECONDARY_COLOR,
  },
  descriptionView: {
    marginHorizontal: 10,
  },
  employeeNameText: {
    fontSize: 18,
  },
  categoryText: {
    fontWeight: 'bold',
  },
  labelText: {
    paddingRight: 10,
  },
  ratingAndPriceText: {
    fontWeight: 'bold',
  },
});
