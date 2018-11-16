import React from 'react';
import { View } from 'react-native';
import Directions from '../components/Directions';

// eslint-disable-next-line
// const App = createStackNavigator({
//   Home: MapScreen,
// });

export default class DirectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Directions',
  };

  render() {
    return (
      <View style={{ flex: 1 }} testID="directions">
        <Directions />
      </View>
    );
  }
}
