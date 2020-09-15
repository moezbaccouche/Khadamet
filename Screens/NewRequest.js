import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, STAR_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RequestStatus from '../API/request.status';
import RatingStars from '../Components/RatingStars';

export default class NewRequest extends React.Component {
  constructor(props) {
    const now = new Date();
    const dateNow = moment(
      `${now.getDate() + 1}/${now.getMonth()}/${now.getFullYear()} 08:00`,
      'D/M/yyyy HH:mm',
    );
    super(props);
    this.state = {
      date: new Date(dateNow),
      mode: 'date',
      show: false,
      address: '',
      description: '',
    };
    console.log(this.state.date);
  }

  handleDateChange = () => {
    if (moment(this.state.date).isBefore(new Date(), 'minutes')) {
      //If the chosen date is inferior to current date
      //Display alert and reset the state with current date
      alert('La date choisie ne peut pas être inférieure à la date courante.');
      this.setState({date: new Date()});
    }
  };

  handleTimeChange = () => {
    const day = this.state.date.getDate();
    const month = this.state.date.getMonth() + 1;
    const year = this.state.date.getFullYear();
    const beginTime = moment(`${day}/${month}/${year} 08:00`, 'D/M/yyyy HH:mm');
    const endTime = moment(`${day}/${month}/${year} 18:00`, 'D/M/yyyy HH:mm');

    //If the chosen is not between 8am and 6pm
    //Display alert and reset the state with current date
    if (!moment(this.state.date).isBetween(beginTime, endTime)) {
      alert("L'heure choisie doit être comprise entre 08:00 et 18:00");
      this.setState({
        date: new Date(year, month - 1, day, 8, 0),
      });
    }
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate, show: false}, () => {
      if (this.state.mode === 'date') {
        this.handleDateChange();
      } else {
        this.handleTimeChange();
      }
    });
  };

  showMode = () => {
    this.setState({show: true});
  };

  showDatepicker = () => {
    this.setState({
      mode: 'date',
      show: true,
    });
  };

  showTimepicker = () => {
    this.setState({
      mode: 'time',
      show: true,
    });
  };

  submitRequest = () => {
    const {address, description, date} = this.state;
    const {
      professionalId,
      professionalName,
      skillId,
      color,
    } = this.props.navigation.state.params;
    const clientId = 'aaaaaa123'; // <---- Get the client id from Async storage
    if (address.length !== 0) {
      const newRequest = {
        skillId,
        clientId,
        professionalId,
        date,
        address,
        status: RequestStatus.PENDING,
        description: description !== '' ? description.trim() : undefined,
      };
      console.log('NEW REQ', newRequest);
      this.props.navigation.navigate('RequestSummary', {
        request: newRequest,
        professionalName,
        color,
      });
    } else {
      alert('Veuillez indiquer votre adresse.');
      return;
    }
  };

  render() {
    const {
      professionalName,
      professionalPicture,
      rating,
      salary,
      color,
    } = this.props.navigation.state.params;

    console.log('PARAMS:', this.props.navigation.state.params);
    return (
      <ScrollView style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          backgroundColor={color}
          barStyle="light-content"
        />
        <View style={[styles.headerContainer, {backgroundColor: color}]}>
          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={30}
              color={SECONDARY_COLOR}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={styles.selectedWorkerDescriptionContainer}>
            <Image
              source={{uri: professionalPicture}}
              style={styles.workerImage}
            />
            <Text style={styles.workerFullNameText}>{professionalName}</Text>
            <View style={styles.workerRatingView}>
              <RatingStars rating={rating} />
            </View>
            <Text style={styles.workerPriceText}>{salary} DT / H</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.addressInputContainer}>
            <Text style={styles.labelText}>Adresse</Text>
            <TextInput
              placeholder="Adresse..."
              style={[styles.textInput, {borderColor: color}]}
              onChangeText={(text) => this.setState({address: text})}
            />
          </View>
          <View style={styles.dateAndTimeContainer}>
            <View style={{flex: 1, paddingRight: 15}}>
              <Text style={styles.labelText}>Date</Text>
              <TouchableOpacity
                style={[styles.dateContainer, {borderColor: color}]}
                onPress={() => this.showDatepicker()}>
                <Text style={styles.dateTimeText}>
                  {moment(this.state.date).format('DD/MM/yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}

            <View style={{flex: 1, paddingLeft: 15}}>
              <Text style={styles.labelText}>Heure</Text>
              <TouchableOpacity
                style={[styles.dateContainer, {borderColor: color}]}
                onPress={() => this.showTimepicker()}>
                <Text style={styles.dateTimeText}>
                  {moment(this.state.date).format('HH:mm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.descriptionInputContainer}>
            <Text style={styles.labelText}>Description</Text>
            <TextInput
              placeholder="Description..."
              style={[
                styles.textInput,
                styles.descriptionText,
                {borderColor: color},
              ]}
              multiline={true}
              onChangeText={(text) => this.setState({description: text})}
            />
          </View>
          <View style={styles.buttonView}>
            <LargeButton
              backgroundColor={color}
              color={SECONDARY_COLOR}
              text="Confirmer"
              borderColor={color}
              borderRadius={8}
              onPress={() => this.submitRequest()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerContainer: {
    height: 310,
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  bodyContainer: {
    marginHorizontal: 20,
  },
  labelText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
  },
  descriptionInputContainer: {},
  selectedWorkerDescription: {
    alignItems: 'center',
  },
  workerImage: {
    height: 120,
    width: 120,
    borderRadius: 8,
    alignSelf: 'center',
  },
  workerRatingView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  workerFullNameText: {
    alignSelf: 'center',
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 18,
    paddingBottom: 5,
  },
  workerPriceText: {
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 5,
    fontSize: 18,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  descriptionText: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonView: {
    marginVertical: 20,
  },

  dateContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  dateTimeText: {
    alignSelf: 'center',
    paddingVertical: 5,
    fontSize: 16,
  },
});
