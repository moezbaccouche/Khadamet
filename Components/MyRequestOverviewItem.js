import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RequestStatus from '../API/request.status';
import {getSkillById} from '../API/skills.data';
import moment from 'moment';

export default class MyRequestOverviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStatusName = (status) => {
    switch (status) {
      case RequestStatus.PENDING:
        return 'En attente';
      case RequestStatus.ACCEPTED:
        return 'Acceptée';
      case RequestStatus.REJECTED:
        return 'Refusée';
      case RequestStatus.TREATED:
        return 'Terminée';
      case RequestStatus.CANCELED:
        return 'Annulée';

      default:
        return 'Erreur';
    }
  };

  renderCardButtons = (status) => {
    const {onDetails, onCancel, onFinish, onEdit} = this.props;
    if (status === RequestStatus.PENDING) {
      return (
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[
              styles.buttonView,
              {borderRightWidth: 0.2, borderRightColor: SECONDARY_COLOR},
            ]}
            onPress={() => onCancel()}>
            <Text style={styles.textColor}>Annuler</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity style={styles.buttonView} onPress={() => onEdit()}>
            <Text style={styles.textColor}>Modifier</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (status === RequestStatus.ACCEPTED) {
      return (
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={[
              styles.buttonView,
              {borderRightWidth: 0.2, borderRightColor: SECONDARY_COLOR},
            ]}
            onPress={() => onEdit()}>
            <Text style={styles.textColor}>Modifier</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => onFinish()}>
            <Text style={styles.textColor}>Terminée</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={{
          marginTop: 25,
        }}>
        <TouchableOpacity
          style={[
            styles.buttonView,
            {borderRightWidth: 0.2, borderRightColor: SECONDARY_COLOR},
          ]}
          onPress={() => onDetails()}>
          <Text style={styles.textColor}>Détails</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      skillId,
      requestDate,
      professionalPicture,
      professionalName,
      address,
      onContainerPress,
      status,
      onImagePress,
    } = this.props;
    const skill = getSkillById(skillId);

    return (
      <TouchableOpacity
        style={[styles.mainContainer, {backgroundColor: skill.color}]}
        onPress={() => onContainerPress()}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleView}>
            <View style={styles.categoryImageContainer}>
              <Image source={skill.icon} style={styles.categoryImage} />
            </View>
            <Text style={styles.cardTitle}>{skill.title}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: SECONDARY_COLOR, fontWeight: 'bold'}}>
              {this.getStatusName(status)}
            </Text>
            <Text style={styles.dateAndTimeText}>
              {moment(requestDate).format('DD/MM HH:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalDivider} />
        <View style={styles.cardBody}>
          <View style={styles.detailRow}>
            <TouchableOpacity onPress={() => onImagePress()}>
              <Image
                source={{uri: professionalPicture}}
                style={styles.professionalImage}
              />
            </TouchableOpacity>
            <Text style={styles.detailText}>{professionalName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="ios-location-sharp"
              size={36}
              color={SECONDARY_COLOR}
            />
            <Text
              style={[styles.detailText, styles.addressText]}
              onPress={() =>
                Platform.OS === 'ios'
                  ? Linking.openURL(`maps:?q=${address}`)
                  : Linking.openURL(`geo:?q=${address}`)
              }>
              {address}
            </Text>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: SECONDARY_COLOR,
            }}
          />
          {this.renderCardButtons(status)}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 225,
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
  professionalImage: {
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
