import * as firebase from 'firebase';
import React from 'react';
import {
  View, Button,
} from 'react-native';
import { MapView } from 'expo';

export default class DisplayAlertMarkers extends React.Component {
  state = {
    isLoading: true,
    markers: [],
  };

  getMarkerData = () => {
    firebase
      .database()
      .ref('alerts/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const items = Object.values(data);
        this.setState({ markers: items });
      });
  };

  render() {
    return (
      <View>
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => {
            const coords = {
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            };
            const alertData = `${marker.body}`;

            return <MapView.Marker key={index} coordinate={coords} title={alertData} />;
          })}
        <Button title="Alerts" onPress={this.getMarkerData} />
      </View>
    );
  }
}
