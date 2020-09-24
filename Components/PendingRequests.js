import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import RequestOverviewItem from './PendingRequestOverviewItem';
import PendingRequestOverviewSecondEx from './PendingRequestOverview';
import PendingRequestOverview from './PendingRequestOverview';
import {
  getPendingRequestsForProfessional,
  updateRequest,
} from '../API/requests.services';
import RequestStatus from '../API/request.status';
import {
  ACCEPTED_REQUEST,
  createNotification,
  REJECTED_REQUEST,
  sendNotification,
} from '../API/notifications.service';

export default class PendingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.loggedUserId = '5f579c0fc1a039082016801e'; //<--- get it from async storage
    this.loadPendingRequests();
  };

  loadPendingRequests = () => {
    getPendingRequestsForProfessional(this.loggedUserId).then((data) => {
      this.setState({
        pendingRequests: data,
        isLoading: false,
      });
    });
  };

  renderPendingRequestItem = (item) => {
    return (
      <PendingRequestOverview
        skillId={item.skillId}
        requestDate={item.date}
        clientPicture={item.client.picture}
        clientName={item.client.name}
        address={item.address}
        onContainerPress={() => {
          this.props.navigation.navigate('RequestDetails', {request: item});
        }}
        onAccept={() =>
          this.acceptRequest(item.id, item.client.id, item.client.playerId)
        }
        onReject={() =>
          this.rejectRequest(item.id, item.client.id, item.client.playerId)
        }
      />
    );
  };

  acceptRequest = (requestId, clientId, clientPlayerId) => {
    //PlayerId is the client deviceId used for sending notifications
    this.setState({isLoading: true});
    updateRequest({status: RequestStatus.ACCEPTED}, requestId)
      .then((response) => {
        console.log('RESPONSE', response);
        //Send notification and add it to DB
        sendNotification(
          'Demande acceptée',
          "Votre demande d'emploi a été acceptée.",
          [clientPlayerId],
        );
        createNotification({
          senderId: this.loggedUserId,
          receiverId: clientId,
          type: ACCEPTED_REQUEST,
          createdAt: new Date(),
        });
        this.loadPendingRequests();
      })
      .catch((err) => {
        console.error(err);
        this.setState({isLoading: false});
      });
  };

  rejectRequest = (requestId, clientId, clientPlayerId) => {
    this.setState({isLoading: true});
    updateRequest({status: RequestStatus.REJECTED}, requestId)
      .then((response) => {
        console.log('RESPONSE', response);
        //Send notification and add it to DB
        sendNotification(
          'Demande refusée',
          "Votre demande d'emploi a été refusée.",
          [clientPlayerId],
        );
        createNotification({
          senderId: this.loggedUserId,
          receiverId: clientId,
          type: REJECTED_REQUEST,
          createdAt: new Date(),
        });
        this.loadPendingRequests();
      })
      .catch((err) => {
        console.error(err);
        this.setState({isLoading: false});
      });
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
    return (
      <View style={styles.mainContainer}>
        {this.displayLoading()}
        <FlatList
          data={this.state.pendingRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => this.renderPendingRequestItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {},
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsView: {
    flexDirection: 'row',
  },
  tabsTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },

  loadingContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
