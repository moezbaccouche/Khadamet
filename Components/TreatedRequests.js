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
import {getSkillById} from '../API/skills.data';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import {TreatedRequestOverviewItem} from './TreatedRequestOverviewItem';
import moment from 'moment';
import {getTreatedRequestsForProfessional} from '../API/requests.services';
import {connect} from 'react-redux';
import EmptyData from './EmptyData';

class TreatedRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    console.log('TREATED DID MOUNT');
    this.loadTreatedRequests();
  };

  loadTreatedRequests = () => {
    const professionalId = '5f579c0fc1a039082016801e'; //<--- get it from async storage
    getTreatedRequestsForProfessional(professionalId).then((data) => {
      data.map((req) => {
        this.props.dispatch({type: 'SET_TREATED_REQUEST', value: req});
      });
      this.setState({
        isLoading: false,
      });
    });
  };

  renderFrenchMonthName = (date) => {
    //Returns capitalized name of the month in french
    require('moment/locale/fr');
    moment.locale('fr');
    return (
      moment(date).format('MMM').charAt(0).toUpperCase() +
      moment(date).format('MMM').slice(1)
    );
  };

  renderTreatedRequestItem = (item) => {
    const skill = getSkillById(item.skillId);
    return (
      <TreatedRequestOverviewItem
        backgroundColor={skill.color}
        categoryImage={skill.icon}
        month={this.renderFrenchMonthName(item.date)}
        day={moment(item.date).format('DD')}
        categoryName={skill.title}
        onPress={() => {
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
    if (this.props.treatedRequests.length === 0 && !this.state.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <EmptyData
            image={require('../assets/noReqs.png')}
            text="Aucune demande traitée pour le moment"
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
        {this.props.treatedRequests.length !== 0 && (
          <FlatList
            data={this.props.treatedRequests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderTreatedRequestItem(item)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    treatedRequests: state.editTreatedRequests.treatedRequests,
  };
};

export default connect(mapStateToProps)(TreatedRequests);
