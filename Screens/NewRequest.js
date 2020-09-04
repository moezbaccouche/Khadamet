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
import {PRIMARY_COLOR, SECONDARY_COLOR, STAR_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';
import DateTimePicker from '@react-native-community/datetimepicker';

// [date, setDate] = useState(new Date(1598051730000));
// [mode, setMode] = useState('date');
// [show, setShow] = useState(false);
export default class NewRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date',
      show: false,
    };
    console.log(this.state.date);
  }

  onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate, show: false});
  };

  showMode = (currentMode) => {
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

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          backgroundColor={PRIMARY_COLOR}
          barStyle="light-content"
        />
        <View style={styles.headerContainer}>
          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={30}
              color={SECONDARY_COLOR}
            />
          </View>
          <View style={styles.selectedWorkerDescriptionContainer}>
            <Image
              source={require('../assets/profilePicMale.jpg')}
              style={styles.workerImage}
            />
            <Text style={styles.workerFullNameText}>Moez Baccouche</Text>
            <View style={styles.workerRatingView}>
              <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
              <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
              <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
              <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
              <Ionicons
                name="ios-star-outline"
                size={16}
                color={STAR_COLOR}
                style={{paddingTop: 1}}
              />
            </View>
            <Text style={styles.workerPriceText}>35 DT</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.addressInputContainer}>
            <Text style={styles.labelText}>Adresse</Text>
            <TextInput placeholder="Adresse..." style={styles.textInput} />
          </View>
          <View style={styles.dateAndTimeContainer}>
            <View style={{flex: 1, paddingRight: 15}}>
              <Text style={styles.labelText}>Date</Text>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => this.showDatepicker()}>
                <Text style={styles.dateTimeText}>
                  {`${this.state.date.getDate()}/${
                    this.state.date.getMonth() + 1
                  }/${this.state.date.getFullYear()}`}
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
                style={styles.dateContainer}
                onPress={() => this.showTimepicker()}>
                <Text style={styles.dateTimeText}>{`${
                  this.state.date.getHours() < 10
                    ? '0' + this.state.date.getHours()
                    : this.state.date.getHours()
                }:${this.state.date.getMinutes()}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.descriptionInputContainer}>
            <Text style={styles.labelText}>Description</Text>
            <TextInput
              placeholder="Description..."
              style={[styles.textInput, styles.descriptionText]}
              multiline={true}
            />
          </View>
          <View style={styles.buttonView}>
            <LargeButton
              backgroundColor={PRIMARY_COLOR}
              color={SECONDARY_COLOR}
              text="Confirmer"
              borderColor={PRIMARY_COLOR}
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
    height: 300,
    backgroundColor: PRIMARY_COLOR,
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
    height: 105,
    width: 105,
    borderRadius: 50,
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
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  descriptionText: {
    height: 100,
  },
  buttonView: {
    marginVertical: 20,
  },

  dateContainer: {
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    padding: 10,
  },
  dateTimeText: {
    alignSelf: 'center',
    paddingVertical: 5,
    fontSize: 16,
  },
});
