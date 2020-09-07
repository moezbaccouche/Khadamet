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

export default class RegisterSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrompt: false,
      lastChosenSkillId: -1,
      skills: [
        {
          id: 0,
          title: 'Jardinage',
          icon: require('../assets/gard.png'),
          isSelected: false,
          skillPrice: 0,
          color: PRIMARY_COLOR,
          borderColor: '#2ECC71',
        },
        {
          id: 1,
          title: 'Electricité',
          icon: require('../assets/electricity.png'),
          isSelected: false,
          skillPrice: 0,
          color: ELECTRICITY_COLOR,
        },
        {
          id: 2,
          title: 'Cuisine',
          icon: require('../assets/hamburger.png'),
          isSelected: false,
          skillPrice: 0,
          color: COOKING_COLOR,
        },
        {
          id: 3,
          title: 'Nettoyage',
          icon: require('../assets/bucket.png'),
          isSelected: false,
          skillPrice: 0,
          color: CLEANING_COLOR,
        },
        {
          id: 4,
          title: 'Plomberie',
          icon: require('../assets/water.png'),
          isSelected: false,
          skillPrice: 0,
          color: PLUMBING_COLOR,
        },
        {
          id: 5,
          title: 'Bricolage',
          icon: require('../assets/drill2.png'),
          isSelected: false,
          skillPrice: 0,
          color: DIY_COLOR,
        },
        {
          id: 6,
          title: 'Baby-Sitting',
          icon: require('../assets/baby.png'),
          isSelected: false,
          skillPrice: 0,
          color: BABYSITTING_COLOR,
        },
        {
          id: 7,
          title: 'Peinture',
          icon: require('../assets/paint.png'),
          isSelected: false,
          skillPrice: 0,
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
        skillPrice={item.skillPrice}
        borderColor={item.borderColor}
        action={() => this.editSkillSelection(item)}
      />
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
            updatedSkills[skillIndex].skillPrice = value;
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
          <View style={styles.viewButton}>
            <Text style={styles.textSignup}>Inscription</Text>

            <LargeSquareButton />
          </View>
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
