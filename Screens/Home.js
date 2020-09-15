import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedbackComponent,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import HomeSearchInput from '../Components/HomeSearchInput';
import Carousel from 'react-native-snap-carousel';
import CategoryItem from '../Components/CategoryItem';
import {getBestProfessionals} from '../API/users.service';
import BestProfessionalItem from '../Components/BestProfessionaltem';
import CategoryExpertItem from '../Components/CategoryExpertItem';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestProfessionals: [],
      activeCategoryColor: '',
      isLoading: true,
      activeIndex: 3,
      carouselItems: [
        {
          id: 0,
          skillId: '5f56433580ec3e0252ae14df',
          categoryTitle: 'Cuisine',
          categoryColor: '#ffa030',
          categoryIcon: require('../assets/hamburger.png'),
        },
        {
          id: 1,
          skillId: '5f512de7b138f130a069a466',
          categoryTitle: 'Electricité',
          categoryColor: '#74ACD1',
          categoryIcon: require('../assets/electricity.png'),
        },
        {
          id: 2,
          skillId: '5f56434c80ec3e0252ae14e1',
          categoryTitle: 'Plomberie',
          categoryColor: '#67C1B0',
          categoryIcon: require('../assets/water.png'),
        },
        {
          id: 3,
          skillId: '5f512ddab138f130a069a465',
          categoryTitle: 'Jardinage',
          categoryColor: PRIMARY_COLOR,
          categoryIcon: require('../assets/gard.png'),
        },
        {
          id: 4,
          skillId: '5f56438280ec3e0252ae14e2',
          categoryTitle: 'Bricolage',
          categoryColor: '#9483ba',
          categoryIcon: require('../assets/drill2.png'),
        },
        {
          id: 5,
          skillId: '5f56438d80ec3e0252ae14e3',
          categoryTitle: 'Baby-sitting',
          categoryColor: '#FF69B4',
          categoryIcon: require('../assets/baby.png'),
        },
        {
          id: 6,
          skillId: '5f56439580ec3e0252ae14e4',
          categoryTitle: 'Peinture',
          categoryColor: '#e0c23a',
          categoryIcon: require('../assets/paint.png'),
        },
        {
          id: 7,
          skillId: '5f56434580ec3e0252ae14e0',
          categoryTitle: 'Nettoyage',
          categoryColor: '#FAE800',
          categoryIcon: require('../assets/bucket.png'),
        },
      ],
    };
  }

  componentDidMount = () => {
    this.renderBestEmployeesForSkill();
  };

  renderItem = ({item, index}) => {
    return (
      <CategoryItem
        categoryTitle={item.categoryTitle}
        categoryColor={item.categoryColor}
        categoryIcon={item.categoryIcon}
        onPress={() =>
          this.props.navigation.navigate('CategoryExperts', {
            skillId: item.skillId,
            skillName: item.categoryTitle,
            color: this.state.activeCategoryColor,
          })
        }
      />
    );
  };

  renderBestEmployeesForSkill = () => {
    this.setState({isLoading: true});
    const index = this.state.activeIndex;
    const skill = this.state.carouselItems.find((item) => item.id === index);
    this.setState({activeCategoryColor: skill.categoryColor});
    getBestProfessionals(skill.skillId)
      .then((bestProfessionalsForSkill) => {
        this.setState({
          bestProfessionals: bestProfessionalsForSkill,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        console.error(err);
      });
  };

  renderBestProfessionalItem = (professional) => {
    const skill = this.state.carouselItems.find(
      (item) => item.id === this.state.activeIndex,
    );
    return (
      <CategoryExpertItem
        name={professional.name}
        rating={professional.rating}
        salary={professional.salary}
        picture={professional.picture}
        color={this.state.activeCategoryColor}
        onPress={() =>
          this.props.navigation.navigate('WorkerProfile', {
            expertId: professional.id,
          })
        }
        onContainerPress={() =>
          this.props.navigation.navigate('NewRequest', {
            professional,
            skillId: skill.skillId,
            color: this.state.activeCategoryColor,
          })
        }
      />
    );
  };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={this.state.activeCategoryColor}
          />
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={PRIMARY_COLOR}
        />

        <View style={styles.headerContainer}>
          <View style={styles.headerToolbarView}>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Ionicons
                name="ios-menu-sharp"
                color="white"
                size={25}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </View>
            <View style={{flex: 0.6, alignItems: 'center'}}>
              <Text style={styles.headerTitle}>Accueil</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Ionicons
                name="ios-notifications-sharp"
                color="white"
                size={25}
                onPress={() => this.props.navigation.navigate('Notifications')}
              />
            </View>
          </View>
          <Image
            source={require('../assets/plumber.png')}
            style={styles.headerImage}
          />
          <View style={styles.headerContent}>
            <View style={styles.headerContentDescription}>
              <Text style={styles.headerContentText}>Quel service</Text>
              <Text style={styles.headerContentText}>cherchez-vous ?</Text>
              <Text style={[styles.headerContentText, {marginTop: 10}]}>
                Nous vous proposons les meilleurs experts du métier !
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.viewSearchInput}>
          <Ionicons
            name="ios-search-sharp"
            size={20}
            color={PRIMARY_COLOR}
            style={{marginHorizontal: 10}}
          />
          <Text
            style={styles.textInput}
            onPress={() => this.props.navigation.navigate('Search')}>
            Cherchez un expert, ...
          </Text>
        </View>
        <View style={styles.viewBodyContainer}>
          <View style={styles.viewCategories}>
            <Text style={styles.sectionTitleText}>Catégories</Text>
            <Carousel
              layout={'default'}
              ref={(ref) => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={115}
              renderItem={this.renderItem}
              onSnapToItem={(index) => {
                this.setState({activeIndex: index}, () => {
                  this.renderBestEmployeesForSkill();
                });
              }}
              firstItem={3}
            />
          </View>
          <View style={styles.viewBestEmployees}>
            <Text style={styles.sectionTitleText}>Meilleurs employés</Text>
            {this.displayLoading()}
            {!this.state.isLoading && (
              <FlatList
                data={this.state.bestProfessionals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => this.renderBestProfessionalItem(item)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerToolbarView: {
    height: 56,
    flexDirection: 'row',
    marginTop: 40,
  },
  headerContainer: {
    backgroundColor: PRIMARY_COLOR,
    height: 300,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
  headerContentText: {
    color: SECONDARY_COLOR,
    fontSize: 20,
  },
  headerContent: {
    marginHorizontal: 20,
  },
  headerContentDescription: {
    marginTop: 40,
  },
  headerImage: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: 70,
    left: 150,
  },
  viewSearchInput: {
    position: 'absolute',
    top: 275,
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 5,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center',
    marginHorizontal: 40,
    alignSelf: 'stretch',
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: 'grey',
  },
  viewBodyContainer: {
    backgroundColor: SECONDARY_COLOR,
  },
  sectionTitleText: {
    fontSize: 24,
    color: '#333333',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  viewCategories: {
    marginTop: 50,
    marginBottom: 10,
  },
  viewBestEmployees: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
});
