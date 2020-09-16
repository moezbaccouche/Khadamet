import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import RequestOverviewItem from './PendingRequestOverviewItem';
import PendingRequestOverviewSecondEx from './PendingRequestOverview';
import PendingRequestOverview from './PendingRequestOverview';
import {getPendingRequestsForProfessional} from '../API/requests.services';

export default class PendingRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: [],
    };
  }

  componentDidMount = () => {
    this.loadPendingRequests();
  };

  loadPendingRequests = () => {
    const professionalId = '5f579c0fc1a039082016801e'; //<--- get it from async storage
    getPendingRequestsForProfessional(professionalId).then((data) => {
      this.setState({
        pendingRequests: data,
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
      />
    );
  };

  render() {
    return (
      <FlatList
        style={styles.mainContainer}
        data={this.state.pendingRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => this.renderPendingRequestItem(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
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
});
