import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';

export default class RequestSummary extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
        <View style={styles.headerToolbar}>
          <Ionicons
            name="ios-arrow-back-sharp"
            color={PRIMARY_COLOR}
            size={30}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Confirmation de la demande</Text>
        </View>
        <View style={styles.summaryView}>
          <Text
            style={{fontSize: 16, color: PRIMARY_COLOR, fontWeight: 'bold'}}>
            Résumé de la demande
          </Text>
          <View style={styles.detailsRowView}>
            <Image
              source={require('../assets/worker.png')}
              style={styles.icon}
            />
            <Text style={styles.detailsText}>Moez Baccouche</Text>
          </View>
          <View style={styles.detailsRowView}>
            <Image
              source={require('../assets/location.png')}
              style={styles.icon}
            />
            <Text style={styles.detailsText}>
              Route de Sfax, Borjine, M'Saken, Sousse
            </Text>
          </View>
          <View style={styles.detailsRowView}>
            <Image source={require('../assets/time.png')} style={styles.icon} />
            <Text style={styles.detailsText}>26/08/2020 14:00</Text>
          </View>
          <View style={styles.detailsRowView}>
            <Text
              style={{fontWeight: 'bold', color: PRIMARY_COLOR, fontSize: 18}}>
              Opération:
            </Text>
            <Text style={{fontSize: 18, paddingLeft: 10}}>Jardinage</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <LargeButton
            backgroundColor={PRIMARY_COLOR}
            color={SECONDARY_COLOR}
            text="Confirmer"
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
    backgroundColor: SECONDARY_COLOR,
  },
  summaryView: {
    borderWidth: 2,
    borderRadius: 13,
    borderColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 60,
  },
  headerToolbar: {
    height: 56,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    paddingLeft: 20,
    color: PRIMARY_COLOR,
    fontSize: 20,
  },
  detailsRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    height: 32,
    width: 32,
  },
  detailsText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonView: {
    marginHorizontal: 20,
    marginTop: 25,
  },
});
