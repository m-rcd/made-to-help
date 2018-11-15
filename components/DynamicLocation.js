import React from 'react';
import { MapView, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

export default class DynamicLocation extends React.Component {
  state = {
    /* eslint-disable-next-line */
    location: { coords: { latitude: 0, longitude: 0 } },
    // polylineCoords: [{ latitude: 50, longitude: -0.03 }, { latitude: 51, longitude: -0.04 }],
  };

  componentWillMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);

    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  };

  /* eslint-disable */
  locationChanges = location => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    };
    this.setState({ location, region });
  };
  /* eslint-enable */

  render() {
    return (
      <MapView style={{ flex: 1 }} showsUserLocation region={this.state.region} provider="google">
        {/* <MapView.Polyline coordinates={this.state.polylineCoords} strokeWidth={5} /> */}
      </MapView>
    );
  }
}
