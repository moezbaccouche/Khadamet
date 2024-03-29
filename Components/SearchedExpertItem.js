import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  PRIMARY_COLOR,
  STAR_COLOR,
  SECONDARY_COLOR,
  MUTED_COLOR,
} from '../assets/colors';

export default class SearchedExpertItem extends React.Component {
  render() {
    const {
      name,
      field,
      rating,
      salary,
      picture,
      phone,
      email,
      onPress,
    } = this.props;
    console.log(this.props);
    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => onPress()}>
        <Image source={{uri: picture}} style={styles.employeeImage} />

        <View style={styles.descriptionView}>
          <Text style={[styles.descriptionText, styles.employeeNameText]}>
            {name}
          </Text>
          <Text style={[styles.descriptionText, styles.categoryText]}>
            {field}
          </Text>
          <Text style={[styles.descriptionText, styles.categoryText]}>
            {email}
          </Text>
          <Text style={[styles.descriptionText, styles.categoryText]}>
            {phone}
          </Text>
          {/* <View style={styles.ratingAndPriceView}>
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
          </View> */}
        </View>
      </TouchableOpacity>
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
    backgroundColor: MUTED_COLOR,
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
