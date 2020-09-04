import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {PRIMARY_COLOR} from '../assets/colors';

export default class ReceivedMsgItem extends React.Component {
  render() {
    const {senderImage, msg} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image source={senderImage} style={styles.senderImage} />
        <View style={styles.msgContainer}>
          <Text style={styles.msgReceived}>{msg}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: Dimensions.get('window').width / 2 - 52,
    marginBottom: 5,
  },
  senderImage: {
    height: 42,
    width: 42,
    borderRadius: 50,
  },
  msgContainer: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 30,
    marginLeft: 10,
    justifyContent: 'center',
  },
  msgReceived: {
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
