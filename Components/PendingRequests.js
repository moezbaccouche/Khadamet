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
import {connect} from 'react-redux';
import EmptyData from './EmptyData';

class PendingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loggedUserId = this.props.loggedUser.id;
    this.loadPendingRequests();
  }

  loadPendingRequests = () => {
    getPendingRequestsForProfessional(this.loggedUserId).then((data) => {
      data.map((req) => {
        this.props.dispatch({type: 'SET_PENDING_REQUEST', value: req});
      });
      this.setState({
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
        onAccept={() => this.acceptRequest(item)}
        onReject={() => this.rejectRequest(item)}
      />
    );
  };

  acceptRequest = (request) => {
    //PlayerId is the client deviceId used for sending notifications
    this.setState({isLoading: true});
    updateRequest({status: RequestStatus.ACCEPTED}, request.id)
      .then((response) => {
        console.log('RESPONSE', response);
        //Send notification and add it to DB
        sendNotification(
          'Demande acceptée',
          "Votre demande d'emploi a été acceptée.",
          [request.client.playerId],
        );
        createNotification({
          senderId: this.loggedUserId,
          receiverId: request.client.id,
          type: ACCEPTED_REQUEST,
          createdAt: new Date(),
        });
        this.props.dispatch({type: 'SET_ACCEPTED_REQUEST', value: response});
        this.props.dispatch({type: 'REMOVE_PENDING_REQUEST', value: response});
        this.setState({isLoading: false});
      })
      .catch((err) => {
        console.error(err);
        this.setState({isLoading: false});
      });
  };

  rejectRequest = (request) => {
    this.setState({isLoading: true});
    updateRequest({status: RequestStatus.REJECTED}, request.id)
      .then((response) => {
        console.log('RESPONSE', response);
        //Send notification and add it to DB
        sendNotification(
          'Demande refusée',
          "Votre demande d'emploi a été refusée.",
          [request.client.playerId],
        );
        createNotification({
          senderId: this.loggedUserId,
          receiverId: request.client.id,
          type: REJECTED_REQUEST,
          createdAt: new Date(),
        });
        this.props.dispatch({type: 'REMOVE_PENDING_REQUEST', value: response});
        this.setState({isLoading: false});
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

  renderEmptyLogo = () => {
    if (this.props.pendingRequests.length === 0 && !this.state.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <EmptyData
            image={require('../assets/noReqs.png')}
            text="Aucune demande en attente pour le moment"
          />
        </View>
      );
    }
  };

  render() {
    console.log('PROPS', this.props);
    return (
      <View style={styles.mainContainer}>
        {this.displayLoading()}
        {this.renderEmptyLogo()}
        {this.props.pendingRequests.length !== 0 && (
          <FlatList
            data={this.props.pendingRequests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderPendingRequestItem(item)}
          />
        )}
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

const mapStateToProps = (state) => {
  return {
    pendingRequests: state.editPendingRequests.pendingRequests,
    loggedUser: state.setLoggedUser.loggedUser,
  };
};

export default connect(mapStateToProps)(PendingRequests);
