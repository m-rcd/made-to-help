import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

export default class DisplayAlertMarkers extends React.Component {
  state = {
    markers: [],
    isLoading: true,
  }

  getMarkerData = () => {
    firebase.database().ref('alerts/').on('value', (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({markers: items})
    });
  }

  render() {
    return (
      <Button title="Alerts" onPress={this.getMarkerData} />
      {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
        const coords = {
          latitude: marker.location.latitude,
          longitude: marker.location.longitude,
        };
        const alertData = `${marker.body}`;

        return (
          <MapView.Marker
          key={index}
          coordinate={coords}
          title={alertData}
        />
        );
      })}
    )
  }
};
