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
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUser, updateUser} from '../API/users.service';
import LoggedUserProfileImage from '../Components/LoggedUserProfileImage';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import UserRole from '../API/user.roles';
import {
  getSkillsForProfessional,
  updateSkills,
} from '../API/professionalSkills.service';
import {uploadProfilePicture} from '../API/firebase.services';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';

class LoggedUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: true,
      picturePath: '',
      skills: [],
      userAux: {},
      show: false,
      isUpdating: false,
    };
  }

  componentDidMount() {
    this.loggedUserId = this.props.loggedUser.id;
    this.loadUser();
  }

  loadSkills = () => {
    getSkillsForProfessional(this.state.user.id)
      .then((data) => {
        this.setState({skills: data, isLoading: false});
      })
      .catch((err) => {
        console.error(err);
        this.setState({isLoading: false});
      });
  };

  loadUser = () => {
    getUser(this.loggedUserId)
      .then((data) => {
        data.dob = new Date(data.dob);
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
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.5,
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

  displayToast = (msg) => {
    Toast.show(msg, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: PRIMARY_COLOR,
      shadow: true,
      containerStyle: {borderRadius: 8},
    });
  };

  newSkills = () => {
    //This function is used to test if the user updated his skills
    //If it returns true then the update button will be enabled else it will be disabled

    const oldSkills = this.state.skills;
    let newSkills = [];
    const params = this.props.navigation.state.params;
    if (params) {
      newSkills = [...params.newSkills];
    }

    let oldSkillsAux = [];
    oldSkills.map((oldSkill) => {
      oldSkillsAux.push({id: oldSkill.skillId, salary: oldSkill.salary});
    });

    let newSkillsAux = [];
    newSkills.map((newSkill) => {
      newSkillsAux.push({id: newSkill.id, salary: newSkill.salary});
    });

    if (
      newSkills.length !== 0 &&
      !_.isEqual(_.sortBy(oldSkillsAux), _.sortBy(newSkillsAux))
    ) {
      return true;
    }
    return false;
  };

  updateProfile = async () => {
    console.log('VALID', this.isValidForm());
    if (this.isValidForm()) {
      const {user, userAux} = this.state;
      if (user.role === UserRole.PROFESSIONAL && this.newSkills()) {
        // updateSkills
        this.setState({isUpdating: true});
        const {newSkills} = this.props.navigation.state.params;
        updateSkills(newSkills, user.id)
          .then((response) => {
            this.setState({skills: response, isUpdating: false});
            console.log('UPDATE SKILLS', response);
            this.displayToast('Vos compétences ont été mises à jour.');
          })
          .catch((err) => {
            console.error(err);
            this.setState({isUpdating: false});
          });
      }

      //Update the profile infos only if they are different from the original ones
      if (!_.isEqual(user, userAux)) {
        //updateProfile
        this.setState({isUpdating: true});
        const {picture} = this.state.user;
        let pictureUrl = picture;
        if (picture !== this.state.userAux.picture) {
          //Upload new picture
          pictureUrl = await uploadProfilePicture(this.state.user.picture);
        }
        const updatedUser = {...this.state.user, picture: pictureUrl};
        updateUser(updatedUser, this.loggedUserId)
          .then((response) => {
            console.log('UPDATED USER', response);
            response.dob = new Date(response.dob);
            //Update global state
            this.props.dispatch({type: 'SET_LOGGED_USER', value: response});
            this.setState({
              user: response,
              userAux: response,
              isUpdating: false,
            });
            this.displayToast('Votre profil a été mis à jour.');
          })
          .catch((err) => {
            console.error(err);
            this.setState({isUpdating: false});
          });
      }
    } else {
      alert('Vérifiez les champs.');
    }
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

  renderUpdateButton = () => {
    let disabled = false;
    let disabledStyle = {color: PRIMARY_COLOR};
    const {user, userAux} = this.state;

    if (this.state.isUpdating) {
      return (
        <View>
          <ActivityIndicator color={PRIMARY_COLOR} size="large" />
        </View>
      );
    }

    if (_.isEqual(user, userAux) && !this.newSkills()) {
      disabled = true;
      disabledStyle = {color: '#999'};
    }
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => this.updateProfile()}>
        <Text style={[{fontWeight: 'bold', fontSize: 18}, disabledStyle]}>
          Mettre à jour
        </Text>
      </TouchableOpacity>
    );
  };

  isValidForm = () => {
    const {name, phone, address} = this.state.user;
    if (name.length === 0 || phone.length !== 8 || address.length === 0) {
      return false;
    }
    return true;
  };

  render() {
    const {name, phone, address, dob, picture, role} = this.state.user;
    const params = this.props.navigation.state.params;

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
          {this.renderUpdateButton()}
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
                    maxLength={8}
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
                            selectedSkills:
                              params !== undefined
                                ? params.newSkills
                                : this.state.skills,
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

const mapStateToProps = (state) => {
  return {
    loggedUser: state.setLoggedUser.loggedUser,
  };
};

export default connect(mapStateToProps)(LoggedUserProfile);
