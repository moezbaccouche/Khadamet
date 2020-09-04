import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';

export default class RequestConfirmation extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={SECONDARY_COLOR}
        />
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-checkmark-sharp"
            color={PRIMARY_COLOR}
            size={90}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
              paddingTop: 20,
            }}>
            Merci !
          </Text>
          <Text style={{fontSize: 22, color: PRIMARY_COLOR}}>
            Votre demande a été envoyée !
          </Text>
        </View>
        <View style={styles.buttonView}>
          <LargeButton
            backgroundColor={PRIMARY_COLOR}
            color={SECONDARY_COLOR}
            text="Retour à l'accueil"
            borderColor={PRIMARY_COLOR}
            fontWeight="bold"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
  },
  iconContainer: {
    height: 160,
    width: 160,
    backgroundColor: '#B2E0C6',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonView: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginTop: 40,
  },
});
