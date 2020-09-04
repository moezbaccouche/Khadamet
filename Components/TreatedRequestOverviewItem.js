import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../assets/colors';

export class TreatedRequestOverviewItem extends React.Component {
  render() {
    const {
      categoryImage,
      backgroundColor,
      categoryName,
      month,
      day,
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dateView}>
          <Text style={styles.monthText} numberOfLines={1}>
            {month}
          </Text>
          <Text style={styles.dayText}>{day}</Text>
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.categoryTitleView}>
            <View
              style={[
                styles.categoryImageContainer,
                {backgroundColor: backgroundColor},
              ]}>
              <Image source={categoryImage} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryName}>{categoryName}</Text>
          </View>
          <Ionicons
            name="ios-chevron-forward-sharp"
            size={20}
            color="#B5B5B5"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  categoryImageContainer: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  categoryImage: {
    height: 24,
    width: 24,
  },
  categoryName: {
    fontSize: 18,
    paddingLeft: 10,
  },
  categoryTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryContainer: {
    borderRadius: 30,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 5,
    flex: 1,
  },
  dateView: {
    alignItems: 'center',
    width: 50,
  },
  monthText: {
    color: '#6D6D6D',
  },
  dayText: {
    fontWeight: 'bold',
  },
});
