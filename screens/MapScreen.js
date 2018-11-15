import React from 'react';
import { View } from 'react-native';
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
