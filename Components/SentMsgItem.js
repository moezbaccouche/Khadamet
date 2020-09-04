import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';

export default class ReceivedMsgItem extends React.Component {
  render() {
    const {senderImage, msg} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.msgContainer}>
          <Text style={styles.msgReceived}>{msg}</Text>
        </View>
        <Image source={senderImage} style={styles.senderImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: Dimensions.get('window').width / 2 - 52,
    marginBottom: 5,
  },
  senderImage: {
    height: 42,
    width: 42,
    borderRadius: 50,
  },
  msgContainer: {
    borderRadius: 30,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  msgReceived: {
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: SECONDARY_COLOR,
  },
});
