import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SECONDARY_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProfessionalSkillItem extends React.Component {
  unselectedItem = () => {
    const {title, icon, action} = this.props;
    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => action()}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  selectedItem = () => {
    const {color, title, skillPrice, icon, borderColor, action} = this.props;
    return (
      <TouchableOpacity
        onPress={() => action()}
        style={[
          styles.mainContainer,
          {
            borderWidth: 8,
            borderColor: borderColor === undefined ? color : borderColor,
            elevation: 13,
          },
        ]}>
        <Image source={icon} style={styles.selectedSkillImage} />
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.skillPriceText}>{skillPrice} DT / H</Text>
        <View
          style={[
            styles.checkIconContainer,
            {backgroundColor: borderColor === undefined ? color : borderColor},
          ]}>
          <Ionicons
            name="ios-checkmark-sharp"
            size={20}
            color={SECONDARY_COLOR}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.isSelected) {
      return this.selectedItem();
    }
    return this.unselectedItem();
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 135,
    width: 145,
    borderRadius: 8,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    marginVertical: 10,
  },
  selectedSkillImage: {
    height: 72,
    width: 72,
  },
  image: {
    height: 92,
    width: 92,
  },
  titleText: {
    fontSize: 18,
  },
  skillPriceText: {
    fontSize: 12,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 100,
    elevation: 10,
  },
});
