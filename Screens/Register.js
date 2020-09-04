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
} from 'react-native';
import {FormInput} from '../Components/FormInput';
import LargeButton from '../Components/LargeButton';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import LargeSquareButton from '../Components/LargeSquareButton';
// import ImagePicker from 'react-native-image-picker';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      picturePath: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
      invalidEmail: false,
      noPasswordsMatch: false,
      invalidForm: true,
      transferred: 0,
    };
  }

  avatarClicked = () => {
    // ImagePicker.showImagePicker(
    //   {
    //     title: 'Choisissez une méthode',
    //     takePhotoButtonTitle: 'Prendre une photo',
    //     chooseFromLibraryButtonTitle: 'Parcourir la galerie',
    //     cancelButtonTitle: 'Annuler',
    //   },
    //   (response) => {
    //     if (response.didCancel) {
    //       console.log("L'utilisateur a annulé la prise de photo !");
    //     } else if (response.error) {
    //       console.log('Erreur : ' + response.error);
    //     } else {
    //       console.log('Photo : ' + response.uri);
    //       this.setState({
    //         picturePath: response.uri,
    //       });
    //       // let requireSource = { uri: response.uri };
    //     }
    //   },
    // );
  };

  // uploadImage = async () => {
  //   const uri = this.state.picturePath;
  //   const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //   console.log('LOOOOG', fileName);

  //   firebase;

  //   firebase
  //     .storage()
  //     .ref(fileName)
  //     .putFile(uploadUri)
  //     .then((snapshot) => {
  //       console.log('UPLOADED SUCCESSFULLY', snapshot);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

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

  emailExists = (email) => {};

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
        <View style={styles.viewButton}>
          <LargeSquareButton
            action={() => {
              // if (this.state.invalidForm) {
              //   alert("Le formulaire n'a pas été correctement rempli.");
              // } else {
              //this.uploadImage();
              // this.props.navigation.navigate('RegisterInfos');
              // }
            }}
          />
        </View>
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
});
