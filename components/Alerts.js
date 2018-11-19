import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

const firebaseConfig = {
  apiKey: 'AIzaSyCwF76W5Y9qC_ow3ilkweB7IqoCxBuLUKY',
  authDomain: 'made-to-help.firebaseapp.com',
  databaseURL: 'https://made-to-help.firebaseio.com',
  projectId: 'made-to-help',
  storageBucket: 'made-to-help.appspot.com',
  messagingSenderId: '910630110904',
};

firebase.initializeApp(firebaseConfig);

export default class Alerts extends React.Component {
  state = {
    longitude: null,
    latitude: null,
    text: '',
  };

  componentWillMount = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  writeAlertData = (body, location) => {
    firebase
      .database()
      .ref('alerts/')
      .push({
        body,
        location,
      })
      .then((data) => {
        console.log('data ', data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    Alert.alert('Thanks, your report has been submitted. 🙃');
  };

  sendData = () => {
    this.writeAlertData(this.state.text, {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  };

  render() {
    return (
      <View>
        <Text>Report a Bad Route</Text>
        <TextInput placeholder="Body" onChangeText={text => this.setState({ text })} />
        {this.state.text !== '' && <Button title="Submit" onPress={this.sendData} />}
      </View>
    );
  }
}
