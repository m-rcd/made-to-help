import React from 'react';
import * as firebase from 'firebase';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import KEY from '../env.config';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true };

const styles = StyleSheet.create({
  calloutView: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 500,
  },
  calloutText: {
    fontSize: 40,
    color: '#228ac4',
    textAlign: 'center',
    fontWeight: 'bold',
    // fontFamily: 'Verdana',
  },
  alertButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
    alertIsLoading: true,
    alertVisibility: true,
    markers: [],
    alertMarkers: [],
  };

  toggleMarkerData = () => {
    if (this.state.alertVisibility === true) {
      this.setState({ alertIsLoading: false, alertVisibility: false });
    } else {
      this.setState({ alertIsLoading: true, alertVisibility: true });
    }
  };

  fetchAlertMarkers = () => {
    firebase
      .database()
      .ref('alerts/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const items = Object.values(data);
        this.setState({ alertMarkers: items });
      });
  };

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    this.fetchMarkerData();
    this.fetchAlertMarkers();
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

  showRouteInformation = () => {
    if (this.state.journeyDistance !== null) {
      return (
        <MapView.Callout>
          <View style={styles.calloutView}>
            <Text
              style={styles.calloutText}
              accessibilityLabel={`Journey Time is ${Math.round(
                this.state.journeyTime,
              )} Minutes and the distance is \n ${this.state.journeyDistance} KM`}
            >
              {`${Math.round(this.state.journeyTime)} Minutes \n ${this.state.journeyDistance} KM`}
            </Text>
          </View>
        </MapView.Callout>
      );
    }
    return null;
  };

  fetchMarkerData = () => {
    fetch('https://made-to-help.herokuapp.com/api/stations')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, markers: responseJson });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        accessibilityLabel="Accessible Stations"
        accessibilityHint="Step-free access available"
      >
        <MapView style={{ flex: 1 }} showsUserLocation region={this.state.region} provider="google">
          {/** For Accessibility Markers: */}
          {this.state.isLoading
            ? null
            : this.state.markers.map((marker, index) => {
              const coords = {
                latitude: marker.latitude,
                longitude: marker.longitude,
              };
              const stepData = `Accessibility: ${marker.stepFree}`;

              return (
                <MapView.Marker
                  key={index}
                  id="first-marker"
                  data-test="first-marker"
                  coordinate={coords}
                  title={marker.station}
                  description={stepData}
                  image={require('../assets/images/wheelchair-access.png')}
                />
              );
            })}
          {/** For Alert Markers:  */}
          {this.state.alertIsLoading
            ? null
            : this.state.alertMarkers.map((marker, index) => {
              const alertData = `${marker.body}`;
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.latitude,
                    longitude: marker.location.longitude,
                  }}
                  image={marker.icon}
                  title={marker.typeOfReport}
                  description={alertData}
                />
              );
            })}
          <MapViewDirections
            origin={this.props.origin}
            destination={this.props.destination}
            apikey={DB_URL}
            strokeWidth={3}
            strokeColor="#228ac4"
            mode="walking"
            onReady={(result) => {
              this.setState({
                journeyTime: result.duration,
                journeyDistance: result.distance.toFixed(2),
              });
            }}
          />
          {this.state.journeyTime ? (
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(JSON.stringify(this.props.origin.latitude)),
                longitude: parseFloat(JSON.stringify(this.props.origin.longitude)),
              }}
              image={require('../assets/images/start.png')}
              description={this.props.origin.address}
              title="Start"
              accessibilityLabel="Start location"
            />
          ) : null}
          {this.state.journeyTime ? (
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(JSON.stringify(this.props.destination.latitude)),
                longitude: parseFloat(JSON.stringify(this.props.destination.longitude)),
              }}
              image={require('../assets/images/finish.png')}
              description={this.props.destination.address}
              title="End"
              accessibilityLabel="Destination"
            />
          ) : null}
        </MapView>
        {this.showRouteInformation()}
        <MapView.Callout style={styles.alertButton}>
          <TouchableOpacity
            accessibilityLabel="See Alerts"
            onPress={this.toggleMarkerData}
          >
            <Image source={require('../assets/images/alertMap.png')} />
          </TouchableOpacity>
        </MapView.Callout>
      </View>
    );
  }
}
