import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STAR_COLOR} from '../assets/colors';
import RatingStars from './RatingStars';

export default class ReviewItem extends React.Component {
  render() {
    const {
      name,
      generalComment,
      rating,
      comment,
      picture,
      skillName,
      color,
    } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: picture}} style={styles.clientPicture} />
        <View style={styles.reviewDescription}>
          <Text>{name}</Text>
          <View style={styles.viewRating}>
            <Text style={styles.generalComment}>{generalComment}</Text>

            <RatingStars rating={rating} />
            {/* <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
            <Ionicons name="ios-star-sharp" size={18} color={STAR_COLOR} />
            <Ionicons name="ios-star-outline" size={18} color={STAR_COLOR} /> */}
            <Text style={{color: color}}> ({skillName})</Text>
          </View>
          <Text style={styles.comment} numberOfLines={1}>
            {comment}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDescription: {
    paddingLeft: 10,
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  generalComment: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  comment: {},
  clientPicture: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
});
