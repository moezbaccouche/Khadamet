import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default class EmptyData extends React.Component {
  render() {
    const {image, text} = this.props;
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={image} style={styles.image} />
        <Text style={styles.textEmpty}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
  textEmpty: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
  },
});
