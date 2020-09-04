import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';

export default class PendingRequestOverview extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleView}>
            <View style={styles.categoryImageContainer}>
              <Image
                source={require('../assets/gardening.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.cardTitle}>Jardinage</Text>
          </View>
          <View style={styles.dateAndTimeView}>
            <Text style={styles.dateAndTimeText}>23/08 10:30</Text>
          </View>
        </View>
        <View style={styles.horizontalDivider} />
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
              name="ios-location-sharp"
              size={36}
              color={SECONDARY_COLOR}
            />
            <Text style={[styles.detailText, styles.addressText]}>
              Route de Sfax, Borjine, M'Saken, Sousse
            </Text>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: SECONDARY_COLOR,
            }}
          />
          <View style={styles.rowButtons}>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {borderRightWidth: 0.2, borderRightColor: SECONDARY_COLOR},
              ]}>
              <Text style={styles.textColor}>Refuser</Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity style={styles.buttonView}>
              <Text style={styles.textColor}>Accepter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 225,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 13,
    marginVertical: 15,
    elevation: 5,
  },
  categoryImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 8,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    height: 24,
    width: 24,
  },
  horizontalDivider: {
    height: 0.2,
    backgroundColor: SECONDARY_COLOR,
  },
  cardHeader: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingRight: 30,
    paddingLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  cardBody: {
    marginTop: 15,
  },
  dateAndTimeText: {
    color: SECONDARY_COLOR,
    fontSize: 14,
    fontStyle: 'italic',
  },
  cardTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColor: {
    color: SECONDARY_COLOR,
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 0.2,
    height: 52,
    backgroundColor: SECONDARY_COLOR,
  },
  addressText: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});
