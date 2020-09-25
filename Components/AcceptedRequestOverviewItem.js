import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSkillById} from '../API/skills.data';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import moment from 'moment';

export default class AcceptedRequestOverviewSecondEx extends React.Component {
  render() {
    const {
      skillId,
      requestDate,
      clientPicture,
      clientName,
      address,
      onDetailsPress,
    } = this.props;
    const skill = getSkillById(skillId);

    return (
      <View style={[styles.mainContainer, {backgroundColor: skill.color}]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleView}>
            <View style={styles.categoryImageContainer}>
              <Image source={skill.icon} style={styles.categoryImage} />
            </View>
            <Text style={styles.cardTitle}>{skill.title}</Text>
          </View>
          <View style={styles.dateAndTimeView}>
            <Text style={styles.dateAndTimeText}>
              {moment(requestDate).format('DD/MM HH:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalDivider} />
        <View style={styles.cardBody}>
          <View style={styles.detailRow}>
            <Image source={{uri: clientPicture}} style={styles.clientImage} />
            <Text style={styles.detailText}>{clientName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="ios-location-sharp"
              size={36}
              color={SECONDARY_COLOR}
            />
            <Text style={[styles.detailText, styles.addressText]}>
              {address}
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
              style={styles.buttonView}
              onPress={() => onDetailsPress()}>
              <Text style={styles.textColor}>Détails</Text>
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
    fontSize: 14,
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
    height: 50,
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
