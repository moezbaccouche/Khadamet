import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TreatedRequests from '../Components/TreatedRequests';
import PendingRequests from '../Components/PendingRequests';
import AcceptedRequests from '../Components/AcceptedRequests';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'pending', title: 'EN ATTENTE'},
    {key: 'accepted', title: 'ACCEPTEES'},
    {key: 'treated', title: 'TRAITEES'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: PRIMARY_COLOR}}
      style={{backgroundColor: SECONDARY_COLOR, elevation: 0}}
      activeColor={PRIMARY_COLOR}
      inactiveColor="#989898"
    />
  );

  const renderScene = SceneMap({
    pending: PendingRequests,
    accepted: AcceptedRequests,
    treated: TreatedRequests,
  });

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
      <View style={styles.headerToolbar}>
        <Ionicons name="ios-arrow-back-sharp" size={30} color={PRIMARY_COLOR} />
        <Text style={styles.headerTitle}>Demandes</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  headerToolbar: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    paddingLeft: 20,
  },
});
