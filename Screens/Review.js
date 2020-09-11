import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  STAR_COLOR,
  PRIMARY_COLOR,
  COOKING_COLOR,
  SECONDARY_COLOR,
} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LargeButton from '../Components/LargeButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addNewReview} from '../API/skillRatings.services';
import Toast from 'react-native-root-toast';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nbStars: 0,
      isLoading: false,
      comment: '',
    };
  }

  renderStars = () => {
    let i = 1;
    let arrIcons = [];

    //Render the sharp stars
    for (i; i <= this.state.nbStars; i++) {
      let counter = i;
      arrIcons.push(
        <Icon
          style={{paddingHorizontal: 5}}
          name="star"
          size={40}
          color={STAR_COLOR}
          onPress={() =>
            this.setState({nbStars: counter}, () => {
              counter++;
            })
          }
        />,
      );
    }

    //Render the outline stars
    for (i; i <= 5; i++) {
      let counter = i;
      arrIcons.push(
        <Icon
          style={{paddingHorizontal: 5}}
          name="star-o"
          size={40}
          color={STAR_COLOR}
          onPress={() => {
            this.setState(
              {
                nbStars: counter,
              },
              () => {
                counter++;
              },
            );
          }}
        />,
      );
    }
    return arrIcons;
  };

  submitReview = () => {
    const {nbStars, comment} = this.state;

    console.log('NAV STATE', this.props.navigation.state.params);
    const {skillId, expertId} = this.props.navigation.state.params;
    const clientId = '5f57612837d6e1317c6f879e'; //<---- To be retrieved from Async storage

    const trimmedComment = comment.trim();

    if (trimmedComment.length !== 0 && nbStars !== 0) {
      this.setState({isLoading: true});
      const review = {
        rating: nbStars,
        comment: trimmedComment,
        skillId: skillId,
        clientId: clientId,
        professionalId: expertId,
        postedAt: Date.now(),
      };
      addNewReview(review)
        .then((response) => {
          console.log(response);
          this.setState({isLoading: false});
          this.props.navigation.navigate('WorkerProfile', {
            updateReviews: true,
          });
          Toast.show('Votre avis a été enregistré.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: PRIMARY_COLOR,
            shadow: true,
            containerStyle: {borderRadius: 8},
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({isLoading: false});
        });
    } else {
      alert('Veuillez attribuer une note et laissez un commentaire.');
    }
  };

  renderButtonOrLoader = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator
            color={PRIMARY_COLOR}
            size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <LargeButton
        backgroundColor={PRIMARY_COLOR}
        color={SECONDARY_COLOR}
        text="Envoyer"
        borderColor={PRIMARY_COLOR}
        borderRadius={8}
        fontWeight="bold"
        onPress={() => this.submitReview()}
      />
    );
  };

  render() {
    const {
      skillName,
      skillImage,
      backgroundColor,
      name,
    } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.mainContainer} ref="scroll">
        <StatusBar backgroundColor={SECONDARY_COLOR} barStyle="dark-content" />
        <View style={styles.headerToolbar}>
          <View style={{flex: 0.2}}>
            <Ionicons
              name="ios-arrow-back-sharp"
              color={PRIMARY_COLOR}
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={{flex: 0.6, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>
              Avis sur {name.split(' ', 1)}
            </Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View
            style={[
              styles.skillImageContainer,
              {backgroundColor: backgroundColor},
            ]}>
            <Image source={skillImage} style={styles.skillImage} />
          </View>
          <Text style={styles.description}>
            Donnez votre avis sur {name.split(' ', 1)} en {skillName}
          </Text>
          <View style={styles.viewRating}>{this.renderStars()}</View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Dites aux autres utilisateurs ce que vous pensez de Moez..."
              onChangeText={(text) => this.setState({comment: text})}
            />
          </View>
          {this.renderButtonOrLoader()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 30,
  },
  headerToolbar: {
    height: 56,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
  skillImageContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  skillImage: {
    height: 72,
    width: 72,
  },
  description: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    paddingVertical: 30,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    textAlignVertical: 'top',
  },
  inputContainer: {
    marginBottom: 50,
    height: 100,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 8,
  },
});
