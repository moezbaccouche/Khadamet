import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MUTED_COLOR, PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import moment from 'moment';

export default class NotificationItem extends React.Component {
  displayNotificationCategory = () => {
    const {iconName, categoryImage} = this.props;
    if (iconName !== undefined) {
      return (
        <Ionicons
          name={iconName}
          size={24}
          color={SECONDARY_COLOR}
          style={{paddingHorizontal: 5}}
        />
      );
    }
    return (
      <Image
        source={categoryImage}
        style={{paddingHorizontal: 5, height: 24, width: 24}}
      />
    );
  };

  render() {
    const {
      categoryImage,
      text,
      userImage,
      iconName,
      iconContainerBackground,
      time,
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.userImage} source={{uri: userImage}} />
        <View
          style={[
            styles.viewCategoryImage,
            {backgroundColor: iconContainerBackground},
          ]}>
          {this.displayNotificationCategory()}
        </View>
        <View style={styles.viewTextContainer}>
          {text}
          <Text style={styles.time}>
            {moment(time).format('DD/MM')} à {moment(time).format('HH:mm')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 72,
    width: 72,
    borderRadius: 50,
    borderColor: MUTED_COLOR,
    borderWidth: 1,
    backgroundColor: MUTED_COLOR,
  },
  notificationText: {
    paddingHorizontal: 30,
  },
  viewCategoryImage: {
    height: 34,
    width: 34,
    position: 'absolute',
    top: 47,
    left: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  time: {
    fontSize: 12,
    color: MUTED_COLOR,
    paddingTop: 5,
  },
});
