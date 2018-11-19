import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button,
} from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyCwF76W5Y9qC_ow3ilkweB7IqoCxBuLUKY',
  authDomain: 'made-to-help.firebaseapp.com',
  databaseURL: 'https://made-to-help.firebaseio.com',
  projectId: 'made-to-help',
  storageBucket: 'made-to-help.appspot.com',
  messagingSenderId: '910630110904',
};

firebase.initializeApp(firebaseConfig);

export default class Alert extends React.Component {
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
  };

  sendData = () => {
    this.writeAlertData('this road sucks', { latitude: 51, longitude: -0.03 });
  };

  render() {
    return (
      <View>
        <Text>Report a Bad Route</Text>
        <TextInput placeholder="Body" />
        <Button title="Submit" onPress={this.sendData} />
      </View>
    );
  }
}
