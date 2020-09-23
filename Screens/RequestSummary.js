import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';
import moment from 'moment';
import {getSkillById} from '../API/skills.data';
import {addNewRequest} from '../API/requests.services';
import {sendNotification} from '../API/notifications.service';

export default class RequestSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  submitRequest = () => {
    this.setState({isLoading: true});
    const {
      request,
      color,
      professionalPlayerId,
    } = this.props.navigation.state.params;
    const newRequest = {...request, createdAt: new Date()};
    addNewRequest(newRequest).then((response) => {
      console.log('RESPONSE', response);
      this.setState({isLoading: false});
      //Send notification to the professional
      sendNotification(
        'Nouvelle demande',
        "Vous avez une nouvelle demande d'emploi.",
        [professionalPlayerId],
      );
      this.props.navigation.replace('RequestConfirmation', {color});
    });
  };

  displayLoadingOrButton = () => {
    const {color} = this.props.navigation.state.params;
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={color} size="large" />
        </View>
      );
    }
    return (
      <View style={styles.buttonView}>
        <LargeButton
          backgroundColor={color}
          color={SECONDARY_COLOR}
          text="Confirmer"
          borderColor={color}
          fontWeight="bold"
          borderRadius={8}
          onPress={() => this.submitRequest()}
        />
      </View>
    );
  };

  render() {
    const {
      request,
      professionalName,
      color,
    } = this.props.navigation.state.params;
    const skill = getSkillById(request.skillId);
    console.log('SKILL', skill);
    console.log('REQUEST', request);

    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
        <View style={styles.headerToolbar}>
          <Ionicons
            name="ios-arrow-back-sharp"
            color={color}
            size={30}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={[styles.headerTitle, {color: color}]}>
            Confirmation de la demande
          </Text>
        </View>
        <View style={[styles.summaryView, {borderColor: color}]}>
          <Text style={{fontSize: 16, color: color, fontWeight: 'bold'}}>
            Résumé de la demande
          </Text>
          <View style={styles.detailsRowView}>
            <Image
              source={require('../assets/worker.png')}
              style={styles.icon}
            />
            <Text style={styles.detailsText}>{professionalName}</Text>
          </View>
          <View style={styles.detailsRowView}>
            <Image
              source={require('../assets/location.png')}
              style={styles.icon}
            />
            <Text style={styles.detailsText}>{request.address}</Text>
          </View>
          <View style={styles.detailsRowView}>
            <Image source={require('../assets/time.png')} style={styles.icon} />
            <Text style={styles.detailsText}>
              {moment(request.date).format('DD/MM/yyyy HH:mm')}
            </Text>
          </View>
          <View style={styles.detailsRowView}>
            <Text
              style={{fontWeight: 'bold', color: skill.color, fontSize: 18}}>
              Opération:
            </Text>
            <Text style={{fontSize: 18, paddingLeft: 10}}>{skill.title}</Text>
          </View>
        </View>
        {this.displayLoadingOrButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  summaryView: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 60,
  },
  headerToolbar: {
    height: 56,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    paddingLeft: 20,
    fontSize: 20,
  },
  detailsRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    height: 32,
    width: 32,
  },
  detailsText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonView: {
    marginHorizontal: 20,
    marginTop: 25,
  },
});
