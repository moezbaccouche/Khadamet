import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import SearchInput from '../Components/SearchInput';
import ConversationRowItem from '../Components/ConversationRowItem';
import {getUserConversations} from '../API/messages.service';
import {connect} from 'react-redux';
import _ from 'lodash';
import {sortOverviews} from '../helpers/sort';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedConversations: [],
      isLoading: true,
      searchString: '',
    };
  }

  componentDidMount = () => {
    this.loggedUserId = '5f57a139c1a0390820168023';
    this.loadUserConversations();
  };

  loadUserConversations = () => {
    getUserConversations(this.loggedUserId).then((data) => {
      data.map((overview) => {
        overview.lastMessage.msgTime = new Date(overview.lastMessage.msgTime);
        this.props.dispatch({type: 'ADD_OVERVIEW', value: overview});
      });
      this.setState({
        conversations: data,
        searchedConversations: this.props.conversationsOverview,
        isLoading: false,
      });
    });
  };

  renderConversationOverviewItem = (item) => {
    return (
      <ConversationRowItem
        senderId={item.lastMessage.senderId}
        loggedUserId={this.loggedUserId}
        receiverImage={item.receiverUser.picture}
        receiverName={item.receiverUser.name}
        msg={item.lastMessage.msg}
        msgTime={item.lastMessage.msgTime}
        nbUnreadMsgs={0}
        onPress={() => {
          this.props.navigation.navigate('Conversation', {
            receiverUser: {
              id: item.receiverUser.id,
              picture: item.receiverUser.picture,
              name: item.receiverUser.name,
            },
            conversationId: item.conversationId,
          });
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

  searchConversation = (text) => {
    const searchString = text.toLowerCase().trim();
    console.log(searchString);
    this.setState({
      searchString: searchString,
    });
    if (this.state.searchString.length === 0) {
      this.setState({
        searchedConversations: [...this.props.conversationsOverview],
      });
    } else {
      this.setState({
        searchedConversations: [
          ...this.props.conversationsOverview.filter((item) =>
            item.receiverUser.name.toLowerCase().includes(searchString),
          ),
        ],
      });
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={SECONDARY_COLOR} />
        <View style={styles.headerToolbar}>
          <View style={{flex: 0.2}}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={30}
              color={PRIMARY_COLOR}
            />
          </View>
          <View style={{flex: 0.6, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>Messages</Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          {this.displayLoading()}
          <SearchInput onChangeText={(text) => this.searchConversation(text)} />
          <FlatList
            style={styles.conversationsItems}
            data={sortOverviews(this.state.searchedConversations)}
            keyExtractor={(item) => item.conversationId.toString()}
            renderItem={({item}) => this.renderConversationOverviewItem(item)}
            extraData={this.props.conversationsOverview}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
  },
  conversationsItems: {
    marginTop: 10,
  },
  bodyContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    conversationsOverview: sortOverviews(state.conversationsOverview),
  };
};

export default connect(mapStateToProps)(Messages);
