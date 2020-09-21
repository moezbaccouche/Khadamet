import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../assets/colors';

export default class ConversationInput extends React.Component {
  render() {
    const {onSend, isDisabled} = this.props;

    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Envoyer un message..."
          multiline={true}
          {...this.props}
        />
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {backgroundColor: isDisabled ? '#CDCDCD' : PRIMARY_COLOR},
          ]}
          disabled={isDisabled}
          onPress={() => onSend()}>
          <Icon
            name="send"
            color={SECONDARY_COLOR}
            size={20}
            style={{paddingRight: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    maxHeight: 100,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
