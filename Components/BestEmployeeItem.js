import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR, STAR_COLOR} from '../assets/colors';

export default class BestEmployeeItem extends React.Component {
  render() {
    const {picture, fullName, age, field} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.employeeImage} source={picture} />
        <View style={styles.employeeDescription}>
          <Text style={styles.textEmployeeDescription}>{fullName}</Text>
          <Text style={styles.textEmployeeDescription}>{age} ans</Text>
          <View style={styles.viewEmployeeRating}>
            <Ionicons name="ios-star-sharp" size={20} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={20} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={20} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={20} color={STAR_COLOR} />
            <Ionicons
              name="star-outline"
              size={18}
              color={STAR_COLOR}
              style={{paddingBottom: 1}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 110,
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 13,
    marginBottom: 10,
  },
  employeeImage: {
    height: 110,
    width: 110,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  employeeDescription: {
    marginLeft: 10,
  },
  viewEmployeeRating: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  textEmployeeDescription: {
    color: SECONDARY_COLOR,
    fontSize: 18,
  },
});
