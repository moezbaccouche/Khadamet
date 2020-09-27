import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getClientRequests, updateRequest} from '../API/requests.services';
import MyRequestOverviewItem from '../Components/MyRequestOverviewItem';
import RequestStatus from '../API/request.status';
import {getSkillById} from '../API/skills.data';
import {connect} from 'react-redux';

class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loggedUserId = this.props.loggedUser.id;
    this.loadClientRequests();
  }

  loadClientRequests = () => {
    getClientRequests(this.loggedUserId)
      .then((data) => {
        data.map((req) => {
          this.props.dispatch({type: 'SET_MY_REQUEST', value: req});
        });
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  onCancel = (requestId) => {
    updateRequest({status: RequestStatus.CANCELED}, requestId)
      .then((response) => {
        this.props.dispatch({type: 'SET_MY_REQUEST', value: response});
      })
      .catch((err) => console.error(err));
  };

  onFinish = (requestId) => {
    updateRequest({status: RequestStatus.TREATED}, requestId)
      .then((response) => {
        this.props.dispatch({type: 'SET_MY_REQUEST', value: response});
      })
      .catch((err) => console.error(err));
  };

  renderRequestItem = (item) => {
    const skill = getSkillById(item.skillId);
    return (
      <MyRequestOverviewItem
        skillId={item.skillId}
        requestDate={item.date}
        professionalPicture={item.professional.picture}
        professionalName={item.professional.name}
        address={item.address}
        status={item.status}
        onCancel={() => this.onCancel(item.id)}
        onFinish={() => this.onFinish(item.id)}
        onEdit={() =>
          this.props.navigation.navigate('EditRequest', {
            request: item,
            color: skill.color,
          })
        }
        onContainerPress={() =>
          this.props.navigation.navigate('RequestDetails', {
            request: item,
            isClientView: true,
          })
        }
        onDetails={() =>
          this.props.navigation.navigate('RequestDetails', {
            request: item,
            isClientView: true,
          })
        }
        onImagePress={() =>
          this.props.navigation.navigate('WorkerProfile', {
            expertId: item.professional.id,
          })
        }
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
    console.log('PROPS', this.props.myRequests);
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={SECONDARY_COLOR} />
        <View style={styles.headerToolbar}>
          <View style={{flex: 0.2}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-sharp"
                size={30}
                color={PRIMARY_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.6, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>Mes demandes</Text>
          </View>
        </View>
        {this.displayLoading()}
        {!this.state.isLoading && (
          <FlatList
            style={styles.requestsContainer}
            data={this.props.myRequests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderRequestItem(item)}
          />
        )}
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
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerTitle: {
    color: PRIMARY_COLOR,
    fontSize: 18,
  },
  requestsContainer: {
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    myRequests: state.editMyRequests.myRequests,
    loggedUser: state.setLoggedUser.loggedUser,
  };
};

export default connect(mapStateToProps)(MyRequests);
