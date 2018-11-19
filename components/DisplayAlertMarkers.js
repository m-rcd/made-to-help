import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

export default class DisplayAlertMarkers extends React.Component {
  state = {
    markers: [],
  }

  componentWillMount() {
    firebase.database().ref('alerts/').on('value', (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({markers: items})
    });
  }

  render() {
    return (
      <View>
      </View>
    )
  }
};
