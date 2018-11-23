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
    this.state = {
      origin: '',
      destination: '',
    };
  }

    static navigationOptions = {
      title: 'Directions',
    };

    updateOrigin = (newOrigin) => {
      this.setState({
        origin: newOrigin,
      });
    }

    updateDestination = (newDestination) => {
      this.setState({
        destination: newDestination,
      });
    }

    render() {
      return (
        <View
          style={{ flex: 1 }}
          accessibilityLabel="Directions"
          accessibilityHint="Enter your desired route"
          testID="directions"
        >
          <Origin updateOrigin={this.updateOrigin} />
          <Destination updateDestination={this.updateDestination} />

          <TouchableOpacity
            accessibilityLabel="Search"
            accessibilityHint="Searches for your route"
            style={{
              borderWidth: 0.5,
              padding: 25,
              borderColor: 'grey',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              borderRadius: 7,
              backgroundColor: '#fff',
              marginBottom: 200,
            }}
            onPress={() => this.props.navigation.navigate('Home', { origin: this.state.origin, destination: this.state.destination })}
          >
            <Text> Search </Text>
          </TouchableOpacity>
        </View>
      );
    }
}
