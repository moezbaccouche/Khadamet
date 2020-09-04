import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import SkillRating from '../Components/SkillRating';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
let unique = 0;
export default class WorkerProfile extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {log: []};
  }

  selectNumber(value) {
    this.addLog(`selecting number: ${value}`);
  }

  selectOptionType(value) {
    const v = typeof value === 'object' ? JSON.stringify(value) : value;
    this.addLog(`selecting type: ${v}`);
    return value !== 'Do not close';
  }

  addLog(value) {
    this.setState({
      log: [
        ...this.state.log,
        {
          value,
          id: ++unique,
        },
      ],
    });
  }

  render() {
    return (
      <MenuContext>
        <View style={styles.mainContainer}>
          <StatusBar
            translucent={true}
            backgroundColor={PRIMARY_COLOR}
            barStyle="light-content"
          />

          <View style={styles.headerContainer}>
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                top: 200,
                left: 0,
                height: Dimensions.get('window').height - 200,
                width: Dimensions.get('window').width,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}>
              <View style={styles.workerDescriptionView}>
                <Text style={styles.workerFullNameText}>Moez Baccouche</Text>
                <Text style={styles.workerAgeText}>23 ans</Text>
                <Text style={styles.workerAddressText}>
                  Route de Sfax, Borjine, M'Saken, Sousse
                </Text>
              </View>
              <View style={styles.skillsView}>
                <SkillRating
                  skillImage={require('../assets/hamburger.png')}
                  backgroundColor="#FFA030"
                  skillName="Cuisine"
                  workerRating={4}
                />
                <SkillRating
                  skillImage={require('../assets/gard.png')}
                  backgroundColor={PRIMARY_COLOR}
                  skillName="Jardinage"
                  workerRating={3}
                />
              </View>
            </View>
            <Image
              source={require('../assets/profilePicMale.jpg')}
              style={styles.workerImage}
            />

            <View style={styles.headerToolbar}>
              <Ionicons
                name="ios-arrow-back-sharp"
                color={SECONDARY_COLOR}
                size={30}
                onPress={() => this.props.navigation.goBack()}
              />
              <Menu
                name="types"
                onSelect={(value) => this.selectOptionType(value)}
                onBackdropPress={() =>
                  this.addLog('menu will be closed by backdrop')
                }
                onOpen={() => this.addLog('menu is opening')}
                onClose={() => this.addLog('menu is closing')}>
                <MenuTrigger style={styles.trigger}>
                  <Ionicons
                    name="ios-ellipsis-vertical"
                    color={SECONDARY_COLOR}
                    size={30}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{optionsContainer: {borderRadius: 8}}}>
                  <MenuOption
                    value="Normal"
                    text="Appeler"
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                  <MenuOption
                    value="Disabled"
                    text="Envoyer un message"
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                  <MenuOption
                    value={{text: 'Hello world!'}}
                    text="Envoyer un SMS"
                    onSelect={() => console.log('Envoyer un sms')}
                    customStyles={{optionText: styles.menuItemsText}}
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  headerContainer: {
    flex: 0.25,
    backgroundColor: PRIMARY_COLOR,
  },
  headerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  workerImage: {
    height: 152,
    width: 152,
    borderRadius: 13,
    position: 'absolute',
    top: 120,
    left: Dimensions.get('window').width / 2 - 152 / 2,
  },
  workerFullNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workerDescriptionView: {
    marginTop: 80,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  workerAgeText: {
    fontSize: 20,
  },
  workerAddressText: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  skillsView: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  menuItemsText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
