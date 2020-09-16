import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSkillById} from '../API/skills.data';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../assets/colors';
import LargeButton from '../Components/LargeButton';
import moment from 'moment';

export default class RequestDetails extends React.Component {
  render() {
    const {request} = this.props.navigation.state.params;
    const skill = getSkillById(request.skillId);
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
              color={skill.color}
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View
            style={[styles.requestDescriptionView, {borderColor: skill.color}]}>
            <Text
              style={{color: skill.color, fontSize: 18, alignSelf: 'center'}}>
              Mission
            </Text>
            <Text
              style={{
                color: skill.color,
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              {skill.title}
            </Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: skill.color,
                marginHorizontal: 20,
                marginTop: 10,
              }}
            />
            <View style={styles.clientDescriptionView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 20,
                }}>
                <Image
                  source={{uri: request.client.picture}}
                  style={styles.clientImage}
                />
                <Text style={styles.clientNameText}>{request.client.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.callIconContainer}
                onPress={() => Linking.openURL(`tel:${request.client.phone}`)}>
                <Ionicons
                  name="ios-call-sharp"
                  color={SECONDARY_COLOR}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.5,
                backgroundColor: skill.color,
                marginHorizontal: 20,
                marginTop: 15,
              }}
            />
            <View style={[styles.descriptionRowView, {marginTop: 10}]}>
              <Text style={[styles.labelText, {color: skill.color}]}>Date</Text>
              <Text style={styles.detailText}>
                {moment(request.date).format('DD/MM/yyyy HH:mm')}
              </Text>
            </View>
            <View style={[styles.descriptionRowView, {flex: 1}]}>
              <Text style={[styles.labelText, {color: skill.color}]}>
                Adresse
              </Text>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  Platform.OS === 'ios'
                    ? Linking.openURL(`maps:?q=${request.address}`)
                    : Linking.openURL(`geo:?q=${request.address}`)
                }>
                <Text
                  style={[
                    styles.detailText,
                    {
                      textDecorationLine: 'underline',
                      flexWrap: 'wrap',
                      flex: 1,
                    },
                  ]}>
                  {request.address}
                </Text>
              </TouchableOpacity>
            </View>
            {request.description && (
              <View style={styles.requestDescriptionParagrapheView}>
                <Text style={[styles.labelText, {color: skill.color}]}>
                  Description
                </Text>
                <Text style={styles.descriptionText}>
                  {request.description}
                </Text>
              </View>
            )}
            <View style={styles.buttonsView}>
              <View style={styles.buttonView}>
                <LargeButton
                  backgroundColor={SECONDARY_COLOR}
                  color="#FC4850"
                  text="Refuser"
                  borderColor="#FC4850"
                  fontWeight="bold"
                  borderRadius={15}
                />
              </View>
              <View style={styles.buttonView}>
                <LargeButton
                  backgroundColor={PRIMARY_COLOR}
                  color={SECONDARY_COLOR}
                  text="Accepter"
                  borderColor={PRIMARY_COLOR}
                  fontWeight="bold"
                  borderRadius={15}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.categoryImageContainer,
              {
                backgroundColor: skill.color,
              },
            ]}>
            <Image source={skill.icon} style={styles.categoryImage} />
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
  requestDescriptionView: {
    borderWidth: 4,
    borderRadius: 15,
    marginTop: 75,
    paddingTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryImage: {
    height: 80,
    width: 80,
  },
  categoryImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 115,
    width: 115,
    borderRadius: 15,
    position: 'absolute',
    top: 90,
    left: Dimensions.get('window').width / 2 - 60,
  },
  callIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    height: 42,
    width: 42,
    borderRadius: 50,
    marginRight: 20,
  },
  clientDescriptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  clientImage: {
    height: 42,
    width: 42,
    borderRadius: 50,
  },
  clientNameText: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  headerToolbar: {
    height: 56,
    alignItems: 'flex-start',
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionRowView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  requestDescriptionParagrapheView: {
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonView: {
    flex: 0.5,
    marginVertical: 30,
    marginHorizontal: 20,
  },
});
