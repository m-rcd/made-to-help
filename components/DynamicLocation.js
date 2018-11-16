import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import KEY from '../env.config';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

const origin = '50 commercial st UK';
const destination = 'Westminster Bridge, London SE1 7GP';
const GOOGLE_MAPS_APIKEY = KEY;
const styles = StyleSheet.create({
  calloutView: {
    fontSize: 50,
  },
});
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
      <View style={{ flex: 1 }}>
        {/* <Text style={{ flex: 0.25 }}>
          {`${this.state.journeyTime} - Time \n ${this.state.journeyDistance} - Distance`}
        </Text> */}
        <MapView style={{ flex: 1 }} showsUserLocation region={this.state.region} provider="google">
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="walking"
            onReady={(result) => {
              this.setState({ journeyTime: result.duration, journeyDistance: result.distance });
            }}
          />
        </MapView>
        <MapView.Callout>
          <View style={styles.calloutView}>
            <Text>Hello World!</Text>
          </View>
        </MapView.Callout>
      </View>
    );
  }
}
