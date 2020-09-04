import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import RequestOverviewItem from './PendingRequestOverviewItem';
import PendingRequestOverviewSecondEx from './PendingRequestOverview';
import PendingRequestOverview from './PendingRequestOverview';

export default class PendingRequests extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <PendingRequestOverview />
        <PendingRequestOverview />
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
