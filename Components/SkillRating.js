import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import RatingBar from './RatingBar';

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
          <Text style={styles.skillNameText}>{skillName}</Text>
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
    marginBottom: 80,
    alignItems: 'center',
  },
  skillImageContainer: {
    backgroundColor: '#FFA030',
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
