import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {FormInput} from '../Components/FormInput';
import LargeButton from '../Components/LargeButton';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import LargeSquareButton from '../Components/LargeSquareButton';
import {clientExists} from '../API/clients.services';
import {professionalExists} from '../API/professionals.services';
import ImagePicker from 'react-native-image-picker';
import {defaultPicturePath} from '../assets/defaults';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      picturePath: defaultPicturePath,

      invalidEmail: false,
      noPasswordsMatch: false,
      invalidForm: true,
      emailExists: false,
      isLoading: false,
    };
  }

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={SECONDARY_COLOR}
            size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <LargeSquareButton
        action={() => {
          this.emailExists(this.state.email);
        }}
      />
    );
  };

  avatarClicked = () => {
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
            picturePath: response.uri,
          });
        }
      },
    );
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email.toLowerCase())) {
      this.setState({
        invalidEmail: true,
        invalidForm: true,
      });
    } else {
      this.setState({
        invalidEmail: false,
        invalidForm: false,
        email: email,
      });
    }
  };

  validatePassword = (password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      this.setState({
        noPasswordsMatch: true,
        invalidForm: true,
      });
    } else {
      this.setState({
        noPasswordsMatch: false,
        invalidForm: false,
        password: password,
      });
    }
  };

  emailExists = async (email) => {
    if (email !== '') {
      this.setState({isLoading: true});
      const proExists = await professionalExists(email);
      const cliExists = await clientExists(email);

      if (proExists || cliExists) {
        this.setState({
          emailExists: true,
          invalidForm: true,
          isLoading: false,
        });
      } else {
        this.setState(
          {
            emailExists: false,
            invalidForm: true,
            isLoading: false,
          },
          () => {
            this.props.navigation.navigate('RegisterInfos', {
              email: this.state.email,
              password: this.state.password,
              picturePath: this.state.picturePath,
            });
          },
        );
      }
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.mainContainer}
        source={require('../assets/splash.png')}
        resizeMode="stretch">
        <StatusBar
          translucent={true}
          backgroundColor={PRIMARY_COLOR}
          barStyle="light-content"
        />

        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this.avatarClicked()}>
          <Image
            source={
              this.state.picturePath === ''
                ? require('../assets/defaultAvatar.png')
                : {
                    uri: this.state.picturePath,
                  }
            }
            style={styles.imageAvatar}
          />
        </TouchableOpacity>
        <View style={styles.viewFormRegister}>
          <FormInput
            placeholder="Email..."
            iconName="ios-mail-sharp"
            autoCapitalize="none"
            onChangeText={(text) => this.validateEmail(text)}
          />
          {this.state.invalidEmail && (
            <Text style={styles.errorMessage}>Adresse email incorrecte.</Text>
          )}
          {this.state.emailExists && (
            <Text style={styles.errorMessage}>
              Adresse email déjà utilisée.
            </Text>
          )}
          <FormInput
            placeholder="Mot de passe..."
            iconName="ios-lock-closed"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <FormInput
            placeholder="Répétez mot de passe..."
            iconName="ios-lock-closed"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) =>
              this.validatePassword(this.state.password, text)
            }
          />
          {this.state.noPasswordsMatch && (
            <Text style={styles.errorMessage}>
              Les mots de passe ne correspondent pas.
            </Text>
          )}
        </View>
        <View style={styles.viewButton}>{this.displayLoading()}</View>
        <View style={styles.viewTextLogin}>
          <Text
            style={styles.textLogin}
            onPress={() => this.props.navigation.navigate('Login')}>
            Connexion
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    borderRadius: 70,
    height: 120,
    width: 120,
    borderColor: SECONDARY_COLOR,
    borderWidth: 3,
    alignItems: 'flex-start',
  },
  viewFormRegister: {
    marginHorizontal: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 25,
  },
  viewButton: {
    marginTop: 10,
    justifyContent: 'center',
  },
  textLogin: {
    color: SECONDARY_COLOR,
    textDecorationLine: 'underline',
  },
  viewTextLogin: {
    alignItems: 'center',
    marginTop: 60,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
