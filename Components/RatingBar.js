import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class RatingBar extends React.Component {
  render() {
    const {barColor, workerRating, maxRating = 5} = this.props;
    const ratingWidth = (workerRating / maxRating) * 200;
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.ratingBar,
            {width: ratingWidth, backgroundColor: barColor},
          ]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 200,
    height: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 23,
  },
  ratingBar: {
    height: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 23,
  },
});
