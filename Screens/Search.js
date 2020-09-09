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
import {getProfessionalsBySkill} from '../API/users.service';
import {TextInput} from 'react-native-gesture-handler';

export default class CategoryExperts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experts: [],
      searchedExperts: [],
      isLoading: true,
      searchString: '',
    };
  }

  searchExpert = (text) => {
    const searchString = text.toLowerCase().trim();
    console.log(searchString);
    this.setState({
      searchString: searchString,
    });
    if (this.state.searchString.length === 0) {
      this.setState({searchedExperts: [...this.state.experts]});
    } else {
      this.setState({
        searchedExperts: [
          ...this.state.experts.filter((item) =>
            item.name.toLowerCase().includes(searchString),
          ),
        ],
      });
    }
  };

  componentDidMount = () => {
    this.loadCategoryProfessionals(this.props.navigation.state.params.skillId);
  };

  loadCategoryProfessionals = (skillId) => {
    getProfessionalsBySkill(skillId)
      .then((data) => {
        if (data) {
          this.setState({
            isLoading: false,
            experts: data,
            searchedExperts: data,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  renderItemProfessional = (item) => {
    return (
      <SearchedExpertItem
        name={item.name}
        rating={item.generalRating}
        salary={item.salary}
        picture={item.picture}
      />
    );
  };

  renderFlatListHeader = () => {
    //We made this component to remove the warning "Virtualized list should never be nested inside ScrollView"
    return;
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
          <Ionicons
            name="ios-arrow-back-sharp"
            size={30}
            color={PRIMARY_COLOR}
            onPress={() => this.props.navigation.goBack()}
          />

          <Text style={styles.headerTitle}>
            Experts en {this.props.navigation.state.params.skillName}
          </Text>
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
          keyExtractor={(item) => item.id.toString()}
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
    paddingLeft: 20,
    color: PRIMARY_COLOR,
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
