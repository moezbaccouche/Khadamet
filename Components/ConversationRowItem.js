import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import moment from 'moment';

export default class ConversationRowItem extends React.Component {
  displayMessage = () => {
    const {nbUnreadMsgs, msg, senderId, loggedUserId} = this.props;
    const readMsgStyle =
      nbUnreadMsgs > 0 ? {fontWeight: 'bold', color: '#000'} : {};
    return (
      <View style={{flex: 1}}>
        <Text style={[styles.receiverMessage, readMsgStyle]} numberOfLines={1}>
          {senderId === loggedUserId ? 'Vous: ' : ''}
          {msg}
        </Text>
      </View>
    );
  };

  renderFrenchMonthName = (date) => {
    //Returns capitalized name of the month in french
    require('moment/locale/fr');
    moment.locale('fr');
    return (
      moment(date).format('MMM').charAt(0).toUpperCase() +
      moment(date).format('MMM').slice(1)
    );
  };

  renderFrenchDayName = (date) => {
    require('moment/locale/fr');
    moment.locale('fr');
    return (
      moment(date).format('ddd').charAt(0).toUpperCase() +
      moment(date).format('ddd').slice(1)
    );
  };

  displayTime = () => {
    const {msgTime} = this.props;
    console.log('DATE', moment(msgTime).add(7, 'days'));
    const now = new Date();
    if (moment(now).isBetween(moment(msgTime), moment(msgTime).add(1, 'day'))) {
      //Display Time
      return moment(msgTime).format('HH:mm');
    } else {
      if (
        moment(now).isBetween(moment(msgTime), moment(msgTime).add(7, 'days'))
      ) {
        //Display day name
        return this.renderFrenchDayName(msgTime);
      }
      //Display date
      return `${moment(msgTime).format('DD')} ${this.renderFrenchMonthName(
        msgTime,
      )}`;
    }
  };

  render() {
    const {
      receiverImage,
      receiverName,
      nbUnreadMsgs,
      msgTime,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => onPress()}>
        <Image source={{uri: receiverImage}} style={styles.receiverImage} />
        <View style={styles.messageView}>
          <View style={styles.receiverNameAndTimeView}>
            <Text style={styles.receiverFullName}>{receiverName}</Text>
            <Text style={styles.messageTime}>{this.displayTime()}</Text>
          </View>
          <View style={styles.messageAndUnreadMessagesNumberView}>
            {this.displayMessage()}

            {nbUnreadMsgs > 0 && (
              <View style={styles.unreadMessagesNumberContainer}>
                <Text style={styles.unreadMessagesNumber}>{nbUnreadMsgs}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  receiverImage: {
    height: 62,
    width: 62,
    borderRadius: 50,
  },
  messageView: {
    flex: 1,
  },
  receiverNameAndTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiverFullName: {
    fontWeight: 'bold',
    paddingLeft: 15,
    fontSize: 15,
  },
  messageAndUnreadMessagesNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadMessagesNumber: {
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    fontSize: 12,
  },
  unreadMessagesNumberContainer: {
    height: 16,
    width: 16,
    borderRadius: 50,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiverMessage: {
    paddingHorizontal: 15,
    color: '#818181',
  },
  messageTime: {
    color: '#818181',
  },
});
