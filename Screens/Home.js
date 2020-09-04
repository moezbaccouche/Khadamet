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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import HomeSearchInput from '../Components/HomeSearchInput';
import Carousel from 'react-native-snap-carousel';
import CategoryItem from '../Components/CategoryItem';
import BestEmployeeItem from '../Components/BestEmployeeItem';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          id: 0,
          categoryTitle: 'Cuisine',
          categoryColor: '#ffa030',
          categoryIcon: require('../assets/hamburger.png'),
        },
        {
          id: 1,
          categoryTitle: 'Electricité',
          categoryColor: '#74ACD1',
          categoryIcon: require('../assets/electricity.png'),
        },
        {
          id: 2,
          categoryTitle: 'Plomberie',
          categoryColor: '#67C1B0',
          categoryIcon: require('../assets/water.png'),
        },
        {
          id: 3,
          categoryTitle: 'Jardinage',
          categoryColor: PRIMARY_COLOR,
          categoryIcon: require('../assets/gard.png'),
        },
        {
          id: 4,
          categoryTitle: 'Bricolage',
          categoryColor: '#9483ba',
          categoryIcon: require('../assets/drill2.png'),
        },
        {
          id: 5,
          categoryTitle: 'Baby-sitting',
          categoryColor: '#FF69B4',
          categoryIcon: require('../assets/baby.png'),
        },
        {
          id: 6,
          categoryTitle: 'Peinture',
          categoryColor: '#e0c23a',
          categoryIcon: require('../assets/paint.png'),
        },
        {
          id: 7,
          categoryTitle: 'Nettoyage',
          categoryColor: '#FAE800',
          categoryIcon: require('../assets/bucket.png'),
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <CategoryItem
        categoryTitle={item.categoryTitle}
        categoryColor={item.categoryColor}
        categoryIcon={item.categoryIcon}
      />
    );
  }

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
          <TextInput
            style={styles.textInput}
            placeholder="Cherchez un service, un expert, ..."
          />
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
              renderItem={this._renderItem}
              onSnapToItem={(index) => this.setState({activeIndex: index})}
              firstItem={3}
            />
          </View>
          <View style={styles.viewBestEmployees}>
            <Text style={styles.sectionTitleText}>Meilleurs employés</Text>
            <BestEmployeeItem
              picture={require('../assets/profilePicMale.jpg')}
              fullName="Moez Baccouche"
              age={23}
            />
            <BestEmployeeItem
              picture={require('../assets/profilePic.jpg')}
              fullName="Alice Leblanc"
              age={25}
            />
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
  },
  textInput: {
    flex: 1,
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
});
