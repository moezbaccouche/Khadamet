import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';

export default class Settings extends React.Component {
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
            <Text style={styles.headerTitle}>Paramètres</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.itemsTitleView}>
              <Ionicons
                name="ios-person-circle-sharp"
                color={PRIMARY_COLOR}
                size={30}
              />
              <Text style={styles.itemsTitleText}>Compte</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.itemsContainer}>
              <TouchableOpacity
                style={styles.rowItem}
                onPress={() =>
                  this.props.navigation.navigate('LoggedUserProfile')
                }>
                <Text style={styles.rowItemText}>Modifer profil</Text>
                <Ionicons
                  name="ios-chevron-forward-sharp"
                  size={18}
                  color={PRIMARY_COLOR}
                  style={styles.iconChevron}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowItem}>
                <Text style={styles.rowItemText}>Changer e-mail</Text>
                <Ionicons
                  name="ios-chevron-forward-sharp"
                  size={18}
                  color={PRIMARY_COLOR}
                  style={styles.iconChevron}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowItem}>
                <Text style={styles.rowItemText}>Changer mot de passe</Text>
                <Ionicons
                  name="ios-chevron-forward-sharp"
                  size={18}
                  color={PRIMARY_COLOR}
                  style={styles.iconChevron}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowItem}>
                <Text style={[styles.rowItemText, styles.deleteAccountText]}>
                  Supprimer compte
                </Text>
              </TouchableOpacity>
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
    marginHorizontal: 20,
  },
  headerToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    paddingLeft: 20,
  },
  bodyContainer: {
    marginTop: 50,
  },
  itemsTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    paddingLeft: 10,
  },
  divider: {
    height: 0.2,
    marginTop: 15,
    backgroundColor: PRIMARY_COLOR,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowItemText: {
    fontSize: 18,
    color: '#686868',
    paddingLeft: 40,
  },
  iconChevron: {},
  deleteAccountText: {
    color: '#FC4850',
  },
  itemsContainer: {
    marginTop: 30,
  },
});
