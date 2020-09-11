import React from 'react';
import {View} from 'react-native';
import {
  STAR_COLOR,
  PRIMARY_COLOR,
  COOKING_COLOR,
  SECONDARY_COLOR,
} from '../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'star-o',
    };
  }

  changeStarStyle = (name) => {
    if (name === 'star-o') {
      this.setState({
        name: 'star',
      });
    } else {
      this.setState({
        name: 'star-o',
      });
    }
  };

  render() {
    const {name} = this.state;
    return (
      <Icon
        {...this.props}
        name={name}
        onPress={() => this.changeStarStyle(name)}
      />
    );
  }
}
