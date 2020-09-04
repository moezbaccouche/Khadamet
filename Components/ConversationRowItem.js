import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';

export default class ConversationRowItem extends React.Component {
  displayMessage = () => {
    const {nbUnreadMsgs, msg} = this.props;
    const readMsgStyle =
      nbUnreadMsgs > 0 ? {fontWeight: 'bold', color: '#000'} : {};
    return (
      <View style={{flex: 1}}>
        <Text style={[styles.senderMessage, readMsgStyle]} numberOfLines={1}>
          {msg}
        </Text>
      </View>
    );
  };

  render() {
    const {senderImage, senderName, msg, nbUnreadMsgs, msgTime} = this.props;
    console.log(this.props);
    return (
      <View style={styles.mainContainer}>
        <Image source={senderImage} style={styles.senderImage} />
        <View style={styles.messageView}>
          <View style={styles.senderNameAndTimeView}>
            <Text style={styles.senderFullName}>{senderName}</Text>
            <Text style={styles.messageTime}>{msgTime}</Text>
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
      </View>
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
  senderImage: {
    height: 62,
    width: 62,
    borderRadius: 50,
  },
  messageView: {
    flex: 1,
  },
  senderNameAndTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  senderFullName: {
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
  senderMessage: {
    paddingHorizontal: 20,
    color: '#818181',
  },
  messageTime: {
    color: '#818181',
  },
});
