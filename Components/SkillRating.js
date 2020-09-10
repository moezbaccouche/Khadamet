import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import RatingBar from './RatingBar';
import {STAR_COLOR} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SkillRating extends React.Component {
  render() {
    const {skillImage, skillName, workerRating, backgroundColor} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.skillImageContainer,
            {backgroundColor: backgroundColor},
          ]}>
          <Image style={styles.skillImage} source={skillImage} />
        </View>
        <View style={styles.skillDescription}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 5,
            }}>
            <Text style={styles.skillNameText}>{skillName}</Text>
            <Ionicons name="ios-star-outline" size={28} color={STAR_COLOR} />
          </View>
          <RatingBar barColor={backgroundColor} workerRating={workerRating} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    marginVertical: 10,
    alignItems: 'center',
  },
  skillImageContainer: {
    backgroundColor: '#FFA030',
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  skillImage: {
    height: 42,
    width: 42,
  },
  skillNameText: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  skillDescription: {
    paddingLeft: 20,
  },
});
