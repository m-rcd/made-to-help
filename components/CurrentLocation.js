import React from 'react';
import { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

export default class CurrentLocation extends React.Component {
  state = {
    longitude: 0,
    latitude: 0,
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    await Permissions.askAsync(Permissions.LOCATION);

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  render() {
    return (
      <Marker
        coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
        image={require('../assets/images/user.png')}
      />
    );
  }
}
