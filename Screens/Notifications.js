import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ACCEPTED_REQUEST,
  CANCELED_REQUEST,
  EDITED_REQUEST,
  getReceivedNotifications,
  NEW_MESSAGE,
  NEW_REQUEST,
  REJECTED_REQUEST,
} from '../API/notifications.service';
import {getSkillById} from '../API/skills.data';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import NotificationItem from '../Components/NotificationItem';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.loggedUser = '5f579c0fc1a039082016801e'; // <--- Get From Async Storage
    this.loadReceivedNotification();
  };

  loadReceivedNotification = () => {
    getReceivedNotifications(this.loggedUser)
      .then((data) => {
        console.log('DATA', data);
        this.setState({
          notifications: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getNotificationInfos = (
    notificationType,
    notificationSenderName,
    skillId,
  ) => {
    switch (notificationType) {
      case NEW_REQUEST:
        return {
          text: `Vous avez une nouvelle demande d'emploi de ${notificationSenderName}`,
          image: this.getSkillIcon(skillId),
        };

      case ACCEPTED_REQUEST:
        return {
          text: `${notificationSenderName} a accepté(e) votre demande d'emploi`,
          iconName: 'ios-checkmark-sharp',
        };

      case REJECTED_REQUEST:
        return {
          text: `${notificationSenderName} a refusé(e) votre demande d'emploi`,
          iconName: 'ios-close-sharp',
        };

      case EDITED_REQUEST:
        return {
          text: `${notificationSenderName} a modifié(e) la demande d'emploi`,
          iconName: 'ios-pencil-sharp',
        };

      case CANCELED_REQUEST:
        return {
          text: `${notificationSenderName} a annulé la demande d'emploi`,
          iconName: 'ios-trash-sharp',
        };

      case NEW_MESSAGE:
        return {
          text: `${notificationSenderName} vous a envoyé un nouveau message`,
          iconName: 'ios-chatbubbles-sharp',
        };

      default:
        return {};
    }
  };

  getSkillIcon = (skillId) => {
    const skill = getSkillById(skillId);
    return skill.icon;
  };

  renderNotificationItem = (item) => {
    const notificationInfos = this.getNotificationInfos(
      item.type,
      item.sender.name,
      item.skillId,
    );
    return (
      <NotificationItem
        text={notificationInfos.text}
        userImage={item.sender.picture}
        categoryImage={notificationInfos.image}
        iconName={notificationInfos.iconName}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <View style={{flex: 0.2}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-sharp"
                size={30}
                color={PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.6, alignItems: 'center'}}>
            <Text style={styles.headerTitleText}>Notifications</Text>
          </View>
        </View>
        <View style={styles.viewNotificationsContainer}>
          <Text style={styles.notificationDateText}>Aujourd'hui</Text>
          <FlatList
            data={this.state.notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderNotificationItem(item)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitleText: {
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
  viewNotificationsContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  notificationDateText: {
    color: '#767676',
    fontSize: 16,
  },
});
