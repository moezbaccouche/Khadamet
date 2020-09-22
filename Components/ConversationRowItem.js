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
            <Text style={styles.messageTime}>
              {moment(msgTime).format('HH:mm')}
            </Text>
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
    paddingLeft: 20,
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
    paddingHorizontal: 20,
    color: '#818181',
  },
  messageTime: {
    color: '#818181',
  },
});
