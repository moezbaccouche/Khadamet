import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, TERTIARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import {FormInput} from '../Components/FormInput';
import LargeSquareButton from '../Components/LargeSquareButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createClient} from '../API/clients.services';
import {defaultPicturePath} from '../assets/defaults';
import {uploadProfilePicture} from '../API/firebase.services';

export default class Register2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      show: false,
      date: new Date('1996-11-14'),
      name: '',
      phone: '',
      address: '',
      invalidForm: true,
      emptyName: false,
      invalidPhone: false,
      emptyAddress: false,
      isLoading: false,
    };
  }

  validateForm = () => {
    const {name, phone, address} = this.state;
    if (name.length === 0) {
      this.setState({
        emptyName: true,
        invalidPhone: false,
        emptyAddress: false,
      });
    } else if (phone.length !== 8) {
      this.setState({
        emptyName: false,
        invalidPhone: true,
        emptyAddress: false,
      });
    } else if (address.length === 0) {
      this.setState({
        emptyName: false,
        invalidPhone: false,
        emptyAddress: true,
      });
    } else {
      this.setState({
        invalidForm: false,
        emptyName: false,
        invalidPhone: false,
        emptyAddress: false,
      });
    }
  };

  showDatepicker = () => {
    this.setState({
      show: true,
    });
  };

  onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate, show: false});
  };

  changeSwitchValue = () => {
    if (this.state.isEnabled) {
      this.setState({isEnabled: false});
    } else {
      this.setState({isEnabled: true});
    }
  };

  renderSinginButton = () => {
    const {name, date, phone, address, isEnabled} = this.state;
    const {email, password, picturePath} = this.props.navigation.state.params;
    if (isEnabled) {
      return (
        <LargeSquareButton
          action={() => {
            this.validateForm();
            if (!this.state.invalidForm) {
              console.log(email + ' ' + password);
              this.props.navigation.navigate('RegisterSkills', {
                email,
                password,
                name,
                dob: date,
                phone,
                address,
                picturePath,
              });
            }
          }}
        />
      );
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textSignup}>Inscription</Text>
        <LargeSquareButton
          action={() => {
            this.validateForm();
            if (!this.state.invalidForm) {
              //Add to DB as Client
              console.log(email + ' ' + password);
              if (picturePath !== defaultPicturePath) {
                this.createClient();
              }
            }
          }}
        />
      </View>
    );
  };

  displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={SECONDARY_COLOR}
            size="large"></ActivityIndicator>
        </View>
      );
    }
    return this.renderSinginButton();
  }

  createClient = async () => {
    this.setState({isLoading: true});
    const {name, date, phone, address, isEnabled} = this.state;
    const {email, password, picturePath} = this.props.navigation.state.params;

    let pictureUrl = defaultPicturePath;
    if (defaultPicturePath !== picturePath) {
      //Upload picture to firebase only if it's different from the default one
      pictureUrl = await uploadProfilePicture(picturePath);
    }

    const client = createClient({
      email,
      password,
      name,
      dob: date,
      phone,
      address,
      pictureUrl,
    })
      .then((val) => {
        this.setState({isLoading: false});
        console.log(val);
        return val;
      })
      .catch((e) => {
        this.setState({isLoading: false});
        console.error(e);
      });
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
        <View style={styles.viewHeader}>
          <Ionicons
            color="#fff"
            name="ios-arrow-back-outline"
            size={30}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>

        <ScrollView style={styles.viewFormRegister}>
          <FormInput
            placeholder="Nom complet..."
            iconName="ios-person-sharp"
            onChangeText={(text) => this.setState({name: text})}
          />
          {this.state.emptyName && (
            <Text style={styles.errorMessage}>
              Ce champs ne doit pas être vide.
            </Text>
          )}
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode="date"
              display="default"
              onChange={this.onChange}
            />
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderRadius: 7,
              marginVertical: 10,
              backgroundColor: TERTIARY_COLOR,
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
            onPress={() => this.showDatepicker()}>
            <Ionicons
              style={styles.icon}
              name="ios-calendar-sharp"
              color={PRIMARY_COLOR}
              size={20}
            />
            <Text style={{flex: 1, paddingHorizontal: 13}}>
              {`${this.state.date.getDate()}/${
                this.state.date.getMonth() + 1
              }/${this.state.date.getFullYear()}`}
            </Text>
          </TouchableOpacity>
          <FormInput
            placeholder="Teléphone..."
            iconName="ios-call-sharp"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({phone: text})}
          />
          {this.state.invalidPhone && (
            <Text style={styles.errorMessage}>Doit contenir 8 caractères.</Text>
          )}
          <FormInput
            placeholder="Adresse..."
            iconName="ios-location-sharp"
            onChangeText={(text) => this.setState({address: text})}
          />
          {this.state.emptyAddress && (
            <Text style={styles.errorMessage}>
              Ce champs ne doit pas être vide.
            </Text>
          )}

          <View style={styles.viewIsPro}>
            <Text
              style={styles.textIsPro}
              onPress={() => this.setState({showPrompt: true})}>
              Vous êtes un professionnel ?
            </Text>
            <Switch
              trackColor={{
                false: '#c3c3c3',
                true: TERTIARY_COLOR,
              }}
              thumbColor={this.state.isEnabled ? 'white' : '#7f7f7f'}
              ios_backgroundColor="#c3c3c3"
              onValueChange={() => this.changeSwitchValue()}
              value={this.state.isEnabled}
            />
          </View>
          <View style={styles.viewButton}>{this.displayLoading()}</View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  viewHeader: {
    marginTop: 30,
    marginLeft: 10,
    height: 56,
    justifyContent: 'center',
  },
  viewFormRegister: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  textIsPro: {
    color: 'white',
    marginRight: 5,
  },

  viewIsPro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSkillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  errorMessage: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
