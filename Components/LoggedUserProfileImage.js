import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class LoggedUserProfileImage extends React.Component {
  render() {
    const {onPress, picturePath} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: picturePath}} style={styles.userImage} />
        <View style={styles.editImageIconContainer}>
          <Ionicons
            name="ios-pencil-sharp"
            color={SECONDARY_COLOR}
            size={16}
            onPress={() => onPress()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  userImage: {
    backgroundColor: 'grey',
    height: 120,
    width: 120,
    borderRadius: 80,
  },
  editImageIconContainer: {
    height: 30,
    width: 30,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 90,
    left: 205,
    borderColor: SECONDARY_COLOR,
    borderWidth: 2,
  },
});
