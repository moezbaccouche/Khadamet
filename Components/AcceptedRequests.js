import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import AcceptedRequestOverviewItem from './AcceptedRequestOverviewItem';

export default class AcceptedRequests extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <AcceptedRequestOverviewItem />
        <AcceptedRequestOverviewItem />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {},
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsView: {
    flexDirection: 'row',
  },
  tabsTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
});
