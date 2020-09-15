import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SECONDARY_COLOR, PRIMARY_COLOR, STAR_COLOR} from '../assets/colors';

export default class RatingStars extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStars = (rating) => {
    const starOutline = <Icon name="star-o" size={18} color={STAR_COLOR} />;
    const halfStar = <Icon name="star-half" size={18} color={STAR_COLOR} />;
    const starItem = <Icon name="star" size={18} color={STAR_COLOR} />;

    stars = [];

    let i = 0;
    for (i; i < rating; i++) {
      stars = [...stars, starItem];
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
