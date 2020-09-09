import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  ELECTRICITY_COLOR,
  COOKING_COLOR,
  CLEANING_COLOR,
  PLUMBING_COLOR,
  DIY_COLOR,
  BABYSITTING_COLOR,
  PAINTING_COLOR,
} from '../assets/colors';
import ProfessionalSkillItem from '../Components/ProfessionalSkillItem';
import Prompt from 'react-native-prompt';
import LargeSquareButton from '../Components/LargeSquareButton';
import {createProfessional} from '../API/professionals.services';
import {addProfessionalSkills} from '../API/professionalSkills.service';
import {defaultPicturePath} from '../assets/defaults';
import {uploadProfilePicture} from '../API/firebase.services';
import UserRole from '../API/user.roles';
import {createUser} from '../API/users.service';

export default class RegisterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrompt: false,
      isLoading: false,
      lastChosenSkillId: -1,
      skills: [
        {
          id: '5f512ddab138f130a069a465',
          title: 'Jardinage',
          icon: require('../assets/gard.png'),
          isSelected: false,
          salary: 0,
          color: PRIMARY_COLOR,
          borderColor: '#2ECC71',
        },
        {
          id: '5f512de7b138f130a069a466',
          title: 'Electricité',
          icon: require('../assets/electricity.png'),
          isSelected: false,
          salary: 0,
          color: ELECTRICITY_COLOR,
        },
        {
          id: '5f56433580ec3e0252ae14df',
          title: 'Cuisine',
          icon: require('../assets/hamburger.png'),
          isSelected: false,
          salary: 0,
          color: COOKING_COLOR,
        },
        {
          id: '5f56434580ec3e0252ae14e0',
          title: 'Nettoyage',
          icon: require('../assets/bucket.png'),
          isSelected: false,
          salary: 0,
          color: CLEANING_COLOR,
        },
        {
          id: '5f56434c80ec3e0252ae14e1',
          title: 'Plomberie',
          icon: require('../assets/water.png'),
          isSelected: false,
          salary: 0,
          color: PLUMBING_COLOR,
        },
        {
          id: '5f56438280ec3e0252ae14e2',
          title: 'Bricolage',
          icon: require('../assets/drill2.png'),
          isSelected: false,
          salary: 0,
          color: DIY_COLOR,
        },
        {
          id: '5f56438d80ec3e0252ae14e3',
          title: 'Baby-Sitting',
          icon: require('../assets/baby.png'),
          isSelected: false,
          salary: 0,
          color: BABYSITTING_COLOR,
        },
        {
          id: '5f56439580ec3e0252ae14e4',
          title: 'Peinture',
          icon: require('../assets/paint.png'),
          isSelected: false,
          salary: 0,
          color: PAINTING_COLOR,
        },
      ],
    };
  }

  editSkillSelection = (skill) => {
    const itemIndex = this.state.skills.findIndex(
      (item) => item.id === skill.id,
    );
    let newSkills = [...this.state.skills];
    if (skill.isSelected) {
      newSkills[itemIndex].isSelected = false;
      this.setState({
        showPrompt: false,
        skills: [...newSkills],
      });
    } else {
      this.setState({
        showPrompt: true,
        lastChosenSkillId: skill.id,
      });
    }
  };

  renderItem = (item) => {
    return (
      <ProfessionalSkillItem
        title={item.title}
        icon={item.icon}
        isSelected={item.isSelected}
        color={item.color}
        salary={item.salary}
        borderColor={item.borderColor}
        action={() => this.editSkillSelection(item)}
      />
    );
  };

  createNewProfessional = async () => {
    if (this.getSelectedSkills().length !== 0) {
      this.setState({isLoading: true});

      const {picturePath} = this.props.navigation.state.params;
      let selectedSkills = this.getSelectedSkills();
      try {
        pictureUrl = defaultPicturePath;
        if (picturePath !== defaultPicturePath) {
          //Upload picture only if it's different from the default one
          pictureUrl = await uploadProfilePicture(picturePath);
        }
        //Create the professional entity and get its generated ID
        const professional = await createUser({
          ...this.props.navigation.state.params,
          pictureUrl,
          userRole: UserRole.PROFESSIONAL,
        });
        addProfessionalSkills(selectedSkills, professional._id)
          .then((response) => {
            console.log(response);
            this.setState({isLoading: false});

            //Navigate to Login Screen
            this.props.navigation.navigate('Login');
          })
          .catch((e) => {
            this.setState({isLoading: false});
          });
      } catch (e) {
        this.setState({isLoading: false});
      }
    } else {
      alert('Veuillez sélectionner une compétence !');
    }
  };

  getSelectedSkills = () => {
    let selectedSkills = [];
    this.state.skills.map((skill) => {
      if (skill.isSelected) {
        selectedSkills.push(skill);
      }
    });
    return selectedSkills;
  };

  displaySignInButton = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator
            color={SECONDARY_COLOR}
            size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.viewButton}>
        <Text style={styles.textSignup}>Inscription</Text>
        <LargeSquareButton
          action={() => {
            this.createNewProfessional();
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/splash.png')}
        resizeMode="stretch"
        style={styles.mainContainer}>
        <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
        <View style={styles.headerToolbar}>
          <Ionicons
            name="ios-arrow-back-sharp"
            size={30}
            color={SECONDARY_COLOR}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              color: SECONDARY_COLOR,
              paddingHorizontal: 20,
              fontSize: 18,
              alignSelf: 'center',
            }}>
            Sélectionnez vos compétences
          </Text>
        </View>
        <Prompt
          title="Saisissez votre prix par heure (DT/H)"
          placeholder="Exp: 35"
          defaultValue=""
          cancelText="Annuler"
          submitText="Confirmer"
          buttonTextStyle={{color: PRIMARY_COLOR}}
          textInputProps={{keyboardType: 'numeric'}}
          visible={this.state.showPrompt}
          onCancel={() =>
            this.setState({
              showPrompt: false,
            })
          }
          onSubmit={(value) => {
            const skillIndex = this.state.skills.findIndex(
              (item) => item.id === this.state.lastChosenSkillId,
            );
            let updatedSkills = [...this.state.skills];
            updatedSkills[skillIndex].salary = value;
            updatedSkills[skillIndex].isSelected = true;
            this.setState({
              skills: [...updatedSkills],
              showPrompt: false,
            });
          }}
        />
        <ScrollView>
          <FlatList
            style={{marginHorizontal: 20}}
            data={this.state.skills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => this.renderItem(item)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />

          {this.displaySignInButton()}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerToolbar: {
    flexDirection: 'row',
    height: 56,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  skillsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
    justifyContent: 'center',
  },
  textSignup: {
    fontSize: 22,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    paddingRight: 50,
  },
});
