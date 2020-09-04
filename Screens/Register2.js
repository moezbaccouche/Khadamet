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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, TERTIARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import {FormInput} from '../Components/FormInput';
import LargeSquareButton from '../Components/LargeSquareButton';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Register2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      show: false,
      date: new Date('1996-11-14'),
    };
  }

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
    if (this.state.isEnabled) {
      return (
        <LargeSquareButton
          action={() => this.props.navigation.navigate('RegisterSkills')}
        />
      );
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textSignup}>Inscription</Text>
        <LargeSquareButton action={() => console.log('PREESSS')} />
      </View>
    );
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
          <FormInput placeholder="Nom complet..." iconName="ios-person-sharp" />
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
          />
          <FormInput placeholder="Adresse..." iconName="ios-location-sharp" />

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
          <View style={styles.viewButton}>{this.renderSinginButton()}</View>
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
});
