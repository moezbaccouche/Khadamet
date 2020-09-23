import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';

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
    const {categoryImage, text, userImage, iconName} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.userImage} source={{uri: userImage}} />
        <View style={styles.viewCategoryImage}>
          {this.displayNotificationCategory()}
        </View>
        <View style={styles.viewTextContainer}>
          <Text style={styles.notificationText}>{text}</Text>
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
  },
  notificationText: {
    paddingHorizontal: 30,
  },
  viewCategoryImage: {
    height: 34,
    width: 34,
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    top: 47,
    left: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
