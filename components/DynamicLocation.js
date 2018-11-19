import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import KEY from '../env.config';
import DisplayAlertMarkers from './DisplayAlertMarkers'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };


const origin = '50 commercial st UK';
const destination = 'Westminster Bridge, London SE1 7GP';

const styles = StyleSheet.create({
  calloutView: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 500,
  },
  calloutText: {
    fontSize: 40,
    color: 'hotpink',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Verdana',
  },
});

const DB_URL = KEY;

export default class DynamicLocation extends React.Component {
  state = {
    /* eslint-disable-next-line */
    location: { coords: { latitude: -0.09, longitude: 51 } },
    journeyDistance: null,
    journeyTime: null,
    isLoading: true,
    markers: [],
  };

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    this.fetchMarkerData();
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

  fetchMarkerData = () => {
    fetch('https://made-to-help.herokuapp.com/api/stations')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, markers: responseJson });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          region={this.state.region}
          provider="google"
        >
          {this.state.isLoading ? null
            : this.state.markers.map((marker, index) => {
              const coords = {
                latitude: marker.latitude,
                longitude: marker.longitude,
              };
              const stepData = `Accessibility: ${marker.stepFree}`;

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.station}
                  description={stepData}
                  image={require('../assets/images/wheelchair-access.png')}
                />
              );
            })}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={DB_URL}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="walking"
            onReady={(result) => {
              this.setState({
                journeyTime: result.duration,
                journeyDistance: result.distance.toFixed(2),
              });
            }}
          />
        </MapView>
        <MapView.Callout>
          <View style={styles.calloutView}>
            <Text
              style={styles.calloutText}
              accessibilityLabel={`Hello! Journey Time is ${Math.round(this.state.journeyTime)} Minutes and the distance is \n ${this.state.journeyDistance} KM`}
            >
              {`${Math.round(this.state.journeyTime)} Minutes \n ${this.state.journeyDistance} KM`}
            </Text>
          </View>
          <DisplayAlertMarkers />
        </MapView.Callout>
      </View>
    );
  }
}
