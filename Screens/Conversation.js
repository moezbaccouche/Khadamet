import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator,
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
  MenuProvider,
} from 'react-native-popup-menu';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {v4 as uuidv4} from 'uuid';
import io from 'socket.io-client';
import {CHAT_DEV_BASE_URL} from '../API/chat.service';
import {getUser} from '../API/users.service';
import {getConversationMessages, persistMessage} from '../API/messages.service';

let unique = 0;
export default class Conversation extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      log: [],
      msg: '',
      receiverUser: {},
      isLoading: true,
      messages: [
        // {
        //   _id: 1,
        //   text: 'Bonjour, tu vas bien ?',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: require('../assets/profilePic.jpg'),
        //   },
        // },
        // {
        //   _id: 2,
        //   text: 'Hello developer',
        //   createdAt: new Date(),
        //   user: {
        //     _id: this.loggedUserId,
        //     name: 'React Native',
        //     avatar: require('../assets/profilePicMale.jpg'),
        //   },
        // },
      ],
    };

    this.loggedUserId = '5f57a139c1a0390820168023'; //<--- get from async storage
    this.receiverUser = this.props.navigation.state.params.receiverUser;
  }

  componentDidMount = () => {
    this.conversationId = this.props.navigation.state.params.conversationId;
    const loggedUserId = this.loggedUserId;
    this.socket = io(CHAT_DEV_BASE_URL);
    this.socket.on('connect', () => {
      const socketId = this.socket.id;
      this.socket.emit('addUser', {userId: loggedUserId, socketId});
    });
    this.socket.on('chatToClient', this.onReceiveMessage);
    this.loadMessages();
  };

  loadReceiverUserDetails = () => {
    getUser(this.receiverUserId).then((data) => {
      this.setState({
        receiverUser: data,
      });
    });
  };

  loadMessages = () => {
    getConversationMessages(this.conversationId)
      .then((data) => {
        const messages = this.initMessagesArray(data);
        this.setState({
          messages: messages,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  initMessagesArray = (data) => {
    const {receiverUser} = this.props.navigation.state.params;
    let messages = [];
    data.map((message) => {
      let sender = {};
      if (message.senderId !== this.loggedUserId) {
        sender = {
          _id: message.senderId,
          name: receiverUser.name,
          avatar: receiverUser.picture,
        };
      } else {
        sender = {
          _id: this.loggedUserId,
        };
      }
      const newMessage = {
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.createdAt),
        user: sender,
      };

      messages.push(newMessage);
    });
    return messages;
  };

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

  onSendMessage = (msgText) => {
    const receiverId = 'BBBB';
    const trimmedMsg = msgText.trim();
    const id = uuidv4();
    const creationDate = new Date();
    const newMessage = {
      _id: id,
      createdAt: creationDate,
      text: trimmedMsg,
      user: {
        _id: this.loggedUserId,
        avatar: 'https://placeimg.com/140/140/any',
      },
    };

    //Save the msg in the DB
    persistMessage({
      id: id,
      msg: trimmedMsg,
      senderId: this.loggedUserId,
      receiverId: this.receiverUser.id,
      conversationId: this.conversationId,
      createdAt: creationDate,
    })
      .then((data) => console.log('MSG SAVED', data))
      .catch((err) => console.error(err));

    this.socket.emit('chatToServer', {
      sender: this.loggedUserId,
      msg: trimmedMsg,
      receiverId: receiverId,
    });

    this.addMessage(newMessage);
  };

  addMessage = (newMessage) => {
    this.setState((prevState) => {
      return {
        messages: GiftedChat.append(prevState.messages, newMessage),
        msg: '',
      };
    });
  };

  onReceiveMessage = (message) => {
    console.log('RECEIVED', message);
    if (message.sender !== this.loggedUserId) {
      console.log('HERE');
      const newMessage = {
        _id: uuidv4(),
        createdAt: new Date(),
        text: message.msg,
        user: {
          _id: message.sender,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      this.addMessage(newMessage);
    }
  };

  renderInputToolbar = () => {
    return (
      <ConversationInput
        onChangeText={(text) => this.handleChangeText(text)}
        onSend={() => this.onSendMessage(this.state.msg)}
        value={this.state.msg}
        isDisabled={this.state.msg === '' ? true : false}
      />
    );
  };

  handleChangeText = (text) => {
    this.setState({msg: text});
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            fontSize: 14,
          },
          right: {
            fontSize: 14,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: PRIMARY_COLOR,
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 5,
          },
          left: {
            backgroundColor: SECONDARY_COLOR,
            borderWidth: 1,
            borderColor: PRIMARY_COLOR,
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingVertical: 5,
          },
        }}
      />
    );
  };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={PRIMARY_COLOR} size="large" />
        </View>
      );
    }
  };

  render() {
    const {receiverUser} = this.props.navigation.state.params;
    return (
      <MenuProvider>
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
              <Text style={styles.headerTitle}>{receiverUser.name}</Text>
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
          <View style={{flex: 1, marginHorizontal: 10, marginBottom: 10}}>
            {this.displayLoading()}
            <GiftedChat
              messages={this.state.messages}
              user={{
                _id: this.loggedUserId,
              }}
              renderInputToolbar={() => this.renderInputToolbar()}
              renderBubble={this.renderBubble}
              renderTime={() => {}}
            />
          </View>
        </View>
      </MenuProvider>
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
