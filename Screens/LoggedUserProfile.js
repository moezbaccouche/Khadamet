import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUser, updateUser} from '../API/users.service';
import LoggedUserProfileImage from '../Components/LoggedUserProfileImage';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserRole from '../API/user.roles';
import {
  getSkillsForProfessional,
  updateSkills,
} from '../API/professionalSkills.service';
import {uploadProfilePicture} from '../API/firebase.services';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class LoggedUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true,
      picturePath: '',
      skills: [],
      userAux: {},
      show: false,
    };
  }

  componentDidMount = () => {
    this.loadUser();
  };

  loadSkills = () => {
    getSkillsForProfessional(this.state.user.id)
      .then((data) => {
        console.log('SKILLS', data);
        this.setState({skills: data, isLoading: false});
      })
      .catch((err) => {
        console.error(err);
        this.setState({isLoading: false});
      });
  };

  loadUser = () => {
    const loggedUserId = '5f579c0fc1a039082016801e'; //<--- get from async storage
    getUser(loggedUserId)
      .then((data) => {
        console.log('DATA', data);
        this.setState({
          user: data,
          userAux: data,
        });
        if (data.role === UserRole.PROFESSIONAL) {
          this.loadSkills();
        } else {
          this.setState({
            isLoading: false,
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

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={PRIMARY_COLOR} size="large" />
        </View>
      );
    }
  };

  editPicture = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Choisissez une méthode',
        takePhotoButtonTitle: 'Prendre une photo',
        chooseFromLibraryButtonTitle: 'Parcourir la galerie',
        cancelButtonTitle: 'Annuler',
      },
      (response) => {
        if (response.didCancel) {
          console.log("L'utilisateur a annulé la prise de photo !");
        } else if (response.error) {
          console.log('Erreur : ' + response.error);
        } else {
          console.log('Photo : ' + response.uri);
          this.setState({
            user: {
              ...this.state.user,
              picture: response.uri,
            },
          });
        }
      },
    );
  };

  newSkills = () => {
    const oldSkills = this.state.skills;
    const {newSkills} = this.props.navigation.state.params || [];
    if (newSkills && JSON.stringify(oldSkills) !== JSON.stringify(newSkills)) {
      return true;
    }
    return false;
  };

  updateProfile = async () => {
    const {user} = this.state;
    if (user.role === UserRole.PROFESSIONAL && this.newSkills()) {
      // updateSkills
      const {newSkills} = this.props.navigation.state.params;
      console.log('NEW SKILLS', newSkills);
      updateSkills(newSkills, user.id)
        .then((response) => {
          this.setState({skills: response});
          console.log('UPDATE SKILLS', response);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    //updateProfile
    const {picture} = this.state.user;
    let pictureUrl = picture;
    if (picture !== this.state.userAux.picture) {
      //Upload new picture
      pictureUrl = await uploadProfilePicture(this.state.user.picture);
    }
    const updatedUser = {...this.state.user, picture: pictureUrl};
    updateUser(updatedUser)
      .then((response) => {
        console.log('UPDATED USER', response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  showDatepicker = () => {
    this.setState({
      show: true,
    });
  };

  onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || this.state.user.dob;
    this.setState({
      user: {
        ...this.state.user,
        dob: currentDate,
      },
      show: false,
    });
  };

  render() {
    const {name, phone, address, dob, picture, role} = this.state.user;
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          backgroundColor={SECONDARY_COLOR}
          barStyle="dark-content"
        />
        <View style={styles.headerToolbar}>
          <Ionicons
            name="ios-arrow-back-sharp"
            size={30}
            color={PRIMARY_COLOR}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 18}}
            onPress={() => this.updateProfile()}>
            Mettre à jour
          </Text>
        </View>
        {this.displayLoading()}
        {!this.state.isLoading && (
          <ScrollView style={styles.scrollView}>
            <View style={{flex: 1}}>
              <LoggedUserProfileImage
                picturePath={picture}
                onPress={() => this.editPicture()}
              />
              <View style={styles.bodyContainer}>
                <View style={styles.userDescriptionView}>
                  <Text style={styles.labelText}>Nom complet</Text>
                  <TextInput
                    value={name}
                    style={styles.textInput}
                    onChangeText={(text) =>
                      this.setState({
                        user: {
                          ...this.state.user,
                          name: text,
                        },
                      })
                    }
                  />
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(this.state.user.dob)}
                    mode="date"
                    display="default"
                    onChange={this.onChange}
                  />
                )}
                <View style={styles.userDescriptionView}>
                  <Text style={styles.labelText}>Date de naissance</Text>
                  <TouchableOpacity
                    style={[styles.textInput, {paddingVertical: 15}]}>
                    <Text
                      style={{flex: 1}}
                      onPress={() => this.showDatepicker()}>
                      {moment(this.state.user.dob).format('DD/MM/yyyy')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.userDescriptionView}>
                  <Text style={styles.labelText}>Téléphone</Text>
                  <TextInput
                    value={phone}
                    keyboardType="numeric"
                    style={styles.textInput}
                    onChangeText={(text) =>
                      this.setState({
                        user: {
                          ...this.state.user,
                          phone: text,
                        },
                      })
                    }
                  />
                </View>
                <View style={styles.userDescriptionView}>
                  <Text style={styles.labelText}>Adresse</Text>
                  <TextInput
                    value={address}
                    style={styles.textInput}
                    onChangeText={(text) =>
                      this.setState({
                        user: {
                          ...this.state.user,
                          address: text,
                        },
                      })
                    }
                  />
                </View>
                {this.state.skills.length !== 0 && (
                  <View style={styles.userDescriptionView}>
                    <Text style={styles.labelText}>Compétences</Text>
                    <TouchableOpacity
                      style={[styles.textInput, {paddingVertical: 15}]}>
                      <Text
                        style={{flex: 1}}
                        onPress={() =>
                          this.props.navigation.navigate('EditSkills', {
                            selectedSkills: this.state.skills,
                          })
                        }>
                        Modifier vos compétences
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerToolbar: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 20,
  },
  imageContainer: {
    height: 100,
  },
  editImageIconContainer: {
    height: 30,
    width: 30,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 90,
    left: Dimensions.get('window').width / 2 + 25,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 80,
    alignSelf: 'center',
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    alignSelf: 'center',
  },
});
