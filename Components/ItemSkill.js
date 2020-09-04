import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

export default class ItemSkill extends React.Component {
  selectedSkill = () => {
    return (
      <TouchableHighlight
        onPress={() => this.props.action()}
        style={[
          styles.mainContainer,
          {
            backgroundColor: '#2ECC71',
            borderRadius: 7,
            elevation: 13,
            width: Dimensions.get('window').width / 3 - 20,
          },
        ]}>
        <View>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: 12,
              textAlign: 'center',
            }}>
            {this.props.skillName}
          </Text>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: 10,
              textAlign: 'center',
            }}>
            {this.props.skillPrice} DT / H
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  unselectedSkill = () => {
    return (
      <TouchableHighlight
        onPress={() => this.props.action()}
        style={[
          styles.mainContainer,
          {
            backgroundColor: '#D3D3D3',
            borderRadius: 7,
            width: Dimensions.get('window').width / 3 - 20,
          },
        ]}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#6A8582',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {this.props.skillName}
        </Text>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.props.isSelected) {
      return this.selectedSkill();
    }
    return this.unselectedSkill();
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
