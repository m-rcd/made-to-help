import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import CurrentLocation from '../components/CurrentLocation';
import DynamicLocation from '../components/DynamicLocation';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
      <View style={{ flex: 1 }} testID="map">
          <DynamicLocation />
      </View>
    );
  }
}
