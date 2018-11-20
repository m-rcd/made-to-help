import React from 'react';
import { View, Text } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import KEY from '../env.config';
import MapScreen from '../screens/MapScreen';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

const DB_URL = KEY;

export default class DynamicLocation extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        /* eslint-disable-next-line */
        location: { coords: { latitude: -0.09, longitude: 51 } },
        journeyDistance: null,
        journeyTime: null,
        isLoading: true,
        markers: [],
        origin: '',
        destination: ''
  }
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
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 0.25 }}>
          {' '}
          {`${JSON.stringify(this.props.origin)} \n ${this.props.destination} `}
        </Text>
        <MapView
          style={{ flex: 0.75 }}
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
            origin={this.props.origin}
            destination={this.props.destination}
            apikey={DB_URL}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="walking"
            onReady={(result) => {
              this.setState({ journeyTime: result.duration, journeyDistance: result.distance });
            }}
          />
        </MapView>
      </View>
    );
  }
}
