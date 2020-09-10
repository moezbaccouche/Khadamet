import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  STAR_COLOR,
  PRIMARY_COLOR,
  COOKING_COLOR,
  SECONDARY_COLOR,
} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import LargeButton from '../Components/LargeButton';

export default class Review extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerToolbar}>
          <View style={{flex: 0.2}}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={PRIMARY_COLOR}
              size={30}
            />
          </View>
          <View style={{flex: 0.6, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>Avis</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.skillImageContainer}>
            <Image
              source={require('../assets/hamburger.png')}
              style={styles.skillImage}
            />
          </View>
          <Text style={styles.description}>
            Donnez votre avis sur Moez en cuisine
          </Text>
          <View style={styles.viewRating}>
            <Ionicons name="ios-star-outline" size={40} color={STAR_COLOR} />
            <Ionicons name="ios-star-outline" size={40} color={STAR_COLOR} />
            <Ionicons name="ios-star-outline" size={40} color={STAR_COLOR} />
            <Ionicons name="ios-star-outline" size={40} color={STAR_COLOR} />
            <Ionicons name="ios-star-outline" size={40} color={STAR_COLOR} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Dites aux autres utilisateurs ce que vous pensez de Moez..."
            />
          </View>

          <LargeButton
            backgroundColor={PRIMARY_COLOR}
            color={SECONDARY_COLOR}
            text="Envoyer"
            borderColor={PRIMARY_COLOR}
            borderRadius={8}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 30,
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
  skillImageContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: COOKING_COLOR,
  },
  skillImage: {
    height: 72,
    width: 72,
  },
  description: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    paddingVertical: 30,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {},
  inputContainer: {
    paddingBottom: 50,
    marginBottom: 50,
    height: 100,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 8,
  },
});
