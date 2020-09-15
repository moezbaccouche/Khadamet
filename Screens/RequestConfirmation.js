import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';

export default class RequestConfirmation extends React.Component {
  render() {
    const {color} = this.props.navigation.state.params;
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={SECONDARY_COLOR}
        />
        <View style={[styles.iconContainer, {borderColor: color}]}>
          <Ionicons name="ios-checkmark-sharp" color={color} size={90} />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: color,
              paddingTop: 20,
            }}>
            Merci !
          </Text>
          <Text style={{fontSize: 22, color: color}}>
            Votre demande a été envoyée !
          </Text>
        </View>
        <View style={styles.buttonView}>
          <LargeButton
            backgroundColor={color}
            color={SECONDARY_COLOR}
            text="Retour à l'accueil"
            borderColor={color}
            fontWeight="bold"
            borderRadius={8}
            onPress={() => this.props.navigation.navigate('Home')}
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
    height: 140,
    width: 140,
    borderRadius: 80,
    borderWidth: 2,
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
