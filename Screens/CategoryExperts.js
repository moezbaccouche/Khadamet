import React from 'react';
import {ScrollView, Text, StyleSheet, StatusBar, View} from 'react-native';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import SearchInput from '../Components/SearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchedExpertItem from '../Components/SearchedExpertItem';

export default class CategoryExperts extends React.Component {
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
              size={30}
              color={PRIMARY_COLOR}
            />

            <Text style={styles.headerTitle}>Experts en Jardinage</Text>
          </View>
          <View style={styles.bodyContainer}>
            <SearchInput />
            <View style={styles.expertsFoundNumberView}>
              <Text style={{fontSize: 16}}>Experts trouvés: </Text>
              <Text style={{fontWeight: 'bold'}}>2</Text>
            </View>
            <View style={styles.expertsContainer}>
              <SearchedExpertItem />
              <SearchedExpertItem />
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
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    paddingLeft: 20,
    color: PRIMARY_COLOR,
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  expertsContainer: {
    marginTop: 20,
  },
  expertsFoundNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
});
