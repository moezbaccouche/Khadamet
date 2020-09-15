import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import SearchInput from '../Components/SearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchedExpertItem from '../Components/SearchedExpertItem';
import {
  getProfessionalsBySkill,
  searchProfessional,
} from '../API/users.service';
import {TextInput} from 'react-native-gesture-handler';

export default class CategoryExperts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedExperts: [],
      isLoading: false,
      searchString: '',
    };
  }

  searchExpert = (text) => {
    const searchString = text.toLowerCase().trim();
    console.log(searchString);

    this.setState({isLoading: true});
    // const loggedUserId = await AsyncStorage.getItem('loggedUserId'); <---- Use it later

    const loggedUserId = '5f579db4c1a0390820168022'; // <----- remove this line later when using asyncStorage
    this.setState({searchString: searchString});

    if (searchString.length === 0) {
      this.setState({
        searchedExperts: [],
        isLoading: false,
      });
    } else {
      searchProfessional(text, loggedUserId)
        .then((foundExperts) => {
          console.log(foundExperts);
          this.setState({
            searchedExperts: foundExperts,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  renderItemProfessional = (item) => {
    console.log('LOG', item);
    return (
      <SearchedExpertItem
        name={item.name}
        rating={item.rating}
        salary={item.salary}
        picture={item.picture}
        phone={item.phone}
        email={item.email}
        onImagePress={() =>
          this.props.navigation.navigate('WorkerProfile', {expertId: item._id})
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
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
        <View style={styles.headerToolbar}>
          <View style={{flex: 0.2}}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={30}
              color={PRIMARY_COLOR}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <Text style={[styles.headerTitle]}>Recherche</Text>
          </View>
        </View>
        {this.displayLoading()}
        <View style={styles.bodyContainer}>
          <SearchInput onChangeText={(text) => this.searchExpert(text)} />
          <View style={styles.expertsFoundNumberView}>
            <Text style={{fontSize: 16}}>Experts trouvés: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {this.state.searchedExperts.length}
            </Text>
          </View>
        </View>
        <FlatList
          style={styles.bodyContainer}
          data={this.state.searchedExperts}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) => this.renderItemProfessional(item)}
        />
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
    marginTop: 20,
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    alignSelf: 'center',
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  expertsContainer: {
    marginTop: 20,
  },
  expertsFoundNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
