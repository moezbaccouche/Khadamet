import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';

export default class RequestDetails extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainerWrapper}>
        <View style={styles.mainContainer}>
          <StatusBar
            backgroundColor={SECONDARY_COLOR}
            barStyle="dark-content"
          />

          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={PRIMARY_COLOR}
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={styles.requestDescriptionView}>
            <Text
              style={{color: PRIMARY_COLOR, fontSize: 18, alignSelf: 'center'}}>
              Mission
            </Text>
            <Text
              style={{
                color: PRIMARY_COLOR,
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Jardinage
            </Text>
            <View style={styles.clientDescriptionView}>
              <Image
                source={require('../assets/profilePicMale.jpg')}
                style={styles.clientImage}
              />
              <Text style={styles.clientNameText}>Moez Baccouche</Text>
              <View style={styles.callIconContainer}>
                <Ionicons
                  name="ios-call-sharp"
                  color={SECONDARY_COLOR}
                  size={30}
                />
              </View>
            </View>
            <View style={styles.descriptionRowView}>
              <Text style={styles.labelText}>Date</Text>
              <Text style={styles.detailText}>26/08/2020 16:30</Text>
            </View>
            <View style={styles.descriptionRowView}>
              <Text style={styles.labelText}>Adresse</Text>
              <Text
                style={[styles.detailText, {textDecorationLine: 'underline'}]}>
                Route de Sfax, Borjine, M'Saken Sousse
              </Text>
            </View>
            <View style={styles.requestDescriptionParagrapheView}>
              <Text style={styles.labelText}>Description</Text>
              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <View style={styles.buttonsView}>
              <View style={styles.buttonView}>
                <LargeButton
                  backgroundColor={SECONDARY_COLOR}
                  color="#FC4850"
                  text="Refuser"
                  borderColor="#FC4850"
                  fontWeight="bold"
                />
              </View>
              <View style={styles.buttonView}>
                <LargeButton
                  backgroundColor={PRIMARY_COLOR}
                  color={SECONDARY_COLOR}
                  text="Accepter"
                  borderColor={PRIMARY_COLOR}
                  fontWeight="bold"
                />
              </View>
            </View>
          </View>
          <View style={styles.categoryImageContainer}>
            <Image
              source={require('../assets/gardening.png')}
              style={styles.categoryImage}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerWrapper: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  mainContainer: {
    flex: 1,
  },
  requestDescriptionView: {
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderRadius: 15,
    marginTop: 75,
    paddingTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryImage: {
    height: 80,
    width: 80,
  },
  categoryImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 115,
    width: 115,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 15,
    position: 'absolute',
    top: 90,
    left: Dimensions.get('window').width / 2 - 60,
  },
  callIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    height: 42,
    width: 42,
    borderRadius: 50,
  },
  clientDescriptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  clientImage: {
    height: 52,
    width: 52,
    borderRadius: 15,
    marginLeft: 10,
  },
  clientNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  headerToolbar: {
    height: 56,
    alignItems: 'flex-start',
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionRowView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  labelText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailText: {
    fontSize: 18,
    paddingLeft: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  requestDescriptionParagrapheView: {
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonView: {
    flex: 0.5,
    marginVertical: 30,
    marginHorizontal: 20,
  },
});
