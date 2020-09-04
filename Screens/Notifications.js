import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Constants,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import NotificationItem from '../Components/NotificationItem';

export default class Notifications extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          backgroundColor={SECONDARY_COLOR}
          barStyle="dark-content"
        />
        <View style={styles.headerContainer}>
          <Ionicons
            name="ios-arrow-back-sharp"
            size={40}
            color={PRIMARY_COLOR}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.headerTitleText}>Notifications</Text>
        </View>
        <View style={styles.viewNotificationsContainer}>
          <Text style={styles.notificationDateText}>Aujourd'hui</Text>
          <NotificationItem
            text="Moez Baccouche vous a envoyé une demande d'emploi"
            userImage={require('../assets/profilePicMale.jpg')}
            categoryImage={require('../assets/gardening.png')}
          />
          <NotificationItem
            text="Moez Baccouche vous a envoyé un message"
            userImage={require('../assets/profilePicMale.jpg')}
            iconName="ios-chatbubbles-outline"
          />
        </View>
      </ScrollView>
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
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitleText: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    paddingLeft: 20,
  },
  viewNotificationsContainer: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 30,
  },
  notificationDateText: {
    color: '#767676',
    fontSize: 16,
  },
});
