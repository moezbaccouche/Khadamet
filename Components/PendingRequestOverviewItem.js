import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';

export default class RequestOverviewItem extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardTitleView}>
          <View style={styles.categoryImageContainer}>
            <Image
              source={require('../assets/gardening.png')}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.cardTitle}>Jardinage</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardBody}>
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/profilePicMale.jpg')}
              style={styles.clientImage}
            />
            <Text style={styles.detailText}>Moez Baccouche</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="ios-calendar-sharp"
              size={36}
              color={SECONDARY_COLOR}
            />
            <Text style={styles.detailText}>27/08/2020 17:00</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 240,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 13,
    marginVertical: 15,
    elevation: 5,
  },
  categoryImageContainer: {
    height: 62,
    width: 62,
    borderRadius: 8,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    height: 42,
    width: 42,
  },
  divider: {
    height: 0.2,
    backgroundColor: SECONDARY_COLOR,
  },
  cardTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  clientImage: {
    height: 36,
    width: 36,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: SECONDARY_COLOR,
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: SECONDARY_COLOR,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardBody: {
    margin: 20,
  },
});
