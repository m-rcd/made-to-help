import * as Expo from 'expo';
import React from 'react';
import { Platform, Text, View, Stylesheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo'
import { GOOGLE_API_KEY } from 'react-native-dotenv'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

export default class DynamicLocation extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } }
  }

  componentWillMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);

    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanges = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    this.setState({location, region})
  }

  render() {
    return (
      <Expo.MapView
      style={{flex: 1}}
      showsUserLocation={true}
      region={this.state.region}
      provider="google"
      />
    );
  }
}
