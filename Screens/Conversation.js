import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import ConversationInput from '../Components/ConversationInput';
import ReceivedMsgItem from '../Components/ReceivedMsgItem';
import SentMsgItem from '../Components/SentMsgItem';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';

let unique = 0;
export default class Conversation extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {log: []};
  }

  selectNumber(value) {
    this.addLog(`selecting number: ${value}`);
  }

  selectOptionType(value) {
    const v = typeof value === 'object' ? JSON.stringify(value) : value;
    this.addLog(`selecting type: ${v}`);
    return value !== 'Do not close';
  }

  addLog(value) {
    this.setState({
      log: [
        ...this.state.log,
        {
          value,
          id: ++unique,
        },
      ],
    });
  }

  render() {
    return (
      <MenuContext>
        <View style={styles.mainContainer}>
          <StatusBar
            backgroundColor={SECONDARY_COLOR}
            barStyle="dark-content"
          />
          <View style={styles.headerToolbar}>
            <View style={{flex: 0.2, alignItems: 'flex-start'}}>
              <Ionicons
                name="ios-arrow-back-sharp"
                color={PRIMARY_COLOR}
                size={30}
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={{flex: 0.6, alignItems: 'center'}}>
              <Text style={styles.headerTitle}>Lara Croft</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Menu
                name="types"
                onSelect={(value) => this.selectOptionType(value)}
                onBackdropPress={() =>
                  this.addLog('menu will be closed by backdrop')
                }
                onOpen={() => this.addLog('menu is opening')}
                onClose={() => this.addLog('menu is closing')}>
                <MenuTrigger style={styles.trigger}>
                  <Ionicons
                    name="ios-ellipsis-vertical"
                    color={PRIMARY_COLOR}
                    size={30}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{optionsContainer: {borderRadius: 8}}}>
                  <MenuOption
                    value="Normal"
                    text="Appeler"
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                  <MenuOption
                    text="Envoyer un SMS"
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                  <MenuOption
                    value={{text: 'Hello world!'}}
                    text="Voir profil"
                    onSelect={() => console.log('Voir profil')}
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <ScrollView
            style={styles.conversationContainer}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}>
            <ReceivedMsgItem
              senderImage={require('../assets/profilePic.jpg')}
              msg="Bonjour, tu vas bien ?"
            />
            <SentMsgItem
              senderImage={require('../assets/profilePicMale.jpg')}
              msg="Bonjour, tu vas bien ?"
            />
            <ReceivedMsgItem
              senderImage={require('../assets/profilePic.jpg')}
              msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
            />
            <SentMsgItem
              senderImage={require('../assets/profilePicMale.jpg')}
              msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
            />
            <SentMsgItem
              senderImage={require('../assets/profilePicMale.jpg')}
              msg="Hello"
            />
            <ReceivedMsgItem
              senderImage={require('../assets/profilePic.jpg')}
              msg="dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
            />
          </ScrollView>
          <KeyboardAvoidingView
            style={styles.textInputContainer}
            behavior="height">
            <ConversationInput />
          </KeyboardAvoidingView>
        </View>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerToolbar: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  conversationContainer: {
    flex: 0.8,
    marginHorizontal: 20,
  },
  textInputContainer: {
    flex: 0.1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  menuItemsText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
