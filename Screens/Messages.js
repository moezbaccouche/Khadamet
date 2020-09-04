import React from 'react';
import {View, StyleSheet, ScrollView, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import SearchInput from '../Components/SearchInput';
import ConversationRowItem from '../Components/ConversationRowItem';

export default class Messages extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainerWrapper}>
        <View style={styles.mainContainer}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={SECONDARY_COLOR}
          />
          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={30}
              color={PRIMARY_COLOR}
            />
            <Text style={styles.headerTitle}>Messages</Text>
          </View>
          <View style={styles.bodyContainer}>
            <SearchInput />

            <View style={styles.conversationsItems}>
              <ConversationRowItem
                senderImage={require('../assets/profilePic.jpg')}
                senderName="Lara Croft"
                msg="Hey Moez ça va ?"
                msgTime="10:20"
                nbUnreadMsgs={1}
              />
              <ConversationRowItem
                senderImage={require('../assets/profilePicMale.jpg')}
                senderName="Moez Baccouche"
                msg="Bonjour Moez, j'ai besoin de votre aide !"
                msgTime="11:52"
                nbUnreadMsgs={0}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerWrapper: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    paddingLeft: 20,
  },
  conversationsItems: {
    marginTop: 10,
  },
  bodyContainer: {
    marginTop: 30,
  },
});
