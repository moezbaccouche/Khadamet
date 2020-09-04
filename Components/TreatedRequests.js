import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import {TreatedRequestOverviewItem} from './TreatedRequestOverviewItem';

export default class TreatedRequests extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <TreatedRequestOverviewItem
          backgroundColor={PRIMARY_COLOR}
          categoryImage={require('../assets/gardening.png')}
          month="Aout"
          day={28}
          categoryName="Jardinage"
        />
        <TreatedRequestOverviewItem
          backgroundColor="#FFA030"
          categoryImage={require('../assets/hamburger.png')}
          month="Juillet"
          day={15}
          categoryName="Cuisine"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
