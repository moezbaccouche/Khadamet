import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SECONDARY_COLOR, PRIMARY_COLOR, STAR_COLOR} from '../assets/colors';

export default class RatingStars extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStars = (rating) => {
    const starOutline = (
      <Icon name="ios-star-outline" size={18} color={STAR_COLOR} />
    );
    const halfStar = (
      <Icon name="ios-star-half-sharp" size={18} color={STAR_COLOR} />
    );
    const starItem = (
      <Icon name="ios-star-sharp" size={18} color={STAR_COLOR} />
    );

    stars = [];

    let i = 0;
    for (i; i < rating; i++) {
      if (rating > i && rating < i + 1) {
        console.log('SUP');
        stars = [...stars, halfStar];

        i++;
        break;
      } else {
        stars = [...stars, starItem];
      }
    }
    for (i; i < 5; i++) {
      stars = [...stars, starOutline];
    }

    return stars;
  };

  render() {
    const {rating} = this.props;
    const arr = this.renderStars(rating);
    return <View style={{flexDirection: 'row'}}>{arr}</View>;
  }
}
