import React from 'react';
import { Location, Permissions } from 'expo';
import { Polyline } from 'react-native-maps';

export default class RouteTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingLocation: {},
    };
  }

  componentWillMount() {
    return this.getCurrentLocationStarter();
  }

  getCurrentLocationStarter = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Permission denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      startingLocation: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
  };

  render() {
    return <Polyline coordinates={[this.state.startingLocation, this.props.endLocation]} />;
  }
}
