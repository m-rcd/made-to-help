import * as firebase from 'firebase';
import React from 'react';
import { View, Button } from 'react-native';
import { MapView } from 'expo';

export default class DisplayAlertMarkers extends React.Component {
  state = {
    isLoading: true,
    markers: [],
  };

  componentWillMount() {
    firebase
      .database()
      .ref('alerts/')
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        const items = Object.values(data);
        this.setState({ markers: items });
      });
  }

  getMarkerData = () => {
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View>
        {this.state.isLoading
          ? null
          : this.state.markers.forEach((marker) => {
            const alertData = `${marker.body}`;
            console.log(marker.location.latitude);
            return (
              <MapView.Marker
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                }}
                title={alertData}
              />
            );
          })}
        <Button title="Alerts" onPress={this.getMarkerData} />
      </View>
    );
  }
}
