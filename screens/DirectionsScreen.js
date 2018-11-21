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
  constructor(props) {
    super(props);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.state = {
      origin: '',
      destination: '',
    };
  }

    static navigationOptions = {
      title: 'Directions',
    };

    updateOrigin(newOrigin) {
      this.setState({
        origin: newOrigin,
      });
    }

    updateDestination(newDestination) {
      this.setState({
        destination: newDestination,
      });
    }

    render() {
      return (
        <View style={{ flex: 1 }} testID="directions">
          <Origin updateOrigin={this.updateOrigin} />
          <Destination updateDestination={this.updateDestination} />

          <TouchableOpacity
            style={{ flex: 1.25 }}
            onPress={() => this.props.navigation.navigate('Home', { origin: this.state.origin, destination: this.state.destination })}
          >
            <Text> Search </Text>
          </TouchableOpacity>
        </View>
      );
    }
}
