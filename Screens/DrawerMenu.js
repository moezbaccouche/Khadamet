import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import DrawerMenuItem from '../Components/DrawerMenuItem';

export default class DrawerMenu extends React.Component {
  render() {
    const {userImage, fullName, address} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainerView}>
          <View style={styles.headerToolbar}>
            <Ionicons
              name="ios-close-outline"
              color={SECONDARY_COLOR}
              size={35}
              onPress={() => this.props.navigation.closeDrawer()}
            />
          </View>
          <View style={styles.userDescriptionView}>
            <Image
              style={styles.userPicture}
              source={require('../assets/profilePicMale.jpg')}
            />
            {/* <Text style={styles.userFullNameText}>{fullName}</Text>
            <Text style={styles.userAddressText}>{address}</Text> */}
            <Text style={styles.userFullNameText}>Moez Baccouche</Text>
            <Text style={styles.userAddressText}>
              Route de Sfax, Borjine, M'Saken, Sousse
            </Text>
          </View>
        </View>
        <View style={styles.drawerMenuBodyView}>
          <View style={styles.drawerMenuTopBodyView}>
            <DrawerMenuItem
              iconName="ios-chatbubbles-outline"
              title="Messages"
            />
            <DrawerMenuItem
              iconName="ios-settings-outline"
              title="Paramètres"
            />
          </View>
          <View style={styles.drawerMenuBottomBodyView}>
            <DrawerMenuItem
              iconName="ios-log-out-outline"
              title="Déconnexion"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  headerContainerView: {
    height: 300,
    backgroundColor: PRIMARY_COLOR,
  },
  userPicture: {
    height: 120,
    width: 120,
    borderRadius: 13,
    marginBottom: 10,
  },
  userFullNameText: {
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userAddressText: {
    color: SECONDARY_COLOR,
    fontSize: 16,
    fontStyle: 'italic',
  },
  headerToolbar: {
    height: 56,
    marginTop: 30,
    marginHorizontal: 20,
  },
  userDescriptionView: {
    marginHorizontal: 40,
  },
  drawerMenuBodyView: {
    marginHorizontal: 40,
    flex: 1,
  },
  drawerMenuBottomBodyView: {
    flex: 0.4,
    justifyContent: 'flex-end',
  },
  drawerMenuTopBodyView: {
    justifyContent: 'flex-start',
    flex: 0.6,
  },
});
