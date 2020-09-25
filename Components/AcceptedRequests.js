import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getAcceptedRequestsForProfessional} from '../API/requests.services';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import AcceptedRequestOverviewItem from './AcceptedRequestOverviewItem';
import EmptyData from './EmptyData';

class AcceptedRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    console.log('ACCEPTED DID MOUNT');
    this.loadAcceptedRequests();
  };

  loadAcceptedRequests = () => {
    const professionalId = '5f579c0fc1a039082016801e'; //<--- get it from async storage
    getAcceptedRequestsForProfessional(professionalId).then((data) => {
      data.map((req) => {
        this.props.dispatch({type: 'SET_ACCEPTED_REQUEST', value: req});
      });
      this.setState({
        isLoading: false,
      });
    });
  };

  renderAcceptedRequestItem = (item) => {
    return (
      <AcceptedRequestOverviewItem
        skillId={item.skillId}
        requestDate={item.date}
        clientPicture={item.client.picture}
        clientName={item.client.name}
        address={item.address}
        onDetailsPress={() => {
          this.props.navigation.navigate('RequestDetails', {request: item});
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

  renderEmptyLogo = () => {
    if (this.props.acceptedRequests.length === 0 && !this.state.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <EmptyData
            image={require('../assets/noReqs.png')}
            text="Aucune demande acceptée pour le moment"
          />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.displayLoading()}
        {this.renderEmptyLogo()}
        {this.props.acceptedRequests.length !== 0 && (
          <FlatList
            data={this.props.acceptedRequests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderAcceptedRequestItem(item)}
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
    acceptedRequests: state.editAcceptedRequests.acceptedRequests,
  };
};

export default connect(mapStateToProps)(AcceptedRequests);
