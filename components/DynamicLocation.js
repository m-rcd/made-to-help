import React from 'react';
import { View, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyB2rfzTA_qJznxhWxxxpuU4e2e6WvLPklk';

export default class DynamicLocation extends React.Component {
  state = {
    /* eslint-disable-next-line */
    location: { coords: { latitude: -0.09, longitude: 51 } },
    journeyDistance: null,
    journeyTime: null,
  };

  componentWillMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  };

  /* eslint-disable */
  locationChanged = location => {
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
      <View
        style={{ flex: 1 }}
      >
        <Text
          style={{ flex: 0.25 }}
        >
          {' '}
          {
            `${this.state.journeyTime} - Time \n ${this.state.journeyDistance} - Distance`
          }
        </Text>
        <MapView
          style={{ flex: 0.75 }}
          showsUserLocation
          region={this.state.region}
          provider="google"
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="walking"
            onReady={(result) => {
              this.setState({ journeyTime: result.duration, journeyDistance: result.distance });
            }
          }
          />
        </MapView>
      </View>
    );
  }
}
