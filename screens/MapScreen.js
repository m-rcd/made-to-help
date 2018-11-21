import React from 'react';
import { View } from 'react-native';
import DynamicLocation from '../components/DynamicLocation';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    const { navigation } = this.props;
    const origin = navigation.getParam('origin');
    const destination = navigation.getParam('destination');

    return (
      <View style={{ flex: 1 }} testID="map">
        <DynamicLocation origin={origin} destination={destination} />
      </View>
    );
  }
}
