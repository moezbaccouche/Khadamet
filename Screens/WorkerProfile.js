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
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import SkillRating from '../Components/SkillRating';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  MenuProvider,
} from 'react-native-popup-menu';
import {getProfessional} from '../API/users.service';
import {getSkillById} from '../API/skills.data';
import {ScrollView} from 'react-native-gesture-handler';
import ReviewItem from '../Components/ReviewItem';
import {conversationExists} from '../API/conversations.service';

let unique = 0;
export default class WorkerProfile extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      log: [],
      expert: {
        reviews: [],
      },
      nbReviews: 0,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.loggedUserId = '5f57a139c1a0390820168023'; //<--- get it from async storage
    this.getExpertDetails();
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.navigation.state.params.updateReviews) {
      this.getExpertDetails();
    }
  };

  getExpertDetails = () => {
    getProfessional(this.props.navigation.state.params.expertId)
      .then((data) => {
        this.setState({
          expert: data,
          nbReviews: data.reviews.length,
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

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={SECONDARY_COLOR} size="large" />
        </View>
      );
    }
  };

  renderSkills = (skill) => {
    const skillToRender = getSkillById(skill.id);
    const {title, icon, color, borderColor} = skillToRender;
    const {name, id, picture, playerId} = this.state.expert;
    return (
      <SkillRating
        skillName={title}
        skillImage={icon}
        workerRating={skill.rating}
        backgroundColor={color}
        color={color}
        borderColor={borderColor}
        loggedUserId={this.loggedUserId}
        professionalId={id}
        onRatingPress={() =>
          this.props.navigation.navigate('Review', {
            skillId: skill.id,
            expertId: id,
            skillName: title,
            skillImage: icon,
            name: name,
            backgroundColor: color,
          })
        }
        onSkillImagePress={() => {
          if (this.loggedUserId !== id) {
            this.props.navigation.navigate('NewRequest', {
              professionalId: id,
              professionalName: name,
              professionalPicture: picture,
              professionalPlayerId: playerId,
              rating: skill.rating,
              salary: skill.salary,
              skillId: skill.id,
              color,
            });
          }
        }}
      />
    );
  };

  getGeneralComment = (rating) => {
    switch (rating) {
      case 1:
        return 'Médiocre';
      case 2:
        return 'Moyen';
      case 3:
        return 'Bien';
      case 4:
        return 'Excellent';
      case 5:
        return 'Parfait';
    }
  };

  renderReviews = (review) => {
    const skill = getSkillById(review.skillId);

    return (
      <ReviewItem
        name={review.clientName}
        generalComment={this.getGeneralComment(review.rating)}
        rating={review.rating}
        comment={review.comment}
        picture={review.clientPicture}
        skillName={skill.title}
        color={skill.color}
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

  getConversationId = async () => {
    let convId = null;
    const conversation = await conversationExists(
      this.loggedUserId,
      this.state.expert.id,
    );
    console.log('EXSTS', conversation);
    if (conversation.exists) {
      convId = conversation.conversationId;
    }
    console.log('CONVID', convId);
    return convId;
  };

  renderMenuOptions = () => {
    const {id, phone} = this.state.expert;
    if (this.loggedUserId !== id) {
      return (
        <View>
          <MenuOption
            value="Normal"
            text="Appeler"
            onSelect={() => Linking.openURL(`tel:${phone}`)}
            customStyles={{optionText: styles.menuItemsText}}
          />
          <MenuOption
            value="Disabled"
            text="Envoyer un message"
            customStyles={{optionText: styles.menuItemsText}}
            onSelect={async () =>
              this.props.navigation.navigate('Conversation', {
                receiverUser: {
                  id,
                  picture: this.state.expert.picture,
                  name: this.state.expert.name,
                },
                conversationId: await this.getConversationId(),
              })
            }
          />
          <MenuOption
            value={{text: 'Hello world!'}}
            text="Envoyer un SMS"
            onSelect={() => Linking.openURL(`sms:${phone}`)}
            customStyles={{optionText: styles.menuItemsText}}
          />
        </View>
      );
    }
    return (
      <MenuOption
        value={{text: 'edit'}}
        text="Modifier profil"
        onSelect={() => this.props.navigation.navigate('LoggedUserProfile')}
        customStyles={{optionText: styles.menuItemsText}}
      />
    );
  };

  render() {
    return (
      <MenuProvider>
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
              {this.state.expert.name}
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
              <MenuOptions
                customStyles={{
                  optionsContainer: {borderRadius: 8},
                }}>
                {this.renderMenuOptions()}
              </MenuOptions>
            </Menu>
          </View>
          {this.displayLoading()}
          {!this.state.isLoading && (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View
                style={{height: 150, backgroundColor: PRIMARY_COLOR}}></View>
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
          )}
        </View>
      </MenuProvider>
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
  loadingContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: Dimensions.get('window').height / 2,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
