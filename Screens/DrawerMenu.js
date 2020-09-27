import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import UserRole from '../API/user.roles';
import {MUTED_COLOR, PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import DrawerMenuItem from '../Components/DrawerMenuItem';
import {AuthContext} from '../Contexts/authContext';

class DrawerMenu extends React.Component {
  static contextType = AuthContext;

  onSignout = () => {
    const {signOut} = this.context;
    signOut();
  };

  render() {
    const {loggedUser} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainerView}>
          <View style={styles.headerToolbar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}>
              <Ionicons
                name="ios-close-outline"
                color={SECONDARY_COLOR}
                size={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userDescriptionView}>
            <Image
              style={styles.userPicture}
              source={{uri: loggedUser.picture}}
            />

            <Text style={styles.userFullNameText}>{loggedUser.name}</Text>
            <Text style={styles.userAddressText}>{loggedUser.address}</Text>
          </View>
        </View>
        <View style={styles.drawerMenuBodyView}>
          <View style={styles.drawerMenuTopBodyView}>
            <DrawerMenuItem
              iconName="ios-file-tray-full-outline"
              title="Mes demandes"
              onPress={() => this.props.navigation.navigate('MyRequests')}
            />
            {this.props.loggedUser.role === UserRole.PROFESSIONAL && (
              <DrawerMenuItem
                iconName="ios-briefcase-outline"
                title="Demandes reçues"
                onPress={() => this.props.navigation.navigate('Requests')}
              />
            )}
            <DrawerMenuItem
              iconName="ios-chatbubbles-outline"
              title="Messages"
              onPress={() => this.props.navigation.navigate('Messages')}
            />
            <DrawerMenuItem
              iconName="ios-settings-outline"
              title="Paramètres"
              onPress={() => this.props.navigation.navigate('Settings')}
            />
          </View>
          <View style={styles.drawerMenuBottomBodyView}>
            <DrawerMenuItem
              iconName="ios-log-out-outline"
              title="Déconnexion"
              onPress={() => this.onSignout()}
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
    backgroundColor: MUTED_COLOR,
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

const mapStateToProps = (state) => {
  return {
    loggedUser: state.setLoggedUser.loggedUser,
  };
};

export default connect(mapStateToProps)(DrawerMenu);
