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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoggedUserProfile extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainerWrapper}>
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
              style={{color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 18}}>
              Mettre à jour
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/profilePicMale.jpg')}
              style={styles.userImage}
            />
          </View>
          <View style={styles.editImageIconContainer}>
            <Ionicons
              name="ios-pencil-sharp"
              color={SECONDARY_COLOR}
              size={16}
            />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.userDescriptionView}>
              <Text style={styles.labelText}>Nom complet</Text>
              <TextInput value="Moez Baccouche" style={styles.textInput} />
            </View>
            <View style={styles.userDescriptionView}>
              <Text style={styles.labelText}>Date de naissance</Text>
              <TextInput value="14/11/1996" style={styles.textInput} />
            </View>
            <View style={styles.userDescriptionView}>
              <Text style={styles.labelText}>Adresse</Text>
              <TextInput
                value="Route de Sfax, Borjine, M'Saken"
                style={styles.textInput}
              />
            </View>
            <View style={styles.userDescriptionView}>
              <Text style={styles.labelText}>Ville</Text>
              <TextInput value="Sousse" style={styles.textInput} />
            </View>
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
    top: 185,
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
});
