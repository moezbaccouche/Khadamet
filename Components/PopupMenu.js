import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';

let unique = 0;
const {SlideInMenu} = renderers;

export default class Example extends Component {
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
      <MenuContext style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.topbar}>
            <View style={{flex: 1}}></View>
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
              <MenuOptions>
                <MenuOption value="Normal" text="Normal" />
                <MenuOption value="Disabled" disabled={true} text="Disabled" />
                <MenuOption value="Do not close" text="Do not close" />
                <View style={styles.divider} />
                <MenuOption
                  value={{text: 'Hello world!'}}
                  text="Object as value"
                />
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop: 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
});
