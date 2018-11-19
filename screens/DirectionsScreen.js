import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Origin from '../components/Origin';
import Destination from '../components/Destination';
import MapScreen from './MapScreen';

// eslint-disable-next-line
const App = createStackNavigator({
  Home: MapScreen,
});

export default class DirectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Directions',
  };

  render() {
    return (
      <View style={{ flex: 1 }} testID="directions">
        <Origin />
        <Destination />

        <TouchableOpacity
          style={{ flex: 1.25 }}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text> Search </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
