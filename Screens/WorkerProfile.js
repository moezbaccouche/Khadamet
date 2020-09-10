import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import SkillRating from '../Components/SkillRating';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import {getProfessional} from '../API/users.service';
import {getSkillById} from '../API/skills.data';
import {ScrollView} from 'react-native-gesture-handler';
import ReviewItem from '../Components/ReviewItem';

let unique = 0;
export default class WorkerProfile extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      log: [],
      expert: {
        skills: [],
        reviews: [],
      },
      nbReviews: 0,
    };
  }

  componentDidMount = () => {
    this.getExpertDetails('5f579c0fc1a039082016801e');
  };

  getExpertDetails = (expertId) => {
    getProfessional(expertId).then((data) => {
      console.log('DETAILS: ', data);
      this.setState({
        expert: data,
        nbReviews: data.reviews.length,
      });
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

  renderSkills = (skill) => {
    const skillToRender = getSkillById(skill.id);
    const {title, icon, color, borderColor} = skillToRender;
    return (
      <SkillRating
        skillName={title}
        skillImage={icon}
        workerRating={skill.rating}
        backgroundColor={color}
        color={color}
        borderColor={borderColor}
      />
    );
  };

  renderReviews = (review) => {
    return (
      <ReviewItem
        name={review.clientName}
        generalComment={'Excellent'}
        generalRating={review.generalRating}
        comment={review.comment}
        picture={review.clientPicture}
      />
    );
  };

  selectNumber(value) {
    this.addLog(`selecting number: ${value}`);
  }

  selectOptionType(value) {
    const v = typeof value === 'object' ? JSON.stringify(value) : value;
    this.addLog(`selecting type: ${v}`);
    return value !== 'Do not close';
  }

  addLog(value) {
    this.setState({
      log: [
        ...this.state.log,
        {
          value,
          id: ++unique,
        },
      ],
    });
  }

  render() {
    return (
      <MenuContext>
        <View style={styles.mainContainer}>
          <StatusBar
            translucent={true}
            backgroundColor={PRIMARY_COLOR}
            barStyle="light-content"
          />
          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={SECONDARY_COLOR}
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={{color: SECONDARY_COLOR, fontSize: 18}}>
              Moez Baccouche
            </Text>
            <Menu
              name="types"
              onSelect={(value) => this.selectOptionType(value)}
              onBackdropPress={() =>
                this.addLog('menu will be closed by backdrop')
              }
              onOpen={() => this.addLog('menu is opening')}
              onClose={() => this.addLog('menu is closing')}>
              <MenuTrigger style={styles.trigger}>
                <Ionicons
                  name="ios-ellipsis-vertical"
                  color={SECONDARY_COLOR}
                  size={30}
                />
              </MenuTrigger>
              <MenuOptions customStyles={{optionsContainer: {borderRadius: 8}}}>
                <MenuOption
                  value="Normal"
                  text="Appeler"
                  customStyles={{optionText: styles.menuItemsText}}
                />
                <MenuOption
                  value="Disabled"
                  text="Envoyer un message"
                  customStyles={{optionText: styles.menuItemsText}}
                />
                <MenuOption
                  value={{text: 'Hello world!'}}
                  text="Envoyer un SMS"
                  onSelect={() => console.log('Envoyer un sms')}
                  customStyles={{optionText: styles.menuItemsText}}
                />
              </MenuOptions>
            </Menu>
          </View>
          <ScrollView>
            <View style={{height: 150, backgroundColor: PRIMARY_COLOR}}></View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
                paddingHorizontal: 20,
              }}>
              <View style={styles.workerDescriptionView}>
                <Text style={styles.workerFullNameText}>
                  {this.state.expert.name}
                </Text>
                <Text style={styles.workerAgeText}>
                  {this.state.expert.age} ans
                </Text>
                <Text style={styles.workerAddressText}>
                  {this.state.expert.address}
                </Text>
              </View>
              <FlatList
                style={styles.skillsView}
                data={this.state.expert.skills}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => this.renderSkills(item)}
              />
              <TouchableOpacity>
                <Text style={{fontSize: 18}}>
                  Avis ({this.state.nbReviews})
                </Text>
              </TouchableOpacity>
              <FlatList
                style={{}}
                data={this.state.expert.reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => this.renderReviews(item)}
              />
            </View>
            <Image
              source={{uri: this.state.expert.picture}}
              style={styles.workerImage}
            />
          </ScrollView>
        </View>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  headerContainer: {
    flex: 0.25,
    backgroundColor: PRIMARY_COLOR,
  },
  headerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
    height: 56,
  },
  workerImage: {
    height: 152,
    width: 152,
    borderRadius: 13,
    position: 'absolute',
    top: 70,
    left: Dimensions.get('window').width / 2 - 152 / 2,
  },
  workerFullNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workerDescriptionView: {
    marginTop: 80,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  workerAgeText: {
    fontSize: 20,
  },
  workerAddressText: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  skillsView: {
    marginTop: 10,
  },
  menuItemsText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
